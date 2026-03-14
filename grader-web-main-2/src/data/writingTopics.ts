// ── IELTS Writing Topics — Pre-made, No AI Generation ──────────────────────
// Current & Relevant as of 2025-2026

export type EssayType =
  | "Opinion"
  | "Discussion"
  | "Problem-Solution"
  | "Advantages-Disadvantages"
  | "Direct Question";

export type ChartType =
  | "Line Graph"
  | "Bar Chart"
  | "Pie Chart"
  | "Table"
  | "Mixed Charts"
  | "Process Diagram"
  | "Map";

export type Difficulty = "Moderate" | "Challenging" | "Advanced";

export interface WritingTopic {
  id: string;
  task: 1 | 2;
  type: EssayType | ChartType;
  category: string;
  difficulty: Difficulty;
  prompt: string;
}

// ── TASK 2 TOPICS ────────────────────────────────────────────────────────────

export const TASK2_TOPICS: WritingTopic[] = [

  // ── TECHNOLOGY & AI ──
  {
    id: "t2_tech_01",
    task: 2,
    type: "Opinion",
    category: "Technology & AI",
    difficulty: "Challenging",
    prompt:
      "Artificial intelligence is increasingly being used to make decisions in areas such as hiring, medical diagnosis, and criminal justice. Some people believe this is a positive development, while others are concerned about the risks.\n\nTo what extent do you think the benefits of AI decision-making outweigh the drawbacks?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_02",
    task: 2,
    type: "Discussion",
    category: "Technology & AI",
    difficulty: "Moderate",
    prompt:
      "Some people think that social media platforms do more harm than good to society. Others argue that they play a vital role in connecting people and spreading information.\n\nDiscuss both these views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_03",
    task: 2,
    type: "Problem-Solution",
    category: "Technology & AI",
    difficulty: "Moderate",
    prompt:
      "The rapid spread of misinformation and 'fake news' through online platforms has become a serious global problem.\n\nWhat are the main causes of this problem and what measures can be taken to address it?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_04",
    task: 2,
    type: "Opinion",
    category: "Technology & AI",
    difficulty: "Advanced",
    prompt:
      "Some experts argue that within the next decade, large language models and generative AI will replace the majority of white-collar jobs, making university education largely redundant.\n\nTo what extent do you agree or disagree with this view?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_05",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Technology & AI",
    difficulty: "Moderate",
    prompt:
      "Many companies are now using remote work technology to allow employees to work from home permanently rather than commuting to an office.\n\nWhat are the advantages and disadvantages of this trend for both workers and employers?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_06",
    task: 2,
    type: "Discussion",
    category: "Technology & AI",
    difficulty: "Challenging",
    prompt:
      "Some people believe that governments should strictly regulate the development of artificial intelligence to prevent potential harm. Others think that excessive regulation will stifle innovation and economic growth.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_07",
    task: 2,
    type: "Direct Question",
    category: "Technology & AI",
    difficulty: "Moderate",
    prompt:
      "Technology companies collect vast amounts of personal data from their users. Many people are unaware of how this data is used.\n\nWhy do you think people continue to use these services despite privacy concerns? What can be done to better protect individuals' data?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_tech_08",
    task: 2,
    type: "Opinion",
    category: "Technology & AI",
    difficulty: "Challenging",
    prompt:
      "Some people believe that self-driving vehicles will make roads significantly safer and should be introduced as quickly as possible. Others argue that the technology is not yet ready and poses serious safety and ethical risks.\n\nTo what extent do you agree that autonomous vehicles should be fast-tracked onto public roads?\n\nWrite at least 250 words.",
  },

  // ── ENVIRONMENT & CLIMATE ──
  {
    id: "t2_env_01",
    task: 2,
    type: "Problem-Solution",
    category: "Environment",
    difficulty: "Moderate",
    prompt:
      "Climate change is considered one of the most serious threats facing the world today.\n\nWhat problems does climate change cause, and what actions should governments and individuals take to address them?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_env_02",
    task: 2,
    type: "Opinion",
    category: "Environment",
    difficulty: "Moderate",
    prompt:
      "Some people argue that individuals have a personal responsibility to reduce their environmental impact by changing their lifestyle. Others believe that only large-scale government and corporate action can make a meaningful difference.\n\nTo what extent do you agree that individual action is the key to solving environmental problems?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_env_03",
    task: 2,
    type: "Discussion",
    category: "Environment",
    difficulty: "Challenging",
    prompt:
      "Some scientists believe that nuclear energy is the only realistic solution to the global energy crisis and climate change. Others argue that it is too dangerous and that investment should focus entirely on solar and wind power.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_env_04",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Environment",
    difficulty: "Moderate",
    prompt:
      "Many cities around the world are introducing congestion charges — fees for driving into city centres — as a way to reduce traffic and pollution.\n\nWhat are the advantages and disadvantages of this approach?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_env_05",
    task: 2,
    type: "Direct Question",
    category: "Environment",
    difficulty: "Advanced",
    prompt:
      "The fashion industry is one of the biggest contributors to global pollution, yet consumer demand for cheap, fast fashion continues to grow.\n\nWhy do you think consumers continue to buy fast fashion despite awareness of its environmental impact? How can this behaviour be changed?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_env_06",
    task: 2,
    type: "Opinion",
    category: "Environment",
    difficulty: "Advanced",
    prompt:
      "Some economists argue that a global carbon tax is the most effective and fair mechanism for reducing greenhouse gas emissions. Others believe this would disproportionately harm developing nations and should be opposed.\n\nTo what extent do you agree with the introduction of a global carbon tax?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_env_07",
    task: 2,
    type: "Problem-Solution",
    category: "Environment",
    difficulty: "Moderate",
    prompt:
      "Plastic pollution in the world's oceans is destroying marine ecosystems at an alarming rate.\n\nWhat are the main causes of this problem and what steps can be taken by governments, businesses, and individuals to reduce it?\n\nWrite at least 250 words.",
  },

  // ── EDUCATION ──
  {
    id: "t2_edu_01",
    task: 2,
    type: "Discussion",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "Some people believe that universities should focus primarily on preparing students for employment and that arts and humanities subjects are therefore less valuable. Others argue that a broad education is essential for a healthy society.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_edu_02",
    task: 2,
    type: "Opinion",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "Some educationalists argue that children should be taught how to use artificial intelligence tools from a young age, as these will be essential in their future careers. Others believe this undermines the development of independent thinking.\n\nTo what extent do you agree that AI tools should be integrated into school education?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_edu_03",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "Online education has expanded rapidly, allowing students around the world to take courses from top universities without physically attending.\n\nWhat are the advantages and disadvantages of online learning compared to traditional classroom education?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_edu_04",
    task: 2,
    type: "Problem-Solution",
    category: "Education",
    difficulty: "Challenging",
    prompt:
      "In many countries, there is a significant gap in educational attainment between students from wealthy and low-income backgrounds, and this gap appears to be widening.\n\nWhat are the causes of this inequality and what can be done to reduce it?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_edu_05",
    task: 2,
    type: "Direct Question",
    category: "Education",
    difficulty: "Challenging",
    prompt:
      "Many young people are choosing not to attend university and instead pursue vocational training, entrepreneurship, or self-directed online learning.\n\nWhy do you think this trend is growing? Is it a positive or negative development for society?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_edu_06",
    task: 2,
    type: "Opinion",
    category: "Education",
    difficulty: "Advanced",
    prompt:
      "Some educators argue that standardised testing is a fundamentally flawed method of assessing student ability, favouring those from privileged backgrounds and penalising creative thinkers. Others maintain it is the only objective and fair measure of academic achievement.\n\nTo what extent do you agree that standardised tests should be abolished?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_edu_07",
    task: 2,
    type: "Discussion",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "Some people think that children should begin formal schooling at a very early age, while others believe that young children learn best through play and should not start school until the age of seven.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },

  // ── HEALTH ──
  {
    id: "t2_health_01",
    task: 2,
    type: "Problem-Solution",
    category: "Health",
    difficulty: "Moderate",
    prompt:
      "Rates of obesity and type-2 diabetes have risen dramatically in many countries over the past three decades, placing enormous strain on public health systems.\n\nWhat are the main causes of this health crisis and what measures can governments and individuals take to reverse this trend?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_health_02",
    task: 2,
    type: "Opinion",
    category: "Health",
    difficulty: "Moderate",
    prompt:
      "Some people believe that governments should impose higher taxes on unhealthy food and sugary drinks in order to improve public health. Others argue that this is an unfair restriction on personal freedom.\n\nTo what extent do you agree with taxing unhealthy food products?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_health_03",
    task: 2,
    type: "Discussion",
    category: "Health",
    difficulty: "Challenging",
    prompt:
      "Some doctors believe that spending on prevention — such as health education and lifestyle programmes — is more effective than spending on treatment. Others argue that medical research and advanced treatments should remain the priority.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_health_04",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Health",
    difficulty: "Moderate",
    prompt:
      "Many hospitals are now using AI and robotic technology to assist surgeons in complex operations.\n\nWhat are the advantages and disadvantages of introducing such technology into healthcare?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_health_05",
    task: 2,
    type: "Problem-Solution",
    category: "Health",
    difficulty: "Advanced",
    prompt:
      "Mental health disorders, including anxiety and depression, have reached epidemic levels globally, particularly among young people aged 16–25.\n\nWhat factors have contributed to this crisis and what steps can societies take to address it effectively?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_health_06",
    task: 2,
    type: "Direct Question",
    category: "Health",
    difficulty: "Challenging",
    prompt:
      "Pharmaceutical companies spend billions of dollars annually on marketing prescription drugs directly to consumers and physicians.\n\nWhy do you think this practice is controversial? Should it be banned? Give reasons and examples in your answer.\n\nWrite at least 250 words.",
  },

  // ── WORK & ECONOMY ──
  {
    id: "t2_work_01",
    task: 2,
    type: "Discussion",
    category: "Work & Economy",
    difficulty: "Moderate",
    prompt:
      "Some people argue that a universal basic income — a regular payment from the government to all citizens regardless of employment — would benefit society. Others believe it would reduce the incentive to work and place an unsustainable burden on public finances.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_work_02",
    task: 2,
    type: "Opinion",
    category: "Work & Economy",
    difficulty: "Moderate",
    prompt:
      "Many businesses now use algorithms and automated screening tools to shortlist job applicants, removing human bias from the initial selection process.\n\nTo what extent do you think algorithmic hiring is a positive development for employers and job seekers?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_work_03",
    task: 2,
    type: "Problem-Solution",
    category: "Work & Economy",
    difficulty: "Challenging",
    prompt:
      "In many economies, the gender pay gap — the difference in average earnings between men and women — remains significant despite decades of equal pay legislation.\n\nWhat are the main reasons for this gap and what further steps should governments and employers take to close it?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_work_04",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Work & Economy",
    difficulty: "Moderate",
    prompt:
      "The 'gig economy' — where people work as self-employed contractors for platforms such as delivery and ride-sharing apps — has grown dramatically worldwide.\n\nDiscuss the advantages and disadvantages of gig economy work for workers and for the wider economy.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_work_05",
    task: 2,
    type: "Opinion",
    category: "Work & Economy",
    difficulty: "Advanced",
    prompt:
      "Some economists argue that increasing the minimum wage significantly is the most direct way to reduce poverty and stimulate consumer spending. Others warn that it will lead to job losses and business closures, especially for small companies.\n\nTo what extent do you agree that a higher minimum wage is beneficial for the economy?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_work_06",
    task: 2,
    type: "Direct Question",
    category: "Work & Economy",
    difficulty: "Moderate",
    prompt:
      "Many professionals today report feeling overwhelmed by the volume and pace of work, a phenomenon often called 'burnout'.\n\nWhy is workplace burnout becoming more common? What can employers and employees do to prevent it?\n\nWrite at least 250 words.",
  },

  // ── SOCIETY & CULTURE ──
  {
    id: "t2_soc_01",
    task: 2,
    type: "Discussion",
    category: "Society",
    difficulty: "Moderate",
    prompt:
      "Some people believe that the increasing use of surveillance cameras in public spaces makes cities safer and helps prevent crime. Others argue that it is an unacceptable invasion of privacy.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_02",
    task: 2,
    type: "Opinion",
    category: "Society",
    difficulty: "Challenging",
    prompt:
      "Some sociologists argue that social media has made it more difficult for people to form deep, meaningful relationships, replacing genuine connection with superficial online interaction.\n\nTo what extent do you agree that social media is damaging the quality of human relationships?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_03",
    task: 2,
    type: "Problem-Solution",
    category: "Society",
    difficulty: "Moderate",
    prompt:
      "In many cities around the world, homelessness is increasing, particularly among young people and veterans.\n\nWhat are the main causes of homelessness and what can governments and communities do to address this problem effectively?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_04",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Society",
    difficulty: "Moderate",
    prompt:
      "In many countries, the age at which people are expected to retire is being raised due to ageing populations and pressure on pension systems.\n\nWhat are the advantages and disadvantages of raising the retirement age?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_05",
    task: 2,
    type: "Direct Question",
    category: "Society",
    difficulty: "Challenging",
    prompt:
      "In recent years, many governments have introduced policies designed to increase diversity and representation — such as gender quotas for corporate boards and ethnic minority targets in universities.\n\nAre these policies effective and fair? What other approaches could help achieve greater equality in society?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_06",
    task: 2,
    type: "Opinion",
    category: "Society",
    difficulty: "Advanced",
    prompt:
      "Some commentators argue that the rise of online echo chambers — where people only encounter views that confirm their own — is causing unprecedented political polarisation and threatening democratic institutions.\n\nTo what extent do you agree that digital echo chambers pose a serious threat to democracy?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_07",
    task: 2,
    type: "Discussion",
    category: "Society",
    difficulty: "Moderate",
    prompt:
      "Some people argue that immigrants should fully assimilate into the culture of their new country, abandoning their original customs and language. Others believe that maintaining cultural identity enriches host societies.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_soc_08",
    task: 2,
    type: "Problem-Solution",
    category: "Society",
    difficulty: "Advanced",
    prompt:
      "Loneliness has been described as a growing public health epidemic in many developed countries, particularly among elderly people and young adults aged 18–24.\n\nWhat are the causes of this epidemic and what measures can be taken to address social isolation effectively?\n\nWrite at least 250 words.",
  },

  // ── GOVERNMENT & POLITICS ──
  {
    id: "t2_gov_01",
    task: 2,
    type: "Opinion",
    category: "Government",
    difficulty: "Challenging",
    prompt:
      "Some people argue that voting should be made compulsory in democratic countries to ensure that governments truly represent the will of the population. Others believe this infringes on individual freedom.\n\nTo what extent do you agree with compulsory voting?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_gov_02",
    task: 2,
    type: "Discussion",
    category: "Government",
    difficulty: "Advanced",
    prompt:
      "Some political analysts argue that democracy is in decline globally, with authoritarian governments becoming more common even in countries that were previously democratic. Others maintain that democracy remains the dominant and strengthening form of government.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_gov_03",
    task: 2,
    type: "Problem-Solution",
    category: "Government",
    difficulty: "Challenging",
    prompt:
      "Corruption in government and public institutions continues to undermine development in many parts of the world.\n\nWhat are the main causes of political corruption and what steps can be taken to reduce it effectively?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_gov_04",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Government",
    difficulty: "Moderate",
    prompt:
      "Many governments are now considering introducing digital national ID systems that would hold citizens' medical, financial, and criminal records in a single database.\n\nWhat are the advantages and disadvantages of such a system?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_gov_05",
    task: 2,
    type: "Opinion",
    category: "Government",
    difficulty: "Moderate",
    prompt:
      "Some people argue that developed nations have a moral obligation to accept significantly more refugees and asylum seekers. Others believe that countries have the right to strictly control immigration in order to protect national resources and security.\n\nTo what extent do you agree that wealthy nations should accept more refugees?\n\nWrite at least 250 words.",
  },

  // ── URBANISATION & INFRASTRUCTURE ──
  {
    id: "t2_urban_01",
    task: 2,
    type: "Problem-Solution",
    category: "Urbanisation",
    difficulty: "Moderate",
    prompt:
      "Traffic congestion in major cities is becoming increasingly severe, leading to air pollution, wasted fuel, and significant economic losses.\n\nWhat are the main causes of urban traffic congestion and what measures can be most effective in reducing it?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_urban_02",
    task: 2,
    type: "Discussion",
    category: "Urbanisation",
    difficulty: "Challenging",
    prompt:
      "Some urban planners argue that people should be encouraged to move away from overcrowded cities to smaller towns and rural areas, which would be revitalised through government investment. Others believe cities should be expanded and made more efficient.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_urban_03",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Urbanisation",
    difficulty: "Moderate",
    prompt:
      "Many cities are experiencing gentrification — the process by which low-income urban neighbourhoods are redeveloped and attract wealthier residents, displacing existing communities.\n\nWhat are the advantages and disadvantages of gentrification for city populations?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_urban_04",
    task: 2,
    type: "Opinion",
    category: "Urbanisation",
    difficulty: "Advanced",
    prompt:
      "Some architects and planners argue that the solution to urban housing shortages is to build upwards — constructing high-rise residential towers — rather than expanding city boundaries outward into green spaces.\n\nTo what extent do you agree that high-rise housing is the best solution to urban population growth?\n\nWrite at least 250 words.",
  },

  // ── GLOBALISATION & TRADE ──
  {
    id: "t2_global_01",
    task: 2,
    type: "Discussion",
    category: "Globalisation",
    difficulty: "Challenging",
    prompt:
      "Some economists argue that free trade and globalisation have lifted hundreds of millions of people out of poverty and should be expanded further. Others argue that globalisation has increased inequality and undermined national sovereignty.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_global_02",
    task: 2,
    type: "Problem-Solution",
    category: "Globalisation",
    difficulty: "Advanced",
    prompt:
      "Multinational corporations often shift profits to low-tax jurisdictions, depriving governments of tax revenues needed for public services.\n\nWhy does this problem persist and what international measures should be taken to ensure corporations pay a fair share of tax?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_global_03",
    task: 2,
    type: "Opinion",
    category: "Globalisation",
    difficulty: "Moderate",
    prompt:
      "Some people believe that the dominance of the English language in international business and science discriminates against people who speak other languages and leads to a loss of cultural diversity.\n\nTo what extent do you agree with this view?\n\nWrite at least 250 words.",
  },

  // ── SCIENCE & SPACE ──
  {
    id: "t2_sci_01",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Science",
    difficulty: "Advanced",
    prompt:
      "The development of gene-editing technologies such as CRISPR now makes it theoretically possible to modify the DNA of human embryos to eliminate hereditary diseases — and potentially to select for desired traits.\n\nDiscuss the advantages and disadvantages of allowing genetic modification of human embryos.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_sci_02",
    task: 2,
    type: "Discussion",
    category: "Science",
    difficulty: "Moderate",
    prompt:
      "Some people believe that governments should invest more in space exploration, arguing that it drives technological innovation and ensures the long-term survival of humanity. Others argue that the enormous sums involved should be spent on solving problems on Earth.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_sci_03",
    task: 2,
    type: "Opinion",
    category: "Science",
    difficulty: "Challenging",
    prompt:
      "Animal testing remains a standard part of pharmaceutical and cosmetics development in many countries, despite the availability of alternative methods.\n\nTo what extent do you agree that animal testing should be banned across all industries?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_sci_04",
    task: 2,
    type: "Problem-Solution",
    category: "Science",
    difficulty: "Advanced",
    prompt:
      "Antimicrobial resistance — the growing inability of antibiotics to fight bacterial infections — has been described by the WHO as one of the greatest threats to global health.\n\nWhat are the main causes of this problem and what measures should governments and healthcare systems take to address it?\n\nWrite at least 250 words.",
  },

  // ── MEDIA & CULTURE ──
  {
    id: "t2_media_01",
    task: 2,
    type: "Opinion",
    category: "Media",
    difficulty: "Moderate",
    prompt:
      "Some people argue that governments should have the power to censor content on the internet in order to protect citizens from harmful material. Others believe this constitutes a threat to freedom of speech.\n\nTo what extent do you agree that internet censorship is justified?\n\nWrite at least 250 words.",
  },
  {
    id: "t2_media_02",
    task: 2,
    type: "Discussion",
    category: "Media",
    difficulty: "Challenging",
    prompt:
      "Traditional news outlets such as newspapers and television news are losing audiences to social media and online content creators. Some argue this is a positive democratisation of information; others see it as a crisis for journalism.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
  },
  {
    id: "t2_media_03",
    task: 2,
    type: "Advantages-Disadvantages",
    category: "Media",
    difficulty: "Moderate",
    prompt:
      "The rise of video streaming platforms has fundamentally changed how people consume television and film entertainment.\n\nWhat are the advantages and disadvantages of this shift away from traditional broadcast television?\n\nWrite at least 250 words.",
  },
];

// ── TASK 1 TOPICS ────────────────────────────────────────────────────────────

export const TASK1_TOPICS: WritingTopic[] = [

  // ── LINE GRAPHS ──
  {
    id: "t1_line_01",
    task: 1,
    type: "Line Graph",
    category: "Technology",
    difficulty: "Moderate",
    prompt:
      "The graph below shows the percentage of adults who used social media daily in four countries (the USA, the UK, Brazil, and South Korea) between 2015 and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_line_02",
    task: 1,
    type: "Line Graph",
    category: "Environment",
    difficulty: "Challenging",
    prompt:
      "The graph below shows global average surface temperature anomalies (in °C relative to the 1951–1980 baseline) from 1980 to 2024, along with projections to 2035 under two scenarios: current policy and net-zero commitments.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_line_03",
    task: 1,
    type: "Line Graph",
    category: "Economy",
    difficulty: "Moderate",
    prompt:
      "The graph below shows the unemployment rates (%) in three European countries — Germany, Spain, and Poland — from 2010 to 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_line_04",
    task: 1,
    type: "Line Graph",
    category: "Health",
    difficulty: "Moderate",
    prompt:
      "The line graph below shows the number of people per 100,000 diagnosed with Type 2 diabetes in four regions — North America, Europe, South Asia, and Sub-Saharan Africa — between 2000 and 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_line_05",
    task: 1,
    type: "Line Graph",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "The graph below shows the proportion of students enrolled in online university courses compared to traditional on-campus programmes in a particular country from 2015 to 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },

  // ── BAR CHARTS ──
  {
    id: "t1_bar_01",
    task: 1,
    type: "Bar Chart",
    category: "Technology",
    difficulty: "Moderate",
    prompt:
      "The bar chart below shows the average number of hours per week that people in six countries spend on their smartphones, broken down into four activities: social media, video streaming, messaging, and work/study. Data was recorded in 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_bar_02",
    task: 1,
    type: "Bar Chart",
    category: "Environment",
    difficulty: "Challenging",
    prompt:
      "The bar chart below compares the share of electricity generated from renewable sources (solar, wind, hydro, and other) in eight countries in 2010, 2017, and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_bar_03",
    task: 1,
    type: "Bar Chart",
    category: "Society",
    difficulty: "Moderate",
    prompt:
      "The chart below shows the percentage of men and women in different age groups (18–29, 30–44, 45–59, and 60+) who reported experiencing loneliness 'often or always' in a survey conducted across five OECD countries in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_bar_04",
    task: 1,
    type: "Bar Chart",
    category: "Economy",
    difficulty: "Moderate",
    prompt:
      "The bar chart below shows the average annual household expenditure (in US dollars) on seven categories — housing, food, transport, healthcare, education, entertainment, and clothing — in Japan, Brazil, and Nigeria in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_bar_05",
    task: 1,
    type: "Bar Chart",
    category: "Education",
    difficulty: "Challenging",
    prompt:
      "The chart below shows the PISA reading, mathematics, and science scores for fifteen-year-olds in seven countries in 2022, ranked by overall average performance.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },

  // ── PIE CHARTS ──
  {
    id: "t1_pie_01",
    task: 1,
    type: "Pie Chart",
    category: "Environment",
    difficulty: "Moderate",
    prompt:
      "The pie charts below show the breakdown of household energy consumption by source (electricity, natural gas, oil, renewables, and other) in a northern European country in 2004 and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_pie_02",
    task: 1,
    type: "Pie Chart",
    category: "Society",
    difficulty: "Moderate",
    prompt:
      "The two pie charts below show the main reasons given by respondents for choosing to live in cities versus rural areas in a national survey conducted in 2013 and 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_pie_03",
    task: 1,
    type: "Pie Chart",
    category: "Technology",
    difficulty: "Moderate",
    prompt:
      "The pie charts below show the distribution of global internet traffic by content type (video streaming, social media, gaming, e-commerce, web browsing, and other) in 2015 and 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },

  // ── TABLES ──
  {
    id: "t1_table_01",
    task: 1,
    type: "Table",
    category: "Health",
    difficulty: "Moderate",
    prompt:
      "The table below shows data on life expectancy at birth, infant mortality rate (per 1,000 live births), and per capita healthcare spending (USD) for six countries — the USA, Japan, Germany, Brazil, India, and Nigeria — in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_table_02",
    task: 1,
    type: "Table",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "The table below shows the percentage of the population with a tertiary-level qualification, the average graduate starting salary, and the graduate unemployment rate for five countries in 2010 and 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_table_03",
    task: 1,
    type: "Table",
    category: "Environment",
    difficulty: "Challenging",
    prompt:
      "The table below shows the ten countries with the highest CO₂ emissions per capita (tonnes) in 2023, along with their total emissions, population, and the percentage change in per-capita emissions since 2010.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },

  // ── MIXED CHARTS ──
  {
    id: "t1_mixed_01",
    task: 1,
    type: "Mixed Charts",
    category: "Economy",
    difficulty: "Challenging",
    prompt:
      "The bar chart shows the number of new electric vehicles sold in three major markets (China, Europe, and the USA) from 2019 to 2024. The line graph shows the average price of a new electric vehicle (in USD thousands) over the same period.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_mixed_02",
    task: 1,
    type: "Mixed Charts",
    category: "Society",
    difficulty: "Challenging",
    prompt:
      "The pie chart shows the proportion of people in a particular country working in each economic sector (agriculture, manufacturing, services, technology, and other) in 1990 and 2023. The bar chart shows the average annual income for workers in each sector in those same years.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_mixed_03",
    task: 1,
    type: "Mixed Charts",
    category: "Health",
    difficulty: "Advanced",
    prompt:
      "The line graph shows the global prevalence of obesity (% of adult population) from 1990 to 2025 for high-income and low-income countries. The table provides a breakdown by gender and age group (18–39, 40–59, 60+) for 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },

  // ── PROCESS DIAGRAMS ──
  {
    id: "t1_proc_01",
    task: 1,
    type: "Process Diagram",
    category: "Environment",
    difficulty: "Moderate",
    prompt:
      "The diagram below shows the process by which municipal solid waste is sorted, treated, and either recycled, converted to energy, or disposed of in a modern waste management facility.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_proc_02",
    task: 1,
    type: "Process Diagram",
    category: "Technology",
    difficulty: "Moderate",
    prompt:
      "The diagram below illustrates the stages involved in training a large language AI model, from data collection and preprocessing through to fine-tuning, safety evaluation, and deployment.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_proc_03",
    task: 1,
    type: "Process Diagram",
    category: "Science",
    difficulty: "Challenging",
    prompt:
      "The diagram below shows the water cycle as it operates in an urban environment, illustrating how precipitation, runoff, evaporation, groundwater recharge, and treated wastewater interact within a city.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },

  // ── MAPS ──
  {
    id: "t1_map_01",
    task: 1,
    type: "Map",
    category: "Urbanisation",
    difficulty: "Moderate",
    prompt:
      "The maps below show the layout of a coastal town called Merriport in 1985 and 2025. Key changes include the development of a new industrial port, the construction of a motorway bypass, the creation of a nature reserve, and significant residential expansion to the north.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_map_02",
    task: 1,
    type: "Map",
    category: "Education",
    difficulty: "Moderate",
    prompt:
      "The two maps show the layout of a university campus in 2000 and after a major redevelopment in 2025. Changes include the demolition of the original library and sports hall, the construction of a new digital learning centre, student accommodation blocks, and an outdoor green space.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
  {
    id: "t1_map_03",
    task: 1,
    type: "Map",
    category: "Urbanisation",
    difficulty: "Challenging",
    prompt:
      "The maps below show a city district in 1970, 2000, and 2025, illustrating its transformation from a predominantly industrial area with warehouses and factories to a mixed-use urban neighbourhood with residential buildings, office towers, retail zones, and parks.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
  },
];

// ── Combined & helpers ────────────────────────────────────────────────────────

export const ALL_TOPICS: WritingTopic[] = [...TASK2_TOPICS, ...TASK1_TOPICS];

export const TASK2_CATEGORIES = [
  ...new Set(TASK2_TOPICS.map((t) => t.category)),
];
export const TASK1_CATEGORIES = [
  ...new Set(TASK1_TOPICS.map((t) => t.category)),
];

export const TYPE_COLOR: Record<string, string> = {
  Opinion: "bg-blue-100 text-blue-700 border-blue-200",
  Discussion: "bg-violet-100 text-violet-700 border-violet-200",
  "Problem-Solution": "bg-amber-100 text-amber-700 border-amber-200",
  "Advantages-Disadvantages": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Direct Question": "bg-rose-100 text-rose-700 border-rose-200",
  "Line Graph": "bg-sky-100 text-sky-700 border-sky-200",
  "Bar Chart": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Pie Chart": "bg-pink-100 text-pink-700 border-pink-200",
  Table: "bg-teal-100 text-teal-700 border-teal-200",
  "Mixed Charts": "bg-orange-100 text-orange-700 border-orange-200",
  "Process Diagram": "bg-lime-100 text-lime-700 border-lime-200",
  Map: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export const DIFF_COLOR: Record<string, string> = {
  Moderate: "bg-green-100 text-green-700 border-green-200",
  Challenging: "bg-amber-100 text-amber-700 border-amber-200",
  Advanced: "bg-red-100 text-red-700 border-red-200",
};

export function getRandomTopic(task: 1 | 2): WritingTopic {
  const pool = task === 1 ? TASK1_TOPICS : TASK2_TOPICS;
  return pool[Math.floor(Math.random() * pool.length)];
}
