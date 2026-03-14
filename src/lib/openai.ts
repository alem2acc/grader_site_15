const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;
const OPENAI_BASE = "https://api.openai.com/v1";

// Timeout helper for fetch calls (30 seconds)
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

// ─── Whisper: transcribe audio blob ─────────────────────────────────────────
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const form = new FormData();
  form.append("file", audioBlob, "audio.webm");
  form.append("model", "whisper-1");
  form.append("language", "en");

  const res = await fetchWithTimeout(`${OPENAI_BASE}/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: form,
  }, 45000); // 45 sec for audio

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper error: ${err}`);
  }

  const data = await res.json();
  return data.text as string;
}

// ─── GPT-4 chat helper ───────────────────────────────────────────────────────
async function chat(systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetchWithTimeout(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  }, 45000); // 45 sec for chat

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content as string;
}

// ─── IELTS Speaking Evaluation ───────────────────────────────────────────────
export interface SpeakingEvaluation {
  overallBand: number;
  fluencyCoherence: number;
  lexicalResource: number;
  grammaticalRange: number;
  pronunciation: number;
  strengths: string;
  areasToFix: string;
  annotatedTranscript: AnnotatedSegment[];
  personalizedTips: string[];
}

export interface AnnotatedSegment {
  text: string;
  type: "normal" | "good" | "improve" | "error";
  tooltip?: string;
}

const SPEAKING_SYSTEM = `You are a certified IELTS examiner. Given a transcript of a student's IELTS Speaking response, evaluate it according to the official IELTS Speaking band descriptors. 
Return ONLY valid JSON with this exact schema:
{
  "overallBand": number (0.0-9.0 in 0.5 steps),
  "fluencyCoherence": number,
  "lexicalResource": number,
  "grammaticalRange": number,
  "pronunciation": number,
  "strengths": string (1-2 sentences),
  "areasToFix": string (1-2 sentences),
  "annotatedTranscript": [
    { "text": string, "type": "normal"|"good"|"improve"|"error", "tooltip": string }
  ],
  "personalizedTips": [
    "string: a concise, actionable, and specific step to improve their score (at least 3 items)"
  ]
}
Break the transcript into short phrases (3-10 words each) and annotate each one.
"good" = excellent vocabulary/grammar, "improve" = better word choice available, "error" = grammar mistake.`;

export async function evaluateSpeaking(
  transcript: string,
  part: number,
  topic: string
): Promise<SpeakingEvaluation> {
  const userMsg = `IELTS Speaking Part ${part} topic: "${topic}"\n\nStudent transcript:\n"${transcript}"`;
  const raw = await chat(SPEAKING_SYSTEM, userMsg);
  return JSON.parse(raw) as SpeakingEvaluation;
}

// ─── IELTS Writing Evaluation ────────────────────────────────────────────────
export interface WritingEvaluation {
  overallBand: number;
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  strengths: string;
  areasToFix: string;
  corrections: WritingCorrection[];
  improvedVersion: string;
}

export interface WritingCorrection {
  original: string;
  corrected: string;
  explanation: string;
  type: "grammar" | "vocabulary" | "structure";
}

const WRITING_SYSTEM = `You are a certified IELTS examiner. Given an IELTS Writing essay, evaluate it according to official IELTS Writing band descriptors.
Return ONLY valid JSON with this exact schema:
{
  "overallBand": number (0.0-9.0 in 0.5 steps),
  "taskResponse": number,
  "coherenceCohesion": number,
  "lexicalResource": number,
  "grammaticalRange": number,
  "strengths": string (1-2 sentences),
  "areasToFix": string (1-2 sentences),
  "corrections": [
    { "original": string, "corrected": string, "explanation": string, "type": "grammar"|"vocabulary"|"structure" }
  ],
  "improvedVersion": string (a concise improved rewrite of the essay, preserving the student's voice)
}
Provide up to 5 corrections for the most impactful errors.`;

export async function evaluateWriting(
  essay: string,
  task: number,
  prompt: string
): Promise<WritingEvaluation> {
  const userMsg = `IELTS Writing Task ${task} prompt: "${prompt}"\n\nStudent essay:\n"${essay}"`;
  const raw = await chat(WRITING_SYSTEM, userMsg);
  return JSON.parse(raw) as WritingEvaluation;
}

// ─── Generate Speaking Topic ─────────────────────────────────────────────────
export async function generateSpeakingTopic(part: number): Promise<{ topic: string; cueCard?: string }> {
  const systemPrompt = `You are an IELTS examiner. Generate a realistic IELTS Speaking Part ${part} topic.
Return ONLY valid JSON:
${part === 2
  ? '{ "topic": string (short title), "cueCard": string (the full cue card text with bullet points) }'
  : '{ "topic": string (short title, e.g. "Hometown & Daily Routine"), "cueCard": null }'}`;

  const userMsg = `Generate a unique, realistic IELTS Speaking Part ${part} topic for today.`;
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg },
      ],
    }),
  });

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

// ─── Generate Writing Prompt ─────────────────────────────────────────────────
export async function generateWritingPrompt(task: number): Promise<{ prompt: string; type: string }> {
  const systemPrompt = `You are an IELTS examiner. Generate a realistic IELTS Writing Task ${task} prompt.
${task === 1
  ? 'For Task 1 (Academic), create a chart/graph/diagram description task. Include what type of visual it is.'
  : 'For Task 2, create an opinion/argument/discussion essay prompt.'}
Return ONLY valid JSON: { "prompt": string (the full task instructions), "type": string (e.g. "Bar Chart", "Opinion Essay") }`;

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate a unique IELTS Writing Task ${task} prompt.` },
      ],
    }),
  });

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}
