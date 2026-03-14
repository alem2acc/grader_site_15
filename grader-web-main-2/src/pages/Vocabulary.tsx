import { useState } from "react";
import { BookOpen, Zap, Brain, CheckCircle, Search, X } from "lucide-react";

/* ── Word interface ───────────────────────────────────────────────────────── */
interface Word {
  id: string;
  word: string;
  phonetic: string;
  pos: string;
  difficulty: number;   // 1 = Beginner, 2 = Intermediate, 3 = Advanced
  topic: string;
  definition: string;
  example: string;
  synonyms: string[];
  translation?: string;
}

/* ── Word data (do not edit) ──────────────────────────────────────────────── */
const VOCAB: Word[] = [
  // 🌿 Environment (12)
  { id: "e1",  word: "biodiversity",       phonetic: "/ˌbaɪəʊdaɪˈvɜːsɪti/",  pos: "noun",   difficulty: 2, topic: "environment", definition: "The variety of plant and animal life in a particular habitat or on Earth as a whole", example: "Protecting biodiversity is essential to maintaining the balance of natural ecosystems.", synonyms: ["species richness","ecological variety","natural diversity"] },
  { id: "e2",  word: "deforestation",      phonetic: "/diːˌfɒrɪˈsteɪʃn/",    pos: "noun",   difficulty: 1, topic: "environment", definition: "The action of clearing a wide area of trees, often causing serious ecological damage", example: "Rampant deforestation in the Amazon has accelerated global climate change.", synonyms: ["forest clearance","tree felling","woodland destruction"] },
  { id: "e3",  word: "sustainability",     phonetic: "/səˌsteɪnəˈbɪlɪti/",    pos: "noun",   difficulty: 1, topic: "environment", definition: "The ability to maintain at a certain rate without depleting natural resources", example: "Sustainability must be at the core of modern urban planning and development.", synonyms: ["viability","ecological balance","green development"] },
  { id: "e4",  word: "carbon footprint",   phonetic: "/ˈkɑːbən ˈfʊtprɪnt/",   pos: "noun",   difficulty: 1, topic: "environment", definition: "The total amount of greenhouse gases produced by human activities, expressed as carbon dioxide equivalent", example: "Switching to renewable energy dramatically reduces an individual's carbon footprint.", synonyms: ["emissions","environmental impact","CO2 output"] },
  { id: "e5",  word: "mitigation",         phonetic: "/ˌmɪtɪˈɡeɪʃn/",         pos: "noun",   difficulty: 2, topic: "environment", definition: "The action of reducing the severity, seriousness, or painfulness of something", example: "Climate change mitigation requires urgent international cooperation and policy reform.", synonyms: ["reduction","alleviation","moderation"] },
  { id: "e6",  word: "pollutant",          phonetic: "/pəˈluːtənt/",           pos: "noun",   difficulty: 1, topic: "environment", definition: "A substance that contaminates air, water, or soil and harms living organisms", example: "Industrial pollutants discharged into rivers devastate aquatic life downstream.", synonyms: ["contaminant","toxin","impurity"] },
  { id: "e7",  word: "renewable",          phonetic: "/rɪˈnjuːəbl/",           pos: "adj",    difficulty: 1, topic: "environment", definition: "Relating to energy sources that are naturally replenished and not depleted by use", example: "The shift to renewable energy sources is critical for reducing dependence on fossil fuels.", synonyms: ["sustainable","clean","inexhaustible"] },
  { id: "e8",  word: "erosion",            phonetic: "/ɪˈrəʊʒn/",              pos: "noun",   difficulty: 2, topic: "environment", definition: "The gradual destruction or diminution of something, especially by natural forces", example: "Coastal erosion threatens thousands of homes and historical landmarks worldwide.", synonyms: ["wearing away","degradation","deterioration"] },
  { id: "e9",  word: "greenhouse effect",  phonetic: "/ˈɡriːnhaʊs ɪˌfekt/",   pos: "noun",   difficulty: 1, topic: "environment", definition: "The trapping of the sun's warmth in Earth's lower atmosphere due to gases that absorb infrared radiation", example: "The greenhouse effect, intensified by human activity, is driving unprecedented global warming.", synonyms: ["global warming","atmospheric heating","thermal trapping"] },
  { id: "e10", word: "conservation",       phonetic: "/ˌkɒnsəˈveɪʃn/",         pos: "noun",   difficulty: 1, topic: "environment", definition: "The protection of plants, animals, and natural areas, especially from human damage", example: "Wildlife conservation programmes have helped several endangered species recover.", synonyms: ["preservation","protection","stewardship"] },
  { id: "e11", word: "contamination",      phonetic: "/kənˌtæmɪˈneɪʃn/",      pos: "noun",   difficulty: 2, topic: "environment", definition: "The action of making something impure or poisonous by introducing harmful substances", example: "Groundwater contamination from agricultural chemicals poses serious public health risks.", synonyms: ["pollution","poisoning","adulteration"] },
  { id: "e12", word: "habitat destruction",phonetic: "/ˈhæbɪtæt dɪˌstrʌkʃn/", pos: "noun",   difficulty: 2, topic: "environment", definition: "The process by which a natural habitat is rendered unable to support its native species", example: "Habitat destruction remains the single greatest threat to global species extinction.", synonyms: ["environmental degradation","ecosystem loss","land conversion"] },
  // ⚡ Technology (12)
  { id: "t1",  word: "algorithm",          phonetic: "/ˈælɡərɪðəm/",           pos: "noun",   difficulty: 2, topic: "technology",  definition: "A process or set of rules followed in calculations or problem-solving operations, especially by a computer", example: "Social media algorithms determine what content users see, shaping public opinion at scale.", synonyms: ["procedure","process","formula"] },
  { id: "t2",  word: "automation",         phonetic: "/ˌɔːtəˈmeɪʃn/",          pos: "noun",   difficulty: 1, topic: "technology",  definition: "The use of technology to perform tasks with minimal human assistance", example: "Workplace automation threatens to displace millions of low-skilled workers globally.", synonyms: ["mechanisation","computerisation","robotisation"] },
  { id: "t3",  word: "artificial intelligence", phonetic: "/ˌɑːtɪfɪʃl ɪnˈtelɪdʒəns/", pos: "noun", difficulty: 1, topic: "technology", definition: "The simulation of human intelligence processes by computer systems", example: "Artificial intelligence is rapidly transforming sectors from healthcare to financial services.", synonyms: ["machine intelligence","machine learning"] },
  { id: "t4",  word: "surveillance",       phonetic: "/səˈveɪləns/",            pos: "noun",   difficulty: 2, topic: "technology",  definition: "Close observation, especially of a suspected person or group, often using technology", example: "Mass digital surveillance raises profound questions about privacy and civil liberties.", synonyms: ["monitoring","observation","tracking"] },
  { id: "t5",  word: "cybersecurity",      phonetic: "/ˌsaɪbəsɪˈkjʊərɪti/",    pos: "noun",   difficulty: 2, topic: "technology",  definition: "The practice of protecting systems, networks, and programs from digital attacks", example: "Investing in robust cybersecurity has become a strategic priority for governments worldwide.", synonyms: ["digital security","network protection","information security"] },
  { id: "t6",  word: "innovation",         phonetic: "/ˌɪnəˈveɪʃn/",            pos: "noun",   difficulty: 1, topic: "technology",  definition: "The action of introducing new methods, ideas, or products", example: "Technological innovation has compressed what once took decades into a matter of years.", synonyms: ["advancement","breakthrough","invention"] },
  { id: "t7",  word: "infrastructure",     phonetic: "/ˈɪnfrəˌstrʌktʃə/",      pos: "noun",   difficulty: 2, topic: "technology",  definition: "The basic physical and organisational structures needed for the operation of a society or enterprise", example: "Reliable digital infrastructure is the backbone of any modern knowledge-based economy.", synonyms: ["framework","foundation","backbone"] },
  { id: "t8",  word: "obsolescence",       phonetic: "/ˌɒbsəˈlesns/",           pos: "noun",   difficulty: 3, topic: "technology",  definition: "The process of becoming outdated or no longer useful due to newer developments", example: "Planned obsolescence in consumer electronics generates enormous volumes of electronic waste.", synonyms: ["outdatedness","redundancy","deprecation"] },
  { id: "t9",  word: "digitalisation",     phonetic: "/ˌdɪdʒɪtəlaɪˈzeɪʃn/",    pos: "noun",   difficulty: 2, topic: "technology",  definition: "The conversion of processes and services to digital form; integration of digital technology into all areas", example: "The digitalisation of public services has improved efficiency but excluded the elderly.", synonyms: ["digitisation","digital transformation","e-enablement"] },
  { id: "t10", word: "biotechnology",      phonetic: "/ˌbaɪəʊtekˈnɒlədʒi/",    pos: "noun",   difficulty: 2, topic: "technology",  definition: "The exploitation of biological processes for industrial and other purposes, especially genetic manipulation", example: "Advances in biotechnology have made it possible to develop vaccines in record time.", synonyms: ["bioengineering","life sciences","genetic technology"] },
  { id: "t11", word: "proliferation",      phonetic: "/prəˌlɪfəˈreɪʃn/",       pos: "noun",   difficulty: 3, topic: "technology",  definition: "Rapid increase in the number or amount of something", example: "The proliferation of smartphones has fundamentally altered patterns of human communication.", synonyms: ["spread","multiplication","expansion"] },
  { id: "t12", word: "dependency",         phonetic: "/dɪˈpendənsi/",           pos: "noun",   difficulty: 1, topic: "technology",  definition: "The state of relying on or being controlled by someone or something else", example: "Society's growing dependency on digital platforms creates new vulnerabilities and risks.", synonyms: ["reliance","dependence","addiction"] },
  // 📚 Education (12)
  { id: "ed1", word: "pedagogy",           phonetic: "/ˈpedəɡɒdʒi/",           pos: "noun",   difficulty: 3, topic: "education",   definition: "The method and practice of teaching, especially as an academic subject or theoretical concept", example: "Modern pedagogy increasingly emphasises collaborative and student-centred learning approaches.", synonyms: ["teaching","instruction","didactics"] },
  { id: "ed2", word: "curriculum",         phonetic: "/kəˈrɪkjʊləm/",          pos: "noun",   difficulty: 1, topic: "education",   definition: "The subjects comprising a course of study in a school, college, or university", example: "A well-designed curriculum must balance academic rigour with practical life skills.", synonyms: ["syllabus","course of study","programme"] },
  { id: "ed3", word: "literacy",           phonetic: "/ˈlɪtərəsi/",             pos: "noun",   difficulty: 1, topic: "education",   definition: "The ability to read and write; competence or knowledge in a specified area", example: "Digital literacy has become as fundamental as reading and writing in the modern world.", synonyms: ["ability","competence","proficiency"] },
  { id: "ed4", word: "meritocracy",        phonetic: "/ˌmerɪˈtɒkrəsi/",        pos: "noun",   difficulty: 3, topic: "education",   definition: "A system in which advancement is based on ability and talent rather than privilege", example: "Critics argue that education systems claiming to be meritocracies still favour the wealthy.", synonyms: ["ability-based system","talent system","fair system"] },
  { id: "ed5", word: "academia",           phonetic: "/ˌækəˈdiːmiə/",           pos: "noun",   difficulty: 2, topic: "education",   definition: "The environment or community concerned with the pursuit of research and scholarship", example: "The gap between academia and the private sector often slows the application of research.", synonyms: ["scholarly world","university sphere","academic community"] },
  { id: "ed6", word: "standardised testing",phonetic: "/ˈstændədaɪzd ˈtestɪŋ/",pos: "phrase", difficulty: 2, topic: "education",   definition: "Assessment administered and scored in a consistent manner to allow comparison of results", example: "The over-reliance on standardised testing has been criticised for stifling creativity.", synonyms: ["uniform examination","benchmark testing","norm-referenced testing"] },
  { id: "ed7", word: "vocational",         phonetic: "/vəˈkeɪʃənl/",            pos: "adj",    difficulty: 2, topic: "education",   definition: "Relating to an occupation or employment, especially practical skills training", example: "Vocational training programmes provide young people with industry-relevant skills.", synonyms: ["occupational","practical","trade-based"] },
  { id: "ed8", word: "cognitive",          phonetic: "/ˈkɒɡnɪtɪv/",             pos: "adj",    difficulty: 2, topic: "education",   definition: "Relating to the mental processes of acquiring knowledge and understanding through thought", example: "Early childhood experiences have a profound effect on long-term cognitive development.", synonyms: ["mental","intellectual","psychological"] },
  { id: "ed9", word: "inclusivity",        phonetic: "/ˌɪnkluːˈsɪvɪti/",       pos: "noun",   difficulty: 2, topic: "education",   definition: "The practice of including people who might otherwise be excluded or marginalised", example: "Inclusivity in education ensures that children with disabilities receive equal opportunities.", synonyms: ["inclusion","diversity","accessibility"] },
  { id: "ed10",word: "rote learning",      phonetic: "/rəʊt ˈlɜːnɪŋ/",         pos: "phrase", difficulty: 1, topic: "education",   definition: "Learning through repetition and memorisation without necessarily understanding the material", example: "Critics of rote learning argue it fails to develop critical thinking or problem-solving skills.", synonyms: ["memorisation","repetition learning","drill learning"] },
  { id: "ed11",word: "attainment",         phonetic: "/əˈteɪnmənt/",            pos: "noun",   difficulty: 2, topic: "education",   definition: "The achievement of something desired, planned, or attempted, especially in education", example: "Socioeconomic background remains the biggest predictor of educational attainment.", synonyms: ["achievement","accomplishment","performance"] },
  { id: "ed12",word: "scholarship",        phonetic: "/ˈskɒləʃɪp/",             pos: "noun",   difficulty: 1, topic: "education",   definition: "Academic study or achievement; a grant to support a student's education", example: "Merit-based scholarships allow talented students from disadvantaged backgrounds to thrive.", synonyms: ["bursary","grant","fellowship"] },
  // 🫀 Health (12)
  { id: "h1",  word: "pandemic",           phonetic: "/pænˈdemɪk/",             pos: "noun",   difficulty: 1, topic: "health",      definition: "An outbreak of disease that occurs over a wide geographic area and affects a high proportion of the population", example: "The COVID-19 pandemic exposed critical weaknesses in global public health infrastructure.", synonyms: ["epidemic","outbreak","plague"] },
  { id: "h2",  word: "mortality",          phonetic: "/mɔːˈtælɪti/",            pos: "noun",   difficulty: 2, topic: "health",      definition: "The state of being subject to death; the number of deaths in a given time or place", example: "Child mortality rates have declined significantly in countries with strong healthcare systems.", synonyms: ["death rate","fatality","lethality"] },
  { id: "h3",  word: "sedentary",          phonetic: "/ˈsedntri/",               pos: "adj",    difficulty: 2, topic: "health",      definition: "Tending to spend much time seated; characterised by little physical activity", example: "The rise of sedentary lifestyles is closely linked to increases in obesity and heart disease.", synonyms: ["inactive","stationary","desk-bound"] },
  { id: "h4",  word: "prevalence",         phonetic: "/ˈprevələns/",             pos: "noun",   difficulty: 2, topic: "health",      definition: "The fact or condition of being widespread; the proportion of a population found to have a condition", example: "The prevalence of mental health disorders among young people has risen alarmingly.", synonyms: ["frequency","incidence","commonness"] },
  { id: "h5",  word: "obesity",            phonetic: "/əʊˈbiːsɪti/",            pos: "noun",   difficulty: 1, topic: "health",      definition: "The condition of being significantly overweight, to a degree that endangers health", example: "Obesity is now classified as a global epidemic by the World Health Organisation.", synonyms: ["overweight","excess weight","corpulence"] },
  { id: "h6",  word: "malnutrition",       phonetic: "/ˌmælnjuːˈtrɪʃn/",        pos: "noun",   difficulty: 2, topic: "health",      definition: "Lack of proper nutrition, caused by not eating enough, eating the wrong things, or inability to absorb nutrients", example: "Malnutrition in early childhood causes irreversible developmental damage.", synonyms: ["undernourishment","nutritional deficiency","hunger"] },
  { id: "h7",  word: "immunisation",       phonetic: "/ˌɪmjʊnaɪˈzeɪʃn/",        pos: "noun",   difficulty: 1, topic: "health",      definition: "The process of making a person immune to an infection by administering a vaccine", example: "Mass immunisation campaigns have eradicated smallpox and nearly eliminated polio.", synonyms: ["vaccination","inoculation","protection"] },
  { id: "h8",  word: "chronic",            phonetic: "/ˈkrɒnɪk/",               pos: "adj",    difficulty: 1, topic: "health",      definition: "Persisting for a long time or constantly recurring, used especially of an illness", example: "Chronic stress has been linked to a range of serious physical and mental health conditions.", synonyms: ["persistent","long-term","prolonged"] },
  { id: "h9",  word: "well-being",         phonetic: "/ˈwel biːɪŋ/",            pos: "noun",   difficulty: 1, topic: "health",      definition: "The state of being comfortable, healthy, or happy", example: "Governments increasingly use well-being indices alongside GDP to measure national progress.", synonyms: ["welfare","health","flourishing"] },
  { id: "h10", word: "pathogen",           phonetic: "/ˈpæθədʒən/",             pos: "noun",   difficulty: 3, topic: "health",      definition: "A microorganism capable of causing disease in its host", example: "Understanding how pathogens mutate is essential for developing effective treatments.", synonyms: ["microbe","virus","bacterium"] },
  { id: "h11", word: "diagnosis",          phonetic: "/ˌdaɪəɡˈnəʊsɪs/",        pos: "noun",   difficulty: 1, topic: "health",      definition: "The identification of the nature of an illness or problem through examination", example: "Early diagnosis of cancer significantly improves survival rates and quality of treatment.", synonyms: ["identification","assessment","detection"] },
  { id: "h12", word: "rehabilitation",     phonetic: "/ˌriːəˌbɪlɪˈteɪʃn/",     pos: "noun",   difficulty: 2, topic: "health",      definition: "The action of restoring someone to health or normal life through training and therapy", example: "Rehabilitation programmes for prisoners have been shown to reduce rates of reoffending.", synonyms: ["recovery","restoration","reintegration"] },
  // 💹 Economics (12)
  { id: "ec1", word: "inequality",         phonetic: "/ˌɪnɪˈkwɒlɪti/",         pos: "noun",   difficulty: 1, topic: "economics",   definition: "Difference in size, degree, circumstances, or social and economic position", example: "Rising income inequality is widely considered one of the most pressing political challenges today.", synonyms: ["disparity","imbalance","unevenness"] },
  { id: "ec2", word: "fiscal policy",      phonetic: "/ˈfɪskl ˈpɒlɪsi/",       pos: "phrase", difficulty: 2, topic: "economics",   definition: "Government policy relating to taxation and public spending to influence the economy", example: "Expansionary fiscal policy during a recession can stimulate economic growth and employment.", synonyms: ["budget policy","taxation policy","public finance"] },
  { id: "ec3", word: "inflation",          phonetic: "/ɪnˈfleɪʃn/",             pos: "noun",   difficulty: 1, topic: "economics",   definition: "A general increase in prices and fall in the purchasing value of money", example: "Surging inflation eroded the savings of millions of households worldwide.", synonyms: ["price rise","cost increase","devaluation"] },
  { id: "ec4", word: "monopoly",           phonetic: "/məˈnɒpəli/",             pos: "noun",   difficulty: 1, topic: "economics",   definition: "Exclusive possession or control of the supply of a commodity or service", example: "Tech giants have been accused of using their monopoly power to eliminate competition.", synonyms: ["dominance","control","cartel"] },
  { id: "ec5", word: "subsidy",            phonetic: "/ˈsʌbsɪdi/",              pos: "noun",   difficulty: 1, topic: "economics",   definition: "A sum of money granted by the government to assist an industry or business regarded as being in the public interest", example: "Agricultural subsidies in wealthy nations distort global trade and harm farmers in developing countries.", synonyms: ["grant","allowance","financial support"] },
  { id: "ec6", word: "deregulation",       phonetic: "/ˌdiːˌreɡjʊˈleɪʃn/",     pos: "noun",   difficulty: 3, topic: "economics",   definition: "The removal or reduction of government controls and regulations in a particular industry", example: "Financial deregulation in the 1990s contributed to the conditions that caused the 2008 crisis.", synonyms: ["liberalisation","privatisation","free market reform"] },
  { id: "ec7", word: "recession",          phonetic: "/rɪˈseʃn/",               pos: "noun",   difficulty: 1, topic: "economics",   definition: "A period of temporary economic decline during which trade and industrial activity are reduced", example: "The global recession triggered by the pandemic caused unprecedented levels of unemployment.", synonyms: ["downturn","slump","economic contraction"] },
  { id: "ec8", word: "tariff",             phonetic: "/ˈtærɪf/",                pos: "noun",   difficulty: 2, topic: "economics",   definition: "A tax or duty imposed by a government on imported or exported goods", example: "Punitive tariffs imposed during trade disputes can cause significant harm to both economies.", synonyms: ["tax","duty","levy"] },
  { id: "ec9", word: "expenditure",        phonetic: "/ɪkˈspendɪtʃə/",         pos: "noun",   difficulty: 2, topic: "economics",   definition: "The action of spending funds; an amount of money spent", example: "Public expenditure on education is widely regarded as a long-term investment in prosperity.", synonyms: ["spending","outlay","disbursement"] },
  { id: "ec10",word: "stagnation",         phonetic: "/stæɡˈneɪʃn/",           pos: "noun",   difficulty: 3, topic: "economics",   definition: "The state of not flowing or moving, or showing little or no activity or development", example: "A decade of economic stagnation has fuelled deep public frustration with establishment politics.", synonyms: ["standstill","inactivity","sluggishness"] },
  { id: "ec11",word: "microfinance",       phonetic: "/ˈmaɪkrəʊˌfaɪnæns/",     pos: "noun",   difficulty: 3, topic: "economics",   definition: "Financial services offered to unemployed or low-income individuals who have no access to conventional banking", example: "Microfinance initiatives have empowered women entrepreneurs in developing economies.", synonyms: ["microcredit","small loans","community banking"] },
  { id: "ec12",word: "privatisation",      phonetic: "/ˌpraɪvɪtaɪˈzeɪʃn/",     pos: "noun",   difficulty: 2, topic: "economics",   definition: "The transfer of a business, industry, or service from public to private ownership", example: "The privatisation of utilities has been fiercely debated, with mixed outcomes across countries.", synonyms: ["commercialisation","deregulation","transfer of ownership"] },
  // 🏛️ Society (12)
  { id: "s1",  word: "urbanisation",       phonetic: "/ˌɜːbənaɪˈzeɪʃn/",       pos: "noun",   difficulty: 1, topic: "society",     definition: "The process by which towns and cities grow larger as more people come to live in them", example: "Rapid urbanisation in developing nations is creating new challenges for infrastructure planning.", synonyms: ["city growth","urban expansion","metropolitan development"] },
  { id: "s2",  word: "demographics",       phonetic: "/ˌdeməˈɡræfɪks/",         pos: "noun",   difficulty: 2, topic: "society",     definition: "Statistical data relating to the population and particular groups within it", example: "Shifting demographics in many countries are creating new pressures on pension systems.", synonyms: ["population data","statistics","census data"] },
  { id: "s3",  word: "marginalisation",    phonetic: "/ˌmɑːdʒɪnəlaɪˈzeɪʃn/",   pos: "noun",   difficulty: 3, topic: "society",     definition: "The process of treating a person, group, or concept as insignificant or peripheral", example: "The marginalisation of indigenous communities has contributed to persistent cycles of poverty.", synonyms: ["exclusion","disenfranchisement","sidelining"] },
  { id: "s4",  word: "social mobility",    phonetic: "/ˈsəʊʃl məˈbɪlɪti/",     pos: "noun",   difficulty: 2, topic: "society",     definition: "The movement of individuals, families, or groups through a system of social hierarchy", example: "Declining social mobility suggests that wealth increasingly determines life outcomes from birth.", synonyms: ["upward mobility","class movement","socioeconomic progression"] },
  { id: "s5",  word: "discrimination",     phonetic: "/dɪˌskrɪmɪˈneɪʃn/",      pos: "noun",   difficulty: 1, topic: "society",     definition: "The unjust or prejudicial treatment of different categories of people, especially on grounds of race, age, or sex", example: "Workplace discrimination against women persists despite decades of equal opportunities legislation.", synonyms: ["prejudice","bias","unfair treatment"] },
  { id: "s6",  word: "cohesion",           phonetic: "/kəʊˈhiːʒn/",            pos: "noun",   difficulty: 2, topic: "society",     definition: "The action or fact of forming a united whole; the quality of being logically integrated", example: "Policymakers are concerned that growing inequality threatens social cohesion.", synonyms: ["unity","solidarity","togetherness"] },
  { id: "s7",  word: "assimilation",       phonetic: "/əˌsɪmɪˈleɪʃn/",         pos: "noun",   difficulty: 2, topic: "society",     definition: "The process by which a person or group adopts the culture and identity of a dominant group", example: "Forced assimilation policies have historically undermined indigenous cultures and languages.", synonyms: ["integration","absorption","acculturation"] },
  { id: "s8",  word: "patriarchy",         phonetic: "/ˈpeɪtriɑːki/",           pos: "noun",   difficulty: 3, topic: "society",     definition: "A social system in which men hold primary power and predominate in roles of political authority", example: "Feminist scholars argue that patriarchy shapes institutional structures in subtle but pervasive ways.", synonyms: ["male dominance","androcentrism","male-dominated system"] },
  { id: "s9",  word: "migration",          phonetic: "/maɪˈɡreɪʃn/",            pos: "noun",   difficulty: 1, topic: "society",     definition: "Movement of people from one place to another with the intention of settling in the new location", example: "Climate-driven migration is expected to displace hundreds of millions in coming decades.", synonyms: ["movement","displacement","relocation"] },
  { id: "s10", word: "secularism",         phonetic: "/ˈsekjʊlərɪzəm/",         pos: "noun",   difficulty: 3, topic: "society",     definition: "The principle of separation of the state from religious institutions and belief", example: "The tension between secularism and religious identity is central to many political debates.", synonyms: ["separation of church and state","non-religiosity","laicism"] },
  { id: "s11", word: "philanthropy",       phonetic: "/fɪˈlænθrəpi/",           pos: "noun",   difficulty: 3, topic: "society",     definition: "The desire to promote the welfare of others, expressed by generous donation of money to good causes", example: "Corporate philanthropy, while beneficial, cannot substitute for robust government welfare programmes.", synonyms: ["charity","altruism","benevolence"] },
  { id: "s12", word: "sovereignty",        phonetic: "/ˈsɒvrənti/",             pos: "noun",   difficulty: 2, topic: "society",     definition: "Supreme power or authority, especially a state's right to govern itself", example: "Globalisation has challenged the traditional notion of state sovereignty in complex ways.", synonyms: ["autonomy","independence","self-governance"] },
  // 🔬 Science (12)
  { id: "sc1", word: "empirical",          phonetic: "/ɪmˈpɪrɪkl/",             pos: "adj",    difficulty: 2, topic: "science",     definition: "Based on, concerned with, or verifiable by observation or experience rather than theory", example: "Sound policy decisions should be grounded in empirical evidence rather than ideological assumptions.", synonyms: ["observable","evidence-based","experimental"] },
  { id: "sc2", word: "hypothesis",         phonetic: "/haɪˈpɒθɪsɪs/",          pos: "noun",   difficulty: 2, topic: "science",     definition: "A supposition or proposed explanation made on the basis of limited evidence as a starting point for investigation", example: "The researchers formulated a hypothesis to explain the unexpected patterns in their data.", synonyms: ["theory","supposition","proposition"] },
  { id: "sc3", word: "variable",           phonetic: "/ˈveəriəbl/",             pos: "noun",   difficulty: 2, topic: "science",     definition: "An element, feature, or factor that is liable to vary or change in a scientific experiment", example: "Controlling for socioeconomic variables is essential when studying educational outcomes.", synonyms: ["factor","element","parameter"] },
  { id: "sc4", word: "methodology",        phonetic: "/ˌmeθəˈdɒlədʒi/",        pos: "noun",   difficulty: 2, topic: "science",     definition: "A system of methods used in a particular area of study or activity", example: "The credibility of the study depends entirely on the rigour of its research methodology.", synonyms: ["approach","framework","procedure"] },
  { id: "sc5", word: "correlation",        phonetic: "/ˌkɒrəˈleɪʃn/",          pos: "noun",   difficulty: 2, topic: "science",     definition: "A mutual relationship between two or more things; a statistical connection between variables", example: "There is a strong correlation between poverty levels and poor health outcomes.", synonyms: ["relationship","connection","association"] },
  { id: "sc6", word: "peer review",        phonetic: "/pɪə rɪˈvjuː/",          pos: "phrase", difficulty: 2, topic: "science",     definition: "Evaluation of scientific, academic, or professional work by others in the same field", example: "The peer review process, though imperfect, remains essential for ensuring scientific integrity.", synonyms: ["expert review","scholarly evaluation","editorial assessment"] },
  { id: "sc7", word: "longitudinal",       phonetic: "/ˌlɒŋɡɪˈtjuːdɪnl/",      pos: "adj",    difficulty: 3, topic: "science",     definition: "Involving information about an individual or group gathered over a long period of time", example: "Longitudinal studies tracking children from birth provide the richest developmental data.", synonyms: ["long-term","extended","over-time"] },
  { id: "sc8", word: "phenomenon",         phonetic: "/fəˈnɒmɪnən/",            pos: "noun",   difficulty: 2, topic: "science",     definition: "A fact or situation that is observed to exist or happen, especially one whose cause is in question", example: "The aurora borealis is a stunning natural phenomenon caused by charged solar particles.", synonyms: ["occurrence","event","observable fact"] },
  { id: "sc9", word: "synthesis",          phonetic: "/ˈsɪnθəsɪs/",            pos: "noun",   difficulty: 2, topic: "science",     definition: "The combination of ideas, substances, or components to form a new, coherent whole", example: "A synthesis of existing research reveals a consistent pattern of results across contexts.", synonyms: ["combination","integration","fusion"] },
  { id: "sc10",word: "paradigm",           phonetic: "/ˈpærədaɪm/",            pos: "noun",   difficulty: 3, topic: "science",     definition: "A typical example or pattern of something; a world view underlying the theories and practices of a discipline", example: "Quantum mechanics represented a paradigm shift that overturned classical physics.", synonyms: ["model","framework","worldview"] },
  { id: "sc11",word: "replication",        phonetic: "/ˌreplɪˈkeɪʃn/",         pos: "noun",   difficulty: 3, topic: "science",     definition: "The action of reproducing or being reproduced; repeating a scientific experiment to confirm results", example: "Failure of replication across different laboratories calls the original findings into question.", synonyms: ["reproduction","repetition","duplication"] },
  { id: "sc12",word: "catalyst",           phonetic: "/ˈkætəlɪst/",            pos: "noun",   difficulty: 2, topic: "science",     definition: "A substance that increases the rate of a reaction; a person or event that causes rapid change", example: "The invention of the internet was a catalyst for the most sweeping social changes in history.", synonyms: ["trigger","accelerant","agent of change"] },

  // 📖 General IELTS Vocabulary — Days 1-45
  // Day 1 — Verbs of Change
  { id:"g1",  word:"accelerate",   phonetic:"/əkˈseləreɪt/",    pos:"verb", difficulty:1, topic:"general", definition:"Increase in speed or rate; cause to happen sooner", example:"Digital technologies accelerate the pace of economic development.", synonyms:["speed up","hasten","quicken"], translation:"ускорять" },
  { id:"g2",  word:"decline",      phonetic:"/dɪˈklaɪn/",       pos:"verb", difficulty:1, topic:"general", definition:"Become smaller or less; weaken or deteriorate", example:"Birth rates have declined sharply in many industrialised nations.", synonyms:["decrease","diminish","fall"], translation:"снижаться" },
  { id:"g3",  word:"fluctuate",    phonetic:"/ˈflʌktʃueɪt/",    pos:"verb", difficulty:2, topic:"general", definition:"Rise and fall irregularly in number or amount", example:"Oil prices fluctuate in response to geopolitical events and market demand.", synonyms:["vary","oscillate","waver"], translation:"колебаться" },
  { id:"g4",  word:"transform",    phonetic:"/trænsˈfɔːm/",      pos:"verb", difficulty:1, topic:"general", definition:"Make a thorough or dramatic change in form, appearance, or character", example:"Globalisation has fundamentally transformed patterns of trade and labour.", synonyms:["change","convert","reshape"], translation:"преобразовывать" },
  { id:"g5",  word:"diminish",     phonetic:"/dɪˈmɪnɪʃ/",       pos:"verb", difficulty:2, topic:"general", definition:"Make or become less; reduce in size, extent, or importance", example:"Prolonged conflict can diminish a society's social trust and cohesion.", synonyms:["reduce","lessen","dwindle"], translation:"уменьшать" },
  { id:"g6",  word:"deteriorate",  phonetic:"/dɪˈtɪəriəreɪt/",  pos:"verb", difficulty:2, topic:"general", definition:"Become progressively worse", example:"Air quality continues to deteriorate in cities without strict emission controls.", synonyms:["worsen","degrade","decline"], translation:"ухудшаться" },
  { id:"g7",  word:"reinforce",    phonetic:"/ˌriːɪnˈfɔːs/",    pos:"verb", difficulty:2, topic:"general", definition:"Strengthen or support, especially with additional material or evidence", example:"Research findings reinforce the need for early childhood investment.", synonyms:["strengthen","bolster","support"], translation:"укреплять" },
  { id:"g8",  word:"undermine",    phonetic:"/ˌʌndəˈmaɪn/",     pos:"verb", difficulty:2, topic:"general", definition:"Weaken or damage something gradually or insidiously", example:"Corruption and nepotism undermine public trust in democratic institutions.", synonyms:["weaken","erode","sabotage"], translation:"подрывать" },
  { id:"g9",  word:"alleviate",    phonetic:"/əˈliːvieɪt/",      pos:"verb", difficulty:2, topic:"general", definition:"Make suffering, deficiency, or a problem less severe", example:"Targeted subsidies can alleviate poverty in the most vulnerable communities.", synonyms:["ease","relieve","reduce"], translation:"облегчать" },
  { id:"g10", word:"exacerbate",   phonetic:"/ɪɡˈzæsəbeɪt/",    pos:"verb", difficulty:3, topic:"general", definition:"Make a problem, bad situation, or negative feeling worse", example:"Austerity measures often exacerbate inequality rather than address its root causes.", synonyms:["worsen","aggravate","intensify"], translation:"усугублять" },
  // Day 2 — Academic Nouns I
  { id:"g11", word:"assumption",   phonetic:"/əˈsʌmpʃn/",        pos:"noun", difficulty:1, topic:"general", definition:"A thing that is accepted as true without proof", example:"Economic models are based on simplifying assumptions about human behaviour.", synonyms:["presumption","premise","hypothesis"], translation:"предположение" },
  { id:"g12", word:"consequence",  phonetic:"/ˈkɒnsɪkwəns/",     pos:"noun", difficulty:1, topic:"general", definition:"A result or effect of an action or condition", example:"The long-term consequences of deforestation are still being studied.", synonyms:["result","outcome","repercussion"], translation:"последствие" },
  { id:"g13", word:"constraint",   phonetic:"/kənˈstreɪnt/",     pos:"noun", difficulty:2, topic:"general", definition:"A limitation or restriction on what is possible", example:"Budget constraints prevent many schools from hiring qualified specialists.", synonyms:["limitation","restriction","barrier"], translation:"ограничение" },
  { id:"g14", word:"framework",    phonetic:"/ˈfreɪmwɜːk/",      pos:"noun", difficulty:1, topic:"general", definition:"A basic structure underlying a system, concept, or text", example:"A clear regulatory framework is essential for attracting foreign investment.", synonyms:["structure","system","outline"], translation:"система / рамки" },
  { id:"g15", word:"implication",  phonetic:"/ˌɪmplɪˈkeɪʃn/",   pos:"noun", difficulty:2, topic:"general", definition:"A conclusion that can be drawn from something, though it is not explicitly stated", example:"The implications of rising sea levels for coastal populations are enormous.", synonyms:["consequence","meaning","ramification"], translation:"подразумеваемое / следствие" },
  { id:"g16", word:"perspective",  phonetic:"/pəˈspektɪv/",      pos:"noun", difficulty:1, topic:"general", definition:"A particular way of viewing things; a point of view", example:"Understanding global issues requires considering multiple cultural perspectives.", synonyms:["viewpoint","standpoint","outlook"], translation:"точка зрения" },
  { id:"g17", word:"phenomenon",   phonetic:"/fəˈnɒmɪnən/",      pos:"noun", difficulty:1, topic:"general", definition:"A fact or event in the natural or social world, especially one of particular significance", example:"Urban migration is a global phenomenon reshaping cities across continents.", synonyms:["occurrence","event","trend"], translation:"явление" },
  { id:"g18", word:"mechanism",    phonetic:"/ˈmekənɪzəm/",      pos:"noun", difficulty:2, topic:"general", definition:"A system or process by which a particular effect is produced or maintained", example:"Market mechanisms do not always allocate resources efficiently or fairly.", synonyms:["system","process","means"], translation:"механизм" },
  { id:"g19", word:"correlation",  phonetic:"/ˌkɒrəˈleɪʃn/",    pos:"noun", difficulty:2, topic:"general", definition:"A mutual relationship or connection between two or more things", example:"There is a strong correlation between education level and lifetime earnings.", synonyms:["connection","link","relationship"], translation:"корреляция" },
  { id:"g20", word:"discrepancy",  phonetic:"/dɪˈskrepənsi/",    pos:"noun", difficulty:3, topic:"general", definition:"An illogical or surprising lack of compatibility between two things", example:"A discrepancy between reported data and actual outcomes undermines policy credibility.", synonyms:["inconsistency","mismatch","gap"], translation:"несоответствие" },
  // Day 3 — Adjectives I
  { id:"g21", word:"ambiguous",    phonetic:"/æmˈbɪɡjuəs/",      pos:"adj",  difficulty:2, topic:"general", definition:"Open to more than one interpretation; not having one obvious meaning", example:"The ambiguous wording of the legislation has led to conflicting interpretations.", synonyms:["unclear","vague","equivocal"], translation:"неоднозначный" },
  { id:"g22", word:"controversial",phonetic:"/ˌkɒntrəˈvɜːʃl/",  pos:"adj",  difficulty:1, topic:"general", definition:"Giving rise or likely to give rise to public disagreement", example:"Genetic editing remains a controversial topic among scientists and ethicists alike.", synonyms:["contentious","disputed","debatable"], translation:"спорный / противоречивый" },
  { id:"g23", word:"inevitable",   phonetic:"/ɪnˈevɪtəbl/",      pos:"adj",  difficulty:2, topic:"general", definition:"Certain to happen; unavoidable", example:"The shift towards renewable energy now seems inevitable given the scale of climate change.", synonyms:["unavoidable","certain","inescapable"], translation:"неизбежный" },
  { id:"g24", word:"substantial",  phonetic:"/səbˈstænʃl/",      pos:"adj",  difficulty:1, topic:"general", definition:"Of considerable importance, size, or worth", example:"There is substantial evidence that early nutrition affects lifelong health outcomes.", synonyms:["significant","considerable","major"], translation:"значительный" },
  { id:"g25", word:"profound",     phonetic:"/prəˈfaʊnd/",        pos:"adj",  difficulty:2, topic:"general", definition:"Very great or intense; having great insight or depth of understanding", example:"Automation is having a profound impact on the structure of the global workforce.", synonyms:["deep","far-reaching","significant"], translation:"глубокий / существенный" },
  { id:"g26", word:"prevalent",    phonetic:"/ˈprevələnt/",       pos:"adj",  difficulty:2, topic:"general", definition:"Widespread in a particular area or at a particular time", example:"Sedentary lifestyles are increasingly prevalent in countries with high smartphone use.", synonyms:["widespread","common","rampant"], translation:"широко распространённый" },
  { id:"g27", word:"inherent",     phonetic:"/ɪnˈhɪərənt/",      pos:"adj",  difficulty:3, topic:"general", definition:"Existing in something as a permanent, essential, or characteristic attribute", example:"There are inherent risks in any system that relies on a single point of control.", synonyms:["intrinsic","innate","built-in"], translation:"присущий / врождённый" },
  { id:"g28", word:"sufficient",   phonetic:"/səˈfɪʃnt/",         pos:"adj",  difficulty:1, topic:"general", definition:"Enough for the purpose; adequate", example:"Access to sufficient nutrition is still not guaranteed for millions of children worldwide.", synonyms:["enough","adequate","ample"], translation:"достаточный" },
  { id:"g29", word:"adequate",     phonetic:"/ˈædɪkwɪt/",        pos:"adj",  difficulty:1, topic:"general", definition:"Satisfactory or acceptable in quality or quantity", example:"Many urban dwellers lack adequate housing, sanitation, and clean water.", synonyms:["sufficient","satisfactory","suitable"], translation:"достаточный / приемлемый" },
  { id:"g30", word:"negligible",   phonetic:"/ˈneɡlɪdʒɪbl/",     pos:"adj",  difficulty:3, topic:"general", definition:"So small or unimportant as to be not worth considering", example:"The risk of side effects from the vaccine is negligible compared to the benefits.", synonyms:["trivial","insignificant","minimal"], translation:"незначительный / пренебрежимо малый" },
  // Day 4 — Opinion & Argument
  { id:"g31", word:"advocate",     phonetic:"/ˈædvəkeɪt/",       pos:"verb", difficulty:1, topic:"general", definition:"Publicly recommend or support a particular cause or policy", example:"Many health professionals advocate for a complete ban on advertising unhealthy food to children.", synonyms:["support","promote","champion"], translation:"выступать за / отстаивать" },
  { id:"g32", word:"contradict",   phonetic:"/ˌkɒntrəˈdɪkt/",   pos:"verb", difficulty:1, topic:"general", definition:"Deny the truth of a statement made by someone; be in conflict with", example:"New evidence appears to contradict the government's claims about economic growth.", synonyms:["dispute","deny","refute"], translation:"противоречить / опровергать" },
  { id:"g33", word:"assert",       phonetic:"/əˈsɜːt/",           pos:"verb", difficulty:2, topic:"general", definition:"State a fact or belief confidently and forcefully", example:"The report asserts that gender pay gaps persist across all major industries.", synonyms:["claim","state","maintain"], translation:"утверждать" },
  { id:"g34", word:"refute",       phonetic:"/rɪˈfjuːt/",         pos:"verb", difficulty:2, topic:"general", definition:"Prove a statement or theory to be wrong or false; deny", example:"The scientists refuted the popular myth that intelligence is fixed at birth.", synonyms:["disprove","rebut","counter"], translation:"опровергать" },
  { id:"g35", word:"acknowledge",  phonetic:"/əkˈnɒlɪdʒ/",       pos:"verb", difficulty:1, topic:"general", definition:"Accept or admit the truth or existence of something", example:"It is important to acknowledge the limitations of any research methodology.", synonyms:["admit","recognise","concede"], translation:"признавать" },
  { id:"g36", word:"concede",      phonetic:"/kənˈsiːd/",         pos:"verb", difficulty:2, topic:"general", definition:"Admit that something is true or valid after initially denying it", example:"Opponents of the policy concede that it has reduced carbon emissions.", synonyms:["admit","grant","accept"], translation:"признавать (правоту)" },
  { id:"g37", word:"justify",      phonetic:"/ˈdʒʌstɪfaɪ/",      pos:"verb", difficulty:1, topic:"general", definition:"Show or prove to be right or reasonable", example:"Governments must justify the use of public funds with transparent reporting.", synonyms:["defend","explain","rationalise"], translation:"оправдывать / обосновывать" },
  { id:"g38", word:"emphasise",    phonetic:"/ˈemfəsaɪz/",        pos:"verb", difficulty:1, topic:"general", definition:"Give special importance or prominence to something when speaking or writing", example:"The report emphasises the urgent need for coordinated international action.", synonyms:["stress","highlight","underline"], translation:"подчёркивать / делать акцент" },
  { id:"g39", word:"contend",      phonetic:"/kənˈtend/",         pos:"verb", difficulty:2, topic:"general", definition:"Assert something as a position in an argument; assert or maintain", example:"Some economists contend that free trade ultimately benefits all participating nations.", synonyms:["argue","maintain","claim"], translation:"утверждать / отстаивать" },
  { id:"g40", word:"rebut",        phonetic:"/rɪˈbʌt/",           pos:"verb", difficulty:3, topic:"general", definition:"Claim or prove that evidence or an accusation is false", example:"The defence team rebutted every piece of circumstantial evidence presented.", synonyms:["refute","counter","disprove"], translation:"опровергать (аргументы)" },
  // Day 5 — Society & Governance
  { id:"g41", word:"inequality",   phonetic:"/ˌɪnɪˈkwɒlɪti/",    pos:"noun", difficulty:1, topic:"general", definition:"Difference in size, degree, circumstances, etc.; lack of equality", example:"Growing economic inequality poses a serious challenge to social cohesion.", synonyms:["disparity","imbalance","unfairness"], translation:"неравенство" },
  { id:"g42", word:"democracy",    phonetic:"/dɪˈmɒkrəsi/",       pos:"noun", difficulty:1, topic:"general", definition:"A system of government in which all citizens have an equal say in decisions affecting their lives", example:"A vibrant civil society is the cornerstone of any functioning democracy.", synonyms:["self-governance","representative rule","republic"], translation:"демократия" },
  { id:"g43", word:"legislation",  phonetic:"/ˌledʒɪˈsleɪʃn/",   pos:"noun", difficulty:2, topic:"general", definition:"Laws, considered collectively; the process of making laws", example:"Strong anti-discrimination legislation is necessary but not sufficient on its own.", synonyms:["law","act","regulation"], translation:"законодательство" },
  { id:"g44", word:"governance",   phonetic:"/ˈɡʌvənəns/",        pos:"noun", difficulty:2, topic:"general", definition:"The action or manner of governing; the way in which an organisation is managed", example:"Poor governance and corruption remain root causes of underdevelopment.", synonyms:["management","administration","rule"], translation:"управление / управленческая структура" },
  { id:"g45", word:"autonomy",     phonetic:"/ɔːˈtɒnəmi/",        pos:"noun", difficulty:2, topic:"general", definition:"The right or condition of self-government; freedom from external control", example:"Greater regional autonomy is often proposed as a solution to political tensions.", synonyms:["independence","self-rule","freedom"], translation:"автономия / самостоятельность" },
  { id:"g46", word:"mandate",      phonetic:"/ˈmændeɪt/",         pos:"noun", difficulty:2, topic:"general", definition:"An official order or commission to do something; authority to carry out a policy", example:"The new administration claimed a clear mandate to reform the tax system.", synonyms:["authority","directive","commission"], translation:"мандат / полномочие" },
  { id:"g47", word:"transparency", phonetic:"/trænsˈpærənsi/",     pos:"noun", difficulty:1, topic:"general", definition:"The quality of being open and not secretive; easily seen through", example:"Public trust in government depends on transparency and accountability.", synonyms:["openness","clarity","accountability"], translation:"прозрачность" },
  { id:"g48", word:"accountability",phonetic:"/əˌkaʊntəˈbɪlɪti/", pos:"noun", difficulty:2, topic:"general", definition:"The fact or condition of being responsible to others; answerability", example:"International bodies call for greater corporate accountability on environmental issues.", synonyms:["responsibility","answerability","liability"], translation:"подотчётность / ответственность" },
  { id:"g49", word:"regulation",   phonetic:"/ˌreɡjuˈleɪʃn/",    pos:"noun", difficulty:1, topic:"general", definition:"A rule or directive made and maintained by an authority", example:"Stricter environmental regulations have been shown to reduce industrial pollution significantly.", synonyms:["rule","law","guideline"], translation:"регулирование / регламент" },
  { id:"g50", word:"bureaucracy",  phonetic:"/bjʊˈrɒkrəsi/",      pos:"noun", difficulty:2, topic:"general", definition:"A system of government or management in which complex rules and procedures are followed strictly", example:"Excessive bureaucracy slows the delivery of essential public services.", synonyms:["red tape","administration","officialdom"], translation:"бюрократия" },
  // Day 6 — Economy & Work
  { id:"g51", word:"productivity", phonetic:"/ˌprɒdʌkˈtɪvɪti/",  pos:"noun", difficulty:1, topic:"general", definition:"The efficiency with which inputs are converted into goods or services", example:"Flexible working arrangements have been shown to improve employee productivity.", synonyms:["output","efficiency","performance"], translation:"производительность" },
  { id:"g52", word:"unemployment", phonetic:"/ˌʌnɪmˈplɔɪmənt/",  pos:"noun", difficulty:1, topic:"general", definition:"The state of being without a paid job despite being available and willing to work", example:"Structural unemployment caused by automation requires new retraining programmes.", synonyms:["joblessness","redundancy","idleness"], translation:"безработица" },
  { id:"g53", word:"fiscal",       phonetic:"/ˈfɪskl/",           pos:"adj",  difficulty:2, topic:"general", definition:"Relating to government revenue, especially taxes", example:"Fiscal stimulus packages were deployed to prevent economic collapse during the pandemic.", synonyms:["financial","monetary","budgetary"], translation:"бюджетный / финансовый (гос.)" },
  { id:"g54", word:"subsidy",      phonetic:"/ˈsʌbsɪdi/",         pos:"noun", difficulty:2, topic:"general", definition:"A sum of money granted by the state or a public body to help an industry or keep down prices", example:"Agricultural subsidies in wealthy countries distort global food markets.", synonyms:["grant","allowance","support payment"], translation:"субсидия" },
  { id:"g55", word:"inflation",    phonetic:"/ɪnˈfleɪʃn/",        pos:"noun", difficulty:1, topic:"general", definition:"A general increase in prices and fall in the purchasing value of money", example:"Runaway inflation erodes the savings of ordinary citizens and destabilises economies.", synonyms:["price rise","cost increase","devaluation"], translation:"инфляция" },
  { id:"g56", word:"disparity",    phonetic:"/dɪˈspærɪti/",       pos:"noun", difficulty:2, topic:"general", definition:"A great difference; an inequality between two or more things", example:"The disparity in income between urban and rural areas remains a persistent challenge.", synonyms:["gap","difference","inequality"], translation:"несоответствие / разрыв" },
  { id:"g57", word:"monopoly",     phonetic:"/məˈnɒpəli/",        pos:"noun", difficulty:2, topic:"general", definition:"Exclusive possession or control of the supply of a commodity or service", example:"Regulatory bodies exist to prevent any single firm from establishing a monopoly.", synonyms:["dominance","control","oligopoly"], translation:"монополия" },
  { id:"g58", word:"commodify",    phonetic:"/kəˈmɒdɪfaɪ/",      pos:"verb", difficulty:3, topic:"general", definition:"Turn something into a commodity; treat something as an article of commerce", example:"Critics argue that digital platforms commodify personal data and human attention.", synonyms:["commercialise","marketise"], translation:"превращать в товар" },
  { id:"g59", word:"expenditure",  phonetic:"/ɪkˈspendɪtʃə/",    pos:"noun", difficulty:2, topic:"general", definition:"The action of spending funds; an amount spent", example:"Healthcare expenditure per capita varies enormously between developed and developing nations.", synonyms:["spending","outlay","cost"], translation:"расходы / затраты" },
  { id:"g60", word:"revenue",      phonetic:"/ˈrevənjuː/",        pos:"noun", difficulty:1, topic:"general", definition:"Income, especially when of a company or organisation and of a substantial nature", example:"Tourism revenue accounts for a significant share of GDP in many island nations.", synonyms:["income","earnings","proceeds"], translation:"доход / выручка" },
  // Day 7 — Health & Medicine
  { id:"g61", word:"prevalence",   phonetic:"/ˈprevələns/",       pos:"noun", difficulty:2, topic:"general", definition:"The fact or condition of being widespread; the proportion having a condition at a specific time", example:"The prevalence of obesity has tripled in many countries over the past four decades.", synonyms:["frequency","commonness","incidence"], translation:"распространённость" },
  { id:"g62", word:"chronic",      phonetic:"/ˈkrɒnɪk/",          pos:"adj",  difficulty:1, topic:"general", definition:"Persisting for a long time or constantly recurring, especially of a disease", example:"Chronic stress is linked to a significantly elevated risk of cardiovascular disease.", synonyms:["persistent","long-term","ongoing"], translation:"хронический" },
  { id:"g63", word:"epidemic",     phonetic:"/ˌepɪˈdemɪk/",       pos:"noun", difficulty:1, topic:"general", definition:"A widespread occurrence of an infectious disease in a community at a particular time", example:"A mental health epidemic is quietly unfolding among young people globally.", synonyms:["outbreak","pandemic","surge"], translation:"эпидемия" },
  { id:"g64", word:"intervention", phonetic:"/ˌɪntəˈvenʃn/",      pos:"noun", difficulty:2, topic:"general", definition:"Action taken to improve a situation, especially in medicine, politics, or international affairs", example:"Early educational intervention can dramatically improve outcomes for at-risk children.", synonyms:["action","measure","treatment"], translation:"вмешательство / мера" },
  { id:"g65", word:"sedentary",    phonetic:"/ˈsedntri/",          pos:"adj",  difficulty:2, topic:"general", definition:"Tending to spend much time seated; characterised by much sitting and little physical activity", example:"Sedentary office work increases the risk of obesity, diabetes, and heart disease.", synonyms:["inactive","immobile","desk-bound"], translation:"сидячий / малоподвижный" },
  { id:"g66", word:"mortality",    phonetic:"/mɔːˈtælɪti/",       pos:"noun", difficulty:2, topic:"general", definition:"The state of being subject to death; the number of deaths in a particular area", example:"Infant mortality rates are a key indicator of a country's healthcare quality.", synonyms:["death rate","fatality","deathly toll"], translation:"смертность" },
  { id:"g67", word:"vaccination",  phonetic:"/ˌvæksɪˈneɪʃn/",    pos:"noun", difficulty:1, topic:"general", definition:"Treatment with a vaccine to produce immunity against a disease", example:"Mass vaccination campaigns have eradicated smallpox and nearly eliminated polio.", synonyms:["immunisation","inoculation","jab"], translation:"вакцинация" },
  { id:"g68", word:"nutrition",    phonetic:"/njuːˈtrɪʃn/",        pos:"noun", difficulty:1, topic:"general", definition:"The process of providing or obtaining the food necessary for health and growth", example:"Poor nutrition in early childhood has lasting consequences for cognitive development.", synonyms:["diet","nourishment","sustenance"], translation:"питание / нутриция" },
  { id:"g69", word:"obesity",      phonetic:"/əˈbiːsɪti/",         pos:"noun", difficulty:1, topic:"general", definition:"The state of being very overweight; excessively high body fat", example:"Obesity is now classified as a global epidemic by the World Health Organisation.", synonyms:["overweight","excessive weight","corpulence"], translation:"ожирение" },
  { id:"g70", word:"mental health",phonetic:"/ˈmentl helθ/",       pos:"noun", difficulty:1, topic:"general", definition:"A person's condition with regard to their psychological and emotional wellbeing", example:"Investment in mental health services remains woefully inadequate in most countries.", synonyms:["psychological wellbeing","emotional health","wellbeing"], translation:"психическое здоровье" },
  // Day 8 — Environment & Sustainability
  { id:"g71", word:"emission",     phonetic:"/ɪˈmɪʃn/",           pos:"noun", difficulty:1, topic:"general", definition:"The production and discharge of something, especially gas or radiation", example:"Countries must commit to steep reductions in greenhouse gas emissions.", synonyms:["discharge","release","output"], translation:"выброс / эмиссия" },
  { id:"g72", word:"ecosystem",    phonetic:"/ˈiːkəʊsɪstəm/",     pos:"noun", difficulty:1, topic:"general", definition:"A biological community of interacting organisms and their physical environment", example:"The destruction of wetland ecosystems removes vital natural flood defences.", synonyms:["biome","habitat","natural system"], translation:"экосистема" },
  { id:"g73", word:"fossil fuel",  phonetic:"/ˈfɒsl fjuːəl/",     pos:"noun", difficulty:1, topic:"general", definition:"A natural fuel such as coal or gas formed from the remains of living organisms", example:"A rapid phase-out of fossil fuels is essential to limiting global temperature rise.", synonyms:["coal","oil","hydrocarbons"], translation:"ископаемое топливо" },
  { id:"g74", word:"depletion",    phonetic:"/dɪˈpliːʃn/",         pos:"noun", difficulty:2, topic:"general", definition:"Reduction in the number or quantity of something; the use of a resource until it is gone", example:"The depletion of fish stocks threatens the livelihoods of coastal communities worldwide.", synonyms:["exhaustion","reduction","draining"], translation:"истощение / исчерпание" },
  { id:"g75", word:"biodegradable",phonetic:"/ˌbaɪəʊdɪˈɡreɪdəbl/",pos:"adj",  difficulty:2, topic:"general", definition:"Capable of being decomposed by bacteria or other living organisms", example:"Replacing plastic with biodegradable materials is a growing priority for manufacturers.", synonyms:["decomposable","organic","eco-friendly"], translation:"биоразлагаемый" },
  { id:"g76", word:"reforestation",phonetic:"/ˌriːˌfɒrɪˈsteɪʃn/", pos:"noun", difficulty:2, topic:"general", definition:"The action of replanting areas that have been cleared of trees", example:"Large-scale reforestation programmes can help offset carbon emissions and restore biodiversity.", synonyms:["tree planting","afforestation","replanting"], translation:"лесовосстановление" },
  { id:"g77", word:"resilience",   phonetic:"/rɪˈzɪliəns/",        pos:"noun", difficulty:2, topic:"general", definition:"The capacity to recover quickly from difficulties; toughness; elasticity", example:"Climate resilience requires infrastructure designed to withstand extreme weather events.", synonyms:["toughness","adaptability","robustness"], translation:"устойчивость / жизнестойкость" },
  { id:"g78", word:"arid",         phonetic:"/ˈærɪd/",              pos:"adj",  difficulty:2, topic:"general", definition:"Very dry; having little or no rain; dull and uninteresting", example:"Arid regions are expanding as climate change alters global precipitation patterns.", synonyms:["dry","parched","desert-like"], translation:"засушливый / аридный" },
  { id:"g79", word:"scarcity",     phonetic:"/ˈskeəsɪti/",          pos:"noun", difficulty:2, topic:"general", definition:"The state of being scarce or in short supply; shortage", example:"Water scarcity is expected to affect billions of people by the middle of this century.", synonyms:["shortage","deficiency","lack"], translation:"нехватка / дефицит" },
  { id:"g80", word:"sequester",    phonetic:"/sɪˈkwestə/",          pos:"verb", difficulty:3, topic:"general", definition:"Isolate; in environmental science, to capture and store carbon dioxide", example:"Forests naturally sequester carbon, making their preservation critical for climate goals.", synonyms:["absorb","capture","isolate"], translation:"секвестрировать / поглощать (CO₂)" },
  // Day 9 — Research & Data
  { id:"g81", word:"empirical",    phonetic:"/ɪmˈpɪrɪkl/",        pos:"adj",  difficulty:3, topic:"general", definition:"Based on, concerned with, or verifiable by observation or experience rather than theory", example:"Sound policy must be grounded in empirical evidence rather than ideology.", synonyms:["observed","evidence-based","measurable"], translation:"эмпирический" },
  { id:"g82", word:"quantitative", phonetic:"/ˈkwɒntɪtətɪv/",      pos:"adj",  difficulty:2, topic:"general", definition:"Relating to or measured by quantity; concerned with numbers", example:"Quantitative analysis of the data reveals a consistent upward trend across all regions.", synonyms:["numerical","measurable","statistical"], translation:"количественный" },
  { id:"g83", word:"qualitative",  phonetic:"/ˈkwɒlɪtətɪv/",       pos:"adj",  difficulty:2, topic:"general", definition:"Relating to or measured by quality; concerned with descriptions rather than numbers", example:"Qualitative interviews provided rich insights that surveys alone could not capture.", synonyms:["descriptive","non-numerical","interpretive"], translation:"качественный (метод)" },
  { id:"g84", word:"variable",     phonetic:"/ˈveəriəbl/",          pos:"noun", difficulty:1, topic:"general", definition:"An element, feature, or factor that is liable to vary or change; in research, a measurable factor", example:"Researchers controlled for multiple variables to isolate the effect of diet on health.", synonyms:["factor","element","component"], translation:"переменная / фактор" },
  { id:"g85", word:"hypothesis",   phonetic:"/haɪˈpɒθəsɪs/",       pos:"noun", difficulty:2, topic:"general", definition:"A supposition made as a starting point for further investigation", example:"The researchers tested the hypothesis that sleep deprivation impairs decision-making.", synonyms:["theory","assumption","proposition"], translation:"гипотеза" },
  { id:"g86", word:"methodology",  phonetic:"/ˌmeθəˈdɒlədʒi/",     pos:"noun", difficulty:2, topic:"general", definition:"A system of methods used in a particular area of study or activity", example:"A transparent methodology allows other scientists to evaluate and replicate the study.", synonyms:["approach","methods","procedure"], translation:"методология" },
  { id:"g87", word:"statistic",    phonetic:"/stəˈtɪstɪk/",        pos:"noun", difficulty:1, topic:"general", definition:"A fact or piece of data from a study of a large quantity of numerical data", example:"Statistics on income inequality often mask deeper structural inequities in society.", synonyms:["figure","data point","number"], translation:"статистика / статистический показатель" },
  { id:"g88", word:"inference",    phonetic:"/ˈɪnfərəns/",          pos:"noun", difficulty:3, topic:"general", definition:"A conclusion reached on the basis of evidence and reasoning", example:"The inference drawn from the evidence is that diet alone cannot explain the results.", synonyms:["deduction","conclusion","reasoning"], translation:"вывод / умозаключение" },
  { id:"g89", word:"longitudinal", phonetic:"/ˌlɒŋɡɪˈtjuːdɪnl/",   pos:"adj",  difficulty:3, topic:"general", definition:"Relating to the development of something over a period of time; running lengthwise", example:"A longitudinal study tracked participants for twenty years to assess health outcomes.", synonyms:["long-term","extended","time-based"], translation:"продольный / долгосрочный (исследование)" },
  { id:"g90", word:"bias",         phonetic:"/ˈbaɪəs/",              pos:"noun", difficulty:1, topic:"general", definition:"Inclination or prejudice for or against one person or group; a systematic error in research", example:"Confirmation bias causes people to favour information that confirms their existing beliefs.", synonyms:["prejudice","partiality","skew"], translation:"предвзятость / смещение (в данных)" },
  // Day 10 — Culture & Global Issues
  { id:"g91", word:"globalisation",phonetic:"/ˌɡləʊbəlaɪˈzeɪʃn/", pos:"noun", difficulty:1, topic:"general", definition:"The process by which businesses or other organisations develop international influence", example:"Globalisation has lifted hundreds of millions out of poverty while widening inequality.", synonyms:["internationalisation","integration","interdependence"], translation:"глобализация" },
  { id:"g92", word:"migration",    phonetic:"/maɪˈɡreɪʃn/",        pos:"noun", difficulty:1, topic:"general", definition:"Movement of people to a new area or country in order to find work or better living conditions", example:"Climate-driven migration is expected to create unprecedented displacement by 2050.", synonyms:["movement","displacement","immigration"], translation:"миграция" },
  { id:"g93", word:"diversity",    phonetic:"/daɪˈvɜːsɪti/",        pos:"noun", difficulty:1, topic:"general", definition:"The state of being diverse; a range of different things; variety in a community", example:"Cultural diversity is a strength that enriches societies and fosters creativity.", synonyms:["variety","heterogeneity","multiculturalism"], translation:"разнообразие" },
  { id:"g94", word:"integration",  phonetic:"/ˌɪntɪˈɡreɪʃn/",      pos:"noun", difficulty:1, topic:"general", definition:"The action or process of combining or being combined into a whole; inclusion of all groups", example:"Social integration of migrants requires sustained investment in language education.", synonyms:["inclusion","assimilation","incorporation"], translation:"интеграция" },
  { id:"g95", word:"diaspora",     phonetic:"/daɪˈæspərə/",         pos:"noun", difficulty:3, topic:"general", definition:"The dispersion of any people from their original homeland; the people so dispersed", example:"The Indian diaspora is one of the largest and most economically significant in the world.", synonyms:["community abroad","expat community","dispersion"], translation:"диаспора" },
  { id:"g96", word:"assimilation", phonetic:"/əˌsɪmɪˈleɪʃn/",      pos:"noun", difficulty:2, topic:"general", definition:"The process of absorbing and integrating people, ideas, or culture into a wider society or group", example:"Rapid assimilation is sometimes demanded of immigrants, at the cost of cultural identity.", synonyms:["absorption","integration","adaptation"], translation:"ассимиляция" },
  { id:"g97", word:"xenophobia",   phonetic:"/ˌzenəˈfəʊbiə/",       pos:"noun", difficulty:3, topic:"general", definition:"Dislike of or prejudice against people from other countries", example:"Economic crises have historically fuelled xenophobia and hostility towards immigrants.", synonyms:["prejudice","racism","nativism"], translation:"ксенофобия" },
  { id:"g98", word:"imperialism",  phonetic:"/ɪmˈpɪəriəlɪzəm/",    pos:"noun", difficulty:3, topic:"general", definition:"A policy of extending a country's power and influence through colonisation, military force, or other means", example:"The legacy of imperialism continues to shape global economic and political relationships.", synonyms:["colonialism","hegemony","expansionism"], translation:"империализм" },
  { id:"g99", word:"sovereignty",  phonetic:"/ˈsɒvrɪnti/",          pos:"noun", difficulty:3, topic:"general", definition:"Supreme power or authority; the authority of a state to govern itself", example:"Questions of national sovereignty complicate international climate agreements.", synonyms:["independence","autonomy","self-rule"], translation:"суверенитет" },
  { id:"g100",word:"assimilation", phonetic:"/əˌsɪmɪˈleɪʃn/",      pos:"noun", difficulty:2, topic:"general", definition:"The process by which a minority group is absorbed into a dominant culture", example:"Forced assimilation policies stripped indigenous communities of their languages.", synonyms:["absorption","integration","cultural merger"], translation:"ассимиляция (культурная)" },
  // Day 11 — Urban & Infrastructure
  { id:"g101",word:"urbanisation", phonetic:"/ˌɜːbənaɪˈzeɪʃn/",    pos:"noun", difficulty:1, topic:"general", definition:"The process by which towns and cities are formed and grow larger as more people begin living there", example:"Rapid urbanisation in Africa and Asia is creating enormous demand for affordable housing.", synonyms:["city growth","metropolitan expansion","suburban sprawl"], translation:"урбанизация" },
  { id:"g102",word:"congestion",   phonetic:"/kənˈdʒestʃən/",       pos:"noun", difficulty:2, topic:"general", definition:"The state of being overcrowded; excessive accumulation especially of traffic", example:"Traffic congestion costs urban economies billions in lost productivity each year.", synonyms:["overcrowding","gridlock","traffic jam"], translation:"перегруженность / пробки" },
  { id:"g103",word:"sanitation",   phonetic:"/ˌsænɪˈteɪʃn/",        pos:"noun", difficulty:2, topic:"general", definition:"Conditions relating to public health, especially the provision of clean drinking water and sewage disposal", example:"Improved sanitation has been one of the most important public health advances in history.", synonyms:["hygiene","waste management","drainage"], translation:"санитария" },
  { id:"g104",word:"gentrification",phonetic:"/ˌdʒentrɪfɪˈkeɪʃn/", pos:"noun", difficulty:3, topic:"general", definition:"The process whereby the character of a poor urban area is changed by wealthier people moving in", example:"Gentrification displaces long-term residents and erases the cultural identity of neighbourhoods.", synonyms:["urban renewal","neighbourhood change","displacement"], translation:"джентрификация" },
  { id:"g105",word:"demographic",  phonetic:"/ˌdeməˈɡræfɪk/",       pos:"adj",  difficulty:2, topic:"general", definition:"Relating to the structure of populations, especially in terms of age, gender, and income", example:"Demographic shifts are forcing governments to rethink retirement and pension policies.", synonyms:["population-based","statistical","sociographic"], translation:"демографический" },
  { id:"g106",word:"sprawl",       phonetic:"/sprɔːl/",               pos:"noun", difficulty:2, topic:"general", definition:"Spread over a large area in an untidy or irregular way; especially of a city", example:"Urban sprawl consumes agricultural land and increases dependence on private vehicles.", synonyms:["expansion","spread","growth"], translation:"расползание города / застройка" },
  { id:"g107",word:"sustainable city",phonetic:"/səˌsteɪnəbl ˈsɪti/",pos:"noun", difficulty:1, topic:"general", definition:"A city designed with consideration for social, economic, and environmental impact", example:"The concept of a sustainable city integrates green spaces, public transport, and renewable energy.", synonyms:["eco-city","green city","smart city"], translation:"устойчивый город" },
  { id:"g108",word:"municipal",    phonetic:"/mjuːˈnɪsɪpl/",         pos:"adj",  difficulty:2, topic:"general", definition:"Relating to a town or district and its local government", example:"Municipal governments often lack sufficient funding to maintain essential infrastructure.", synonyms:["civic","local","city-level"], translation:"муниципальный" },
  { id:"g109",word:"density",      phonetic:"/ˈdensɪti/",             pos:"noun", difficulty:1, topic:"general", definition:"The degree of compactness of a substance; the quantity of people or things in a given area", example:"High population density in megacities strains housing, transport, and public services.", synonyms:["concentration","compactness","crowdedness"], translation:"плотность (населения)" },
  { id:"g110",word:"infrastructure gap",phonetic:"/ˈɪnfrəˌstrʌktʃə ɡæp/",pos:"noun",difficulty:2,topic:"general",definition:"The difference between existing infrastructure and what is needed to support development",example:"The infrastructure gap in developing nations requires trillions of dollars in investment.",synonyms:["development deficit","investment shortfall"],translation:"инфраструктурный разрыв" },
  // Day 12 — Education & Learning
  { id:"g111",word:"attainment",   phonetic:"/əˈteɪnmənt/",          pos:"noun", difficulty:2, topic:"general", definition:"The action or fact of achieving a goal; an educational level or qualification reached", example:"The attainment gap between disadvantaged and affluent pupils starts before formal schooling.", synonyms:["achievement","accomplishment","performance"], translation:"успеваемость / достижение" },
  { id:"g112",word:"cognitive",    phonetic:"/ˈkɒɡnɪtɪv/",           pos:"adj",  difficulty:2, topic:"general", definition:"Relating to cognition; relating to mental processes of perception, memory, and reasoning", example:"Bilingual education confers measurable cognitive advantages in problem-solving and creativity.", synonyms:["mental","intellectual","psychological"], translation:"когнитивный" },
  { id:"g113",word:"critical thinking",phonetic:"/ˈkrɪtɪkl ˈθɪŋkɪŋ/",pos:"noun",difficulty:1,topic:"general",definition:"The objective analysis and evaluation of an issue in order to form a judgement",example:"Critical thinking skills are increasingly valued by employers in the knowledge economy.",synonyms:["analytical thinking","reasoning","logic"],translation:"критическое мышление" },
  { id:"g114",word:"vocational",   phonetic:"/vəˈkeɪʃənl/",          pos:"adj",  difficulty:2, topic:"general", definition:"Relating to an occupation or employment; relating to specific skills", example:"Vocational training provides practical pathways for students who are not suited to academia.", synonyms:["occupational","professional","technical"], translation:"профессиональный / прикладной" },
  { id:"g115",word:"enrollment",   phonetic:"/ɪnˈrəʊlmənt/",         pos:"noun", difficulty:1, topic:"general", definition:"The action of enrolling or being enrolled; the number enrolled", example:"University enrollment has risen sharply among women in the past thirty years.", synonyms:["registration","admission","intake"], translation:"зачисление / численность студентов" },
  { id:"g116",word:"dropout",      phonetic:"/ˈdrɒpaʊt/",             pos:"noun", difficulty:1, topic:"general", definition:"A person who leaves school, college, or training before completing a course", example:"High dropout rates in secondary school are strongly correlated with poverty.", synonyms:["school leaver","early leaver","non-completer"], translation:"отсев (из учёбы) / бросивший школу" },
  { id:"g117",word:"standardised test",phonetic:"/ˈstændədaɪzd test/",pos:"noun",difficulty:1,topic:"general",definition:"An examination designed to be administered and scored in a consistent manner",example:"Critics argue that standardised tests fail to capture the full range of student abilities.",synonyms:["aptitude test","norm-referenced test","uniform exam"],translation:"стандартизированный тест" },
  { id:"g118",word:"critical pedagogy",phonetic:"/ˈkrɪtɪkl ˈpedəɡɒdʒi/",pos:"noun",difficulty:3,topic:"general",definition:"An educational approach that encourages students to question and challenge inequalities",example:"Critical pedagogy empowers students to recognise and resist systemic oppression.",synonyms:["transformative teaching","emancipatory education"],translation:"критическая педагогика" },
  { id:"g119",word:"rote learning", phonetic:"/rəʊt ˈlɜːnɪŋ/",       pos:"noun", difficulty:1, topic:"general", definition:"Learning by memorisation and repetition rather than understanding", example:"Rote learning may improve test scores but does little to develop deep understanding.", synonyms:["memorisation","repetition","cramming"], translation:"зубрёжка / механическое заучивание" },
  { id:"g120",word:"self-regulated learning",phonetic:"/self ˈreɡjʊleɪtɪd ˈlɜːnɪŋ/",pos:"noun",difficulty:3,topic:"general",definition:"A process in which learners actively control their own learning strategies",example:"Self-regulated learning skills are essential for success in higher education.",synonyms:["autonomous learning","independent study"],translation:"саморегулируемое обучение" },
  // Day 13 — Abstract & Academic
  { id:"g121",word:"paradigm shift",phonetic:"/ˈpærədaɪm ʃɪft/",    pos:"noun", difficulty:3, topic:"general", definition:"A fundamental change in approach or underlying assumptions in a field or society", example:"The move from fossil fuels to renewables represents a paradigm shift in energy production.", synonyms:["revolution","sea change","transformation"], translation:"смена парадигмы" },
  { id:"g122",word:"dichotomy",    phonetic:"/daɪˈkɒtəmi/",           pos:"noun", difficulty:3, topic:"general", definition:"A division or contrast between two things that are represented as being entirely different", example:"The dichotomy between economic growth and environmental protection is a false one.", synonyms:["division","split","contrast"], translation:"дихотомия / противопоставление" },
  { id:"g123",word:"nuance",       phonetic:"/ˈnjuːɑːns/",            pos:"noun", difficulty:2, topic:"general", definition:"A subtle difference in or shade of meaning, expression, or sound", example:"Effective communication requires sensitivity to the nuances of language and culture.", synonyms:["subtlety","shade of meaning","distinction"], translation:"нюанс / оттенок" },
  { id:"g124",word:"contradiction",phonetic:"/ˌkɒntrəˈdɪkʃn/",       pos:"noun", difficulty:1, topic:"general", definition:"A combination of statements that are opposed to one another; inconsistency", example:"There is a fundamental contradiction between unlimited growth and finite natural resources.", synonyms:["inconsistency","paradox","conflict"], translation:"противоречие" },
  { id:"g125",word:"ambivalence",  phonetic:"/æmˈbɪvələns/",          pos:"noun", difficulty:3, topic:"general", definition:"The state of having mixed feelings or contradictory ideas about something or someone", example:"Public ambivalence about nuclear power reflects both its potential and its risks.", synonyms:["uncertainty","indecision","mixed feelings"], translation:"амбивалентность / двойственность" },
  { id:"g126",word:"abstraction",  phonetic:"/æbˈstrækʃn/",           pos:"noun", difficulty:2, topic:"general", definition:"The quality of dealing with ideas rather than events; a concept removed from specifics", example:"Policy discussions sometimes suffer from too much abstraction and insufficient practical detail.", synonyms:["generalisation","concept","idea"], translation:"абстракция" },
  { id:"g127",word:"paradox",      phonetic:"/ˈpærədɒks/",            pos:"noun", difficulty:2, topic:"general", definition:"A seemingly absurd or self-contradictory statement or proposition that may be true", example:"The paradox of choice shows that more options can lead to less satisfaction.", synonyms:["contradiction","irony","inconsistency"], translation:"парадокс" },
  { id:"g128",word:"ideology",     phonetic:"/ˌaɪdiˈɒlədʒi/",        pos:"noun", difficulty:2, topic:"general", definition:"A system of ideas and ideals, especially one that forms the basis of economic or political theory", example:"Political debates are often driven by ideology rather than evidence.", synonyms:["belief system","doctrine","worldview"], translation:"идеология" },
  { id:"g129",word:"discourse",    phonetic:"/ˈdɪskɔːs/",             pos:"noun", difficulty:3, topic:"general", definition:"Written or spoken communication or debate; a formal discussion of a topic", example:"The public discourse around immigration is often shaped more by fear than facts.", synonyms:["debate","discussion","dialogue"], translation:"дискурс / речь" },
  { id:"g130",word:"consensus",    phonetic:"/kənˈsensəs/",           pos:"noun", difficulty:2, topic:"general", definition:"General agreement; a collectively held opinion", example:"There is a strong scientific consensus that human activity is the primary driver of climate change.", synonyms:["agreement","accord","unanimity"], translation:"консенсус / общее мнение" },
  // Day 14 — Critical Analysis
  { id:"g131",word:"scrutinise",   phonetic:"/ˈskruːtɪnaɪz/",        pos:"verb", difficulty:3, topic:"general", definition:"Examine or inspect closely and thoroughly", example:"Journalists must scrutinise the claims of politicians rather than simply reporting them.", synonyms:["examine","analyse","inspect"], translation:"тщательно изучать" },
  { id:"g132",word:"evaluate",     phonetic:"/ɪˈvæljueɪt/",          pos:"verb", difficulty:1, topic:"general", definition:"Form an idea of the amount, number, or value of; assess", example:"Students are expected to evaluate sources critically rather than accept them uncritically.", synonyms:["assess","judge","appraise"], translation:"оценивать / анализировать" },
  { id:"g133",word:"distinguish",  phonetic:"/dɪˈstɪŋɡwɪʃ/",         pos:"verb", difficulty:1, topic:"general", definition:"Recognise or treat as different; identify a distinctive feature", example:"It is important to distinguish between correlation and causation in research.", synonyms:["differentiate","tell apart","discriminate"], translation:"различать / разграничивать" },
  { id:"g134",word:"synthesise",   phonetic:"/ˈsɪnθəsaɪz/",          pos:"verb", difficulty:2, topic:"general", definition:"Combine a number of things into a coherent whole; make by synthesis", example:"A good essay synthesises evidence from multiple sources rather than quoting a single one.", synonyms:["combine","integrate","merge"], translation:"синтезировать / обобщать" },
  { id:"g135",word:"extrapolate",  phonetic:"/ɪkˈstræpəleɪt/",       pos:"verb", difficulty:3, topic:"general", definition:"Extend the application of a method or conclusion to an unknown situation", example:"It would be unwise to extrapolate these results to the general population.", synonyms:["infer","project","extend"], translation:"экстраполировать" },
  { id:"g136",word:"interpret",    phonetic:"/ɪnˈtɜːprɪt/",           pos:"verb", difficulty:1, topic:"general", definition:"Explain the meaning of; translate orally; understand in a particular way", example:"Data can be interpreted differently depending on the theoretical framework applied.", synonyms:["explain","construe","analyse"], translation:"интерпретировать / истолковывать" },
  { id:"g137",word:"categorise",   phonetic:"/ˈkætɪɡəraɪz/",          pos:"verb", difficulty:1, topic:"general", definition:"Place in a particular class or group; classify", example:"Researchers categorise responses into themes to identify patterns across the data.", synonyms:["classify","group","organise"], translation:"категоризировать / классифицировать" },
  { id:"g138",word:"juxtapose",    phonetic:"/ˈdʒʌkstəpəʊz/",         pos:"verb", difficulty:3, topic:"general", definition:"Place or deal with close together for contrasting effect", example:"The report juxtaposes the living conditions of the wealthy and the poor in vivid detail.", synonyms:["contrast","compare","place side by side"], translation:"сопоставлять / ставить рядом" },
  { id:"g139",word:"contextualise",phonetic:"/kənˈtekstʃuəlaɪz/",     pos:"verb", difficulty:3, topic:"general", definition:"Place something in its proper context; help to understand by providing background", example:"To understand the data properly, we must contextualise it within the historical period.", synonyms:["frame","situate","explain the context of"], translation:"контекстуализировать" },
  { id:"g140",word:"characterise", phonetic:"/ˈkærɪktəraɪz/",          pos:"verb", difficulty:1, topic:"general", definition:"Describe the distinctive nature or features of; be a characteristic of", example:"This period is characterised by rapid technological change and economic uncertainty.", synonyms:["describe","define","typify"], translation:"характеризовать" },
  // Day 15 — Technology & Society
  { id:"g141",word:"disruptive",   phonetic:"/dɪsˈrʌptɪv/",           pos:"adj",  difficulty:2, topic:"general", definition:"Causing or tending to cause disruption; radically changing an industry or behaviour", example:"Disruptive technologies often destroy existing markets while creating entirely new ones.", synonyms:["revolutionary","destabilising","game-changing"], translation:"разрушительный / подрывной (о технологиях)" },
  { id:"g142",word:"algorithm",    phonetic:"/ˈælɡərɪðəm/",           pos:"noun", difficulty:2, topic:"general", definition:"A step-by-step procedure for calculations or problem solving, especially in computing", example:"Recommendation algorithms shape what billions of people read, watch, and buy.", synonyms:["formula","procedure","process"], translation:"алгоритм" },
  { id:"g143",word:"data privacy", phonetic:"/ˈdeɪtə ˈprɪvəsi/",      pos:"noun", difficulty:1, topic:"general", definition:"The right of individuals to control how their personal data is collected and used", example:"Data privacy laws such as GDPR aim to give citizens greater control over their information.", synonyms:["information privacy","digital rights","data protection"], translation:"конфиденциальность данных" },
  { id:"g144",word:"misinformation",phonetic:"/ˌmɪsɪnfəˈmeɪʃn/",      pos:"noun", difficulty:1, topic:"general", definition:"False or inaccurate information, especially that which is deliberately intended to deceive", example:"The rapid spread of misinformation online poses a serious threat to public health.", synonyms:["false information","disinformation","fake news"], translation:"дезинформация / ложная информация" },
  { id:"g145",word:"echo chamber", phonetic:"/ˈekəʊ ˌtʃeɪmbə/",       pos:"noun", difficulty:2, topic:"general", definition:"An environment where a person encounters only opinions that coincide with their own", example:"Social media echo chambers reinforce polarisation by filtering out opposing viewpoints.", synonyms:["filter bubble","information silo","closed loop"], translation:"эхо-камера / информационный пузырь" },
  { id:"g146",word:"automation",   phonetic:"/ˌɔːtəˈmeɪʃn/",          pos:"noun", difficulty:1, topic:"general", definition:"The use or introduction of automatic equipment in a manufacturing or other process", example:"The automation of routine cognitive tasks will transform professional labour markets.", synonyms:["mechanisation","robotics","computerisation"], translation:"автоматизация" },
  { id:"g147",word:"digital divide",phonetic:"/ˈdɪdʒɪtl dɪˈvaɪd/",    pos:"noun", difficulty:2, topic:"general", definition:"The gap between those who have access to modern information technology and those who do not", example:"The digital divide perpetuates existing inequalities in education and economic opportunity.", synonyms:["tech gap","connectivity gap","access inequality"], translation:"цифровое неравенство" },
  { id:"g148",word:"surveillance capitalism",phonetic:"/səˈveɪləns ˈkæpɪtəlɪzəm/",pos:"noun",difficulty:3,topic:"general",definition:"An economic logic in which personal data is commodified and sold for profit",example:"Surveillance capitalism has made the personal data of billions of users a source of corporate profit.",synonyms:["data monetisation","behavioural tracking"],translation:"надзорный капитализм" },
  { id:"g149",word:"platform economy",phonetic:"/ˈplætfɔːm ɪˈkɒnəmi/",pos:"noun",difficulty:2,topic:"general",definition:"An economic system based on digital platforms that facilitate interactions between users",example:"The platform economy has blurred the boundary between employment and self-employment.",synonyms:["gig economy","sharing economy","digital marketplace"],translation:"платформенная экономика" },
  { id:"g150",word:"net neutrality",phonetic:"/net njuːˈtræləti/",      pos:"noun", difficulty:3, topic:"general", definition:"The principle that internet service providers should treat all internet traffic equally", example:"Net neutrality ensures that all online content is equally accessible regardless of source.", synonyms:["open internet","equal access","bandwidth equality"], translation:"сетевой нейтралитет" },
  // Day 16 — Language & Communication
  { id:"g151",word:"rhetoric",     phonetic:"/ˈretərɪk/",              pos:"noun", difficulty:2, topic:"general", definition:"Language designed to have a persuasive or impressive effect; the art of effective speaking or writing", example:"Political rhetoric frequently distorts complex issues into emotionally charged slogans.", synonyms:["oratory","persuasive language","eloquence"], translation:"риторика" },
  { id:"g152",word:"eloquent",     phonetic:"/ˈeləkwənt/",             pos:"adj",  difficulty:2, topic:"general", definition:"Fluent or persuasive in speaking or writing; expressing feelings well", example:"Her eloquent speech galvanised support for the climate action bill.", synonyms:["articulate","fluent","persuasive"], translation:"красноречивый" },
  { id:"g153",word:"coherent",     phonetic:"/kəʊˈhɪərənt/",           pos:"adj",  difficulty:2, topic:"general", definition:"Logical and consistent; easy to understand", example:"A coherent argument is one that develops logically from a clear central thesis.", synonyms:["logical","clear","consistent"], translation:"связный / логичный" },
  { id:"g154",word:"concise",      phonetic:"/kənˈsaɪs/",              pos:"adj",  difficulty:1, topic:"general", definition:"Giving a lot of information clearly and in few words; brief but comprehensive", example:"Good academic writing is concise: every word must earn its place.", synonyms:["brief","succinct","to the point"], translation:"краткий / лаконичный" },
  { id:"g155",word:"syntax",       phonetic:"/ˈsɪntæks/",              pos:"noun", difficulty:2, topic:"general", definition:"The arrangement of words and phrases to create well-formed sentences", example:"Mastering complex syntax allows writers to express sophisticated ideas precisely.", synonyms:["grammar","sentence structure","language rules"], translation:"синтаксис" },
  { id:"g156",word:"lexical",      phonetic:"/ˈleksɪkl/",              pos:"adj",  difficulty:3, topic:"general", definition:"Relating to the vocabulary of a language", example:"Lexical resource is a key criterion in IELTS Writing band descriptors.", synonyms:["vocabulary-related","linguistic","word-based"], translation:"лексический" },
  { id:"g157",word:"paraphrase",   phonetic:"/ˈpærəfreɪz/",            pos:"verb", difficulty:1, topic:"general", definition:"Express the meaning of something in different words, especially to achieve greater clarity", example:"In the IELTS Reading test, questions often paraphrase information from the passage.", synonyms:["reword","rephrase","restate"], translation:"перефразировать" },
  { id:"g158",word:"infer",        phonetic:"/ɪnˈfɜː/",                pos:"verb", difficulty:1, topic:"general", definition:"Deduce or conclude information from evidence and reasoning rather than explicit statement", example:"Readers must infer the writer's attitude from the tone and word choice of the passage.", synonyms:["deduce","conclude","gather"], translation:"делать вывод / подразумевать" },
  { id:"g159",word:"articulate",   phonetic:"/ɑːˈtɪkjʊleɪt/",         pos:"adj",  difficulty:2, topic:"general", definition:"Having or showing the ability to speak fluently and coherently", example:"An articulate speaker adapts their language to the needs of the audience.", synonyms:["eloquent","clear","fluent"], translation:"красноречивый / чётко формулирующий" },
  { id:"g160",word:"connotation",  phonetic:"/ˌkɒnəˈteɪʃn/",          pos:"noun", difficulty:3, topic:"general", definition:"An idea or feeling that a word invokes in addition to its primary meaning", example:"The word 'home' carries positive connotations of safety and belonging.", synonyms:["implication","undertone","suggestion"], translation:"коннотация / подтекст" },
  // Day 17 — Globalisation & Trade
  { id:"g161",word:"liberalisation",phonetic:"/ˌlɪbərəlaɪˈzeɪʃn/",    pos:"noun", difficulty:3, topic:"general", definition:"The removal or relaxation of restrictions in social, political, or economic systems", example:"Trade liberalisation has generated growth but also significant job displacement.", synonyms:["deregulation","opening up","relaxation"], translation:"либерализация" },
  { id:"g162",word:"protectionism",phonetic:"/prəˈtekʃənɪzəm/",        pos:"noun", difficulty:3, topic:"general", definition:"The theory or practice of shielding domestic industries from foreign competition", example:"A wave of protectionism in the 1930s deepened the Great Depression.", synonyms:["trade barriers","import controls","economic nationalism"], translation:"протекционизм" },
  { id:"g163",word:"multinational", phonetic:"/ˌmʌltiˈnæʃənl/",        pos:"noun", difficulty:1, topic:"general", definition:"A company operating in several countries", example:"Multinational corporations often exploit differences in tax and labour regulations.", synonyms:["global corporation","transnational company","conglomerate"], translation:"многонациональная компания / ТНК" },
  { id:"g164",word:"commodity",    phonetic:"/kəˈmɒdɪti/",             pos:"noun", difficulty:2, topic:"general", definition:"A raw material or primary product that can be bought and sold", example:"Fluctuating commodity prices create economic instability in resource-dependent nations.", synonyms:["good","product","resource"], translation:"товар / сырьё" },
  { id:"g165",word:"tariff",       phonetic:"/ˈtærɪf/",                pos:"noun", difficulty:2, topic:"general", definition:"A tax or duty to be paid on a particular class of imports or exports", example:"Imposing tariffs on steel imports led to retaliatory measures from trading partners.", synonyms:["import duty","trade tax","levy"], translation:"тариф / таможенная пошлина" },
  { id:"g166",word:"deficit",      phonetic:"/ˈdefɪsɪt/",              pos:"noun", difficulty:1, topic:"general", definition:"Excess of expenditure or liabilities over income or assets; a shortfall", example:"A persistent trade deficit can undermine a country's international economic standing.", synonyms:["shortfall","gap","imbalance"], translation:"дефицит" },
  { id:"g167",word:"surplus",      phonetic:"/ˈsɜːpləs/",              pos:"noun", difficulty:1, topic:"general", definition:"An amount of something left over when requirements have been met; excess production", example:"Germany's large trade surplus has been a source of tension with EU partners.", synonyms:["excess","remainder","overage"], translation:"профицит / излишек" },
  { id:"g168",word:"outsourcing",  phonetic:"/ˈaʊtsɔːsɪŋ/",            pos:"noun", difficulty:1, topic:"general", definition:"The practice of having certain job functions done outside a company, often by a foreign firm", example:"Outsourcing manufacturing to low-wage countries reduces costs but raises ethical concerns.", synonyms:["offshoring","subcontracting","third-party provision"], translation:"аутсорсинг" },
  { id:"g169",word:"remittance",   phonetic:"/rɪˈmɪtəns/",             pos:"noun", difficulty:3, topic:"general", definition:"A sum of money sent, especially by a migrant worker, to their home country", example:"Remittances sent by overseas workers are a vital source of income for many developing economies.", synonyms:["money transfer","payment","funds sent abroad"], translation:"денежный перевод (мигрантов на родину)" },
  { id:"g170",word:"deregulation", phonetic:"/ˌdiːˌreɡjʊˈleɪʃn/",      pos:"noun", difficulty:2, topic:"general", definition:"The removal of regulations or restrictions, especially in a particular industry", example:"Financial deregulation in the 1990s laid the groundwork for the 2008 banking crisis.", synonyms:["liberalisation","dismantling of rules","freeing up"], translation:"дерегулирование" },
  // Day 18 — Human Rights & Justice
  { id:"g171",word:"discrimination",phonetic:"/dɪˌskrɪmɪˈneɪʃn/",     pos:"noun", difficulty:1, topic:"general", definition:"Unjust treatment of different categories of people, especially on grounds of race, sex, or age", example:"Workplace discrimination based on gender remains widespread despite legal protections.", synonyms:["prejudice","bias","unfair treatment"], translation:"дискриминация" },
  { id:"g172",word:"equity",       phonetic:"/ˈekwɪti/",               pos:"noun", difficulty:2, topic:"general", definition:"The quality of being fair and impartial; fairness in relation to the needs of individuals", example:"Equity in education demands more resources for disadvantaged students, not equal resources.", synonyms:["fairness","impartiality","justice"], translation:"справедливость / равноправие" },
  { id:"g173",word:"emancipation", phonetic:"/ɪˌmænsɪˈpeɪʃn/",        pos:"noun", difficulty:3, topic:"general", definition:"The fact or process of being set free from legal, social, or political restrictions", example:"The emancipation of women from domestic labour began with access to paid employment.", synonyms:["liberation","freedom","independence"], translation:"эмансипация / освобождение" },
  { id:"g174",word:"oppression",   phonetic:"/əˈpreʃn/",               pos:"noun", difficulty:2, topic:"general", definition:"Prolonged cruel or unjust treatment or control; the state of being subject to such treatment", example:"Systemic oppression operates through institutions as much as through individual acts of prejudice.", synonyms:["persecution","tyranny","subjugation"], translation:"угнетение / подавление" },
  { id:"g175",word:"refugee",      phonetic:"/ˌrefjʊˈdʒiː/",           pos:"noun", difficulty:1, topic:"general", definition:"A person who has been forced to leave their country to escape war, persecution, or natural disaster", example:"The international community must honour its obligations under the 1951 Refugee Convention.", synonyms:["displaced person","asylum seeker","exile"], translation:"беженец" },
  { id:"g176",word:"civil liberties",phonetic:"/ˌsɪvl ˈlɪbətɪz/",     pos:"noun", difficulty:2, topic:"general", definition:"The rights of citizens to have personal freedom from arbitrary government interference", example:"Counter-terrorism measures sometimes come at the expense of civil liberties.", synonyms:["personal freedoms","human rights","individual rights"], translation:"гражданские свободы" },
  { id:"g177",word:"judicial",     phonetic:"/dʒuːˈdɪʃl/",             pos:"adj",  difficulty:2, topic:"general", definition:"Of, relating to, or performed by the administration of justice or the judiciary", example:"Independent judicial review is a cornerstone of the rule of law.", synonyms:["legal","judiciary-related","court-based"], translation:"судебный" },
  { id:"g178",word:"perpetuate",   phonetic:"/pəˈpetʃueɪt/",           pos:"verb", difficulty:2, topic:"general", definition:"Make something continue indefinitely; preserve from extinction", example:"Stereotypes in the media perpetuate harmful attitudes towards minority groups.", synonyms:["maintain","sustain","prolong"], translation:"увековечивать / сохранять (что-то плохое)" },
  { id:"g179",word:"stigma",       phonetic:"/ˈstɪɡmə/",               pos:"noun", difficulty:2, topic:"general", definition:"A mark of disgrace associated with a particular circumstance, quality, or person", example:"The stigma attached to mental illness prevents many people from seeking help.", synonyms:["shame","disgrace","social mark"], translation:"стигма / социальный ярлык" },
  { id:"g180",word:"disenfranchise",phonetic:"/ˌdɪsɪnˈfræntʃaɪz/",    pos:"verb", difficulty:3, topic:"general", definition:"Deprive someone of the right to vote or of other rights of citizenship", example:"Lengthy prison sentences effectively disenfranchise millions of citizens.", synonyms:["deprive","exclude","marginalise"], translation:"лишать избирательных / гражданских прав" },
  // Day 19 — Science & Innovation
  { id:"g181",word:"genome",       phonetic:"/ˈdʒiːnəʊm/",             pos:"noun", difficulty:2, topic:"general", definition:"The complete set of genes or genetic material present in an organism", example:"Mapping the human genome has revolutionised the diagnosis and treatment of genetic diseases.", synonyms:["genetic code","DNA","gene sequence"], translation:"геном" },
  { id:"g182",word:"nanotechnology",phonetic:"/ˌnænəʊtekˈnɒlədʒi/",   pos:"noun", difficulty:3, topic:"general", definition:"Technology on the scale of nanometres; manipulation of matter on an atomic or molecular scale", example:"Nanotechnology holds promise for targeted drug delivery and advanced materials.", synonyms:["nanotech","molecular engineering","microscale technology"], translation:"нанотехнологии" },
  { id:"g183",word:"renewable energy",phonetic:"/rɪˈnjuːəbl ˈenədʒi/",pos:"noun", difficulty:1, topic:"general", definition:"Energy from sources that are naturally replenished, such as sunlight, wind, and water", example:"The cost of renewable energy has fallen dramatically over the past decade.", synonyms:["clean energy","green energy","sustainable power"], translation:"возобновляемая энергия" },
  { id:"g184",word:"clinical trial",phonetic:"/ˈklɪnɪkl ˈtraɪəl/",    pos:"noun", difficulty:2, topic:"general", definition:"A research study that tests whether a medical strategy, treatment, or device is safe and effective", example:"Clinical trials are essential to evaluate the safety and efficacy of new drugs.", synonyms:["medical study","drug test","experimental study"], translation:"клиническое испытание" },
  { id:"g185",word:"peer review",  phonetic:"/pɪə rɪˈvjuː/",           pos:"noun", difficulty:2, topic:"general", definition:"Evaluation of scientific or academic work by experts in the same field", example:"Peer review is the gold standard for validating scientific research.", synonyms:["expert review","academic evaluation","editorial review"], translation:"рецензирование / экспертная проверка" },
  { id:"g186",word:"placebo effect",phonetic:"/pləˈsiːbəʊ ɪˌfekt/",   pos:"noun", difficulty:2, topic:"general", definition:"A beneficial effect caused by a treatment not due to any pharmacological properties", example:"Understanding the placebo effect has fundamentally changed how clinical trials are designed.", synonyms:["suggestion effect","expectation effect"], translation:"эффект плацебо" },
  { id:"g187",word:"extraterrestrial",phonetic:"/ˌekstrətəˈrestriəl/", pos:"adj",  difficulty:2, topic:"general", definition:"Of or from outside the earth or its atmosphere", example:"The search for extraterrestrial life drives investment in space exploration programmes.", synonyms:["alien","otherworldly","cosmic"], translation:"внеземной" },
  { id:"g188",word:"quantum computing",phonetic:"/ˈkwɒntəm kəmˈpjuːtɪŋ/",pos:"noun",difficulty:3,topic:"general",definition:"Computing based on quantum-mechanical phenomena, offering vastly greater processing power",example:"Quantum computing may break current encryption systems within a decade.",synonyms:["quantum processing","next-gen computing"],translation:"квантовые вычисления" },
  { id:"g189",word:"hypothesis testing",phonetic:"/haɪˈpɒθəsɪs ˈtestɪŋ/",pos:"noun",difficulty:3,topic:"general",definition:"A statistical method for determining whether experimental data supports a hypothesis",example:"Hypothesis testing helps scientists determine whether observed results are due to chance.",synonyms:["statistical testing","significance testing"],translation:"проверка гипотез" },
  { id:"g190",word:"interdisciplinary",phonetic:"/ˌɪntəˈdɪsɪplɪnəri/", pos:"adj",  difficulty:3, topic:"general", definition:"Relating to more than one branch of knowledge or study", example:"Interdisciplinary research combining biology and computer science has accelerated genomics.", synonyms:["cross-disciplinary","multidisciplinary","mixed-field"], translation:"междисциплинарный" },
  // Day 20 — Miscellaneous Academic
  { id:"g191",word:"unprecedented",phonetic:"/ʌnˈpresɪdentɪd/",        pos:"adj",  difficulty:2, topic:"general", definition:"Never done or known before", example:"The COVID-19 pandemic triggered an unprecedented global public health response.", synonyms:["unheard-of","novel","extraordinary"], translation:"беспрецедентный" },
  { id:"g192",word:"comprehensive", phonetic:"/ˌkɒmprɪˈhensɪv/",       pos:"adj",  difficulty:1, topic:"general", definition:"Complete; including all or nearly all elements; of large content or scope", example:"A comprehensive review of the literature reveals consistent patterns across studies.", synonyms:["thorough","complete","extensive"], translation:"всесторонний / обширный" },
  { id:"g193",word:"incentive",    phonetic:"/ɪnˈsentɪv/",              pos:"noun", difficulty:1, topic:"general", definition:"A thing that motivates or encourages someone to do something", example:"Tax incentives are often used to encourage green investment by the private sector.", synonyms:["motivation","inducement","stimulus"], translation:"стимул / побудительный мотив" },
  { id:"g194",word:"reluctant",    phonetic:"/rɪˈlʌktənt/",             pos:"adj",  difficulty:1, topic:"general", definition:"Unwilling and hesitant; disinclined to do something", example:"Governments are often reluctant to impose carbon taxes for fear of voter backlash.", synonyms:["unwilling","hesitant","disinclined"], translation:"неохотный / несклонный" },
  { id:"g195",word:"voluntary",    phonetic:"/ˈvɒləntri/",              pos:"adj",  difficulty:1, topic:"general", definition:"Done, given, or acting of one's own free will; not compulsory", example:"Voluntary compliance with environmental standards is rarely sufficient without enforcement.", synonyms:["optional","willing","unpaid"], translation:"добровольный" },
  { id:"g196",word:"compulsory",   phonetic:"/kəmˈpʌlsəri/",           pos:"adj",  difficulty:1, topic:"general", definition:"Required by law or a rule; obligatory", example:"Compulsory education is a key driver of long-term economic development.", synonyms:["mandatory","obligatory","required"], translation:"обязательный" },
  { id:"g197",word:"cumulative",   phonetic:"/ˈkjuːmjʊlətɪv/",         pos:"adj",  difficulty:2, topic:"general", definition:"Increasing or increased in quantity by successive additions", example:"The cumulative impact of small daily choices on health is often underestimated.", synonyms:["accumulative","growing","increasing"], translation:"накопительный / совокупный" },
  { id:"g198",word:"threshold",    phonetic:"/ˈθreʃhəʊld/",            pos:"noun", difficulty:2, topic:"general", definition:"The level or point at which something starts or ceases; a starting point", example:"Exceeding the 1.5°C temperature threshold risks triggering irreversible climate tipping points.", synonyms:["limit","boundary","tipping point"], translation:"порог / граница" },
  { id:"g199",word:"indicative",   phonetic:"/ɪnˈdɪkətɪv/",            pos:"adj",  difficulty:2, topic:"general", definition:"Serving as a sign or indication of something", example:"High dropout rates are indicative of deeper structural problems in the education system.", synonyms:["suggestive","symptomatic","representative"], translation:"свидетельствующий / показательный" },
  { id:"g200",word:"holistic",     phonetic:"/hɒˈlɪstɪk/",             pos:"adj",  difficulty:2, topic:"general", definition:"Relating to the whole and the interdependence of its parts; treating the whole person", example:"A holistic approach to wellbeing addresses physical, mental, and social dimensions equally.", synonyms:["whole-person","integrated","comprehensive"], translation:"целостный / холистический" },

];


/* ── topic / tag meta ─────────────────────────────────────────────────────── */
const TOPICS = [
  { id: "all",         label: "All",          emoji: "📚" },
  { id: "environment", label: "Environment",  emoji: "🌿" },
  { id: "technology",  label: "Technology",   emoji: "💻" },
  { id: "education",   label: "Education",    emoji: "🎓" },
  { id: "health",      label: "Health",       emoji: "🏥" },
  { id: "society",     label: "Society",      emoji: "🏙️" },
  { id: "economy",     label: "Economy",      emoji: "📈" },
  { id: "culture",     label: "Culture",      emoji: "🎭" },
];

const DIFF_CHIP: Record<number, { bg: string; color: string; label: string }> = {
  1: { bg: "#f0faf4", color: "#16a34a", label: "Beginner" },
  2: { bg: "#fffbeb", color: "#d97706", label: "Intermediate" },
  3: { bg: "#fff1f2", color: "#e11d48", label: "Advanced" },
};

const POS_CHIP: Record<string, { bg: string; color: string }> = {
  noun:   { bg: "#eff6ff", color: "#2563eb" },
  verb:   { bg: "#f5f3ff", color: "#7c3aed" },
  adj:    { bg: "#fff7ed", color: "#ea580c" },
  adverb: { bg: "#f0fdf4", color: "#16a34a" },
  phrase: { bg: "#fdf4ff", color: "#a21caf" },
};

/* ── Word of the Day ─────────────────────────────────────────────────────── */
const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};
const WORD_OF_DAY = VOCAB[dayOfYear() % VOCAB.length];

/* ── WordCard ─────────────────────────────────────────────────────────────── */
function WordCard({ word, learned, onToggle }: { word: Word; learned: boolean; onToggle: () => void }) {
  const dc = DIFF_CHIP[word.difficulty] || { bg: "#f5f5f5", color: "#777", label: String(word.difficulty) };
  const pc = POS_CHIP[word.pos] || { bg: "#f5f5f5", color: "#777" };
  return (
    <div
      style={{
        background: "#fff", borderRadius: 20, padding: "24px 26px",
        border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        display: "flex", flexDirection: "column", gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.02em", marginBottom: 2 }}>{word.word}</div>
          <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>{word.phonetic}</div>
        </div>
        <button
          onClick={onToggle}
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: learned ? "#f0faf4" : "#f5f5f5",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.2s",
          }}
        >
          <CheckCircle size={13} color={learned ? "#16a34a" : "#ccc"} />
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: pc.bg, color: pc.color, borderRadius: 100, padding: "3px 9px" }}>{word.pos}</span>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: dc.bg, color: dc.color, borderRadius: 100, padding: "3px 9px" }}>{dc.label}</span>
      </div>
      <div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>{word.definition}</div>
      <div style={{ padding: "10px 14px", background: "#fafafa", borderRadius: 12, border: "1px solid #f0f0f0" }}>
        <div style={{ fontSize: 12, color: "#777", lineHeight: 1.65, fontStyle: "italic" }}>"{word.example}"</div>
      </div>
      {word.synonyms?.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {word.synonyms.map((s: string) => (
            <span key={s} style={{ fontSize: 11, fontWeight: 500, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "3px 9px" }}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── FlashcardMode ─────────────────────────────────────────────────────────── */
function FlashcardMode({ words, learned, onToggle }: { words: Word[]; learned: Set<string>; onToggle: (id: string) => void }) {
  const [idx, setIdx]       = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = words[idx];
  if (!word) return <div style={{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 14 }}>No words in this set.</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 12, color: "#bbb", marginBottom: 24 }}>{idx + 1} / {words.length}</div>
      {/* 3-D flip card */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          width: "min(480px,90vw)", height: 280, cursor: "pointer",
          perspective: 1000, marginBottom: 28,
        }}
      >
        <div
          style={{
            position: "relative", width: "100%", height: "100%",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* front */}
          <div
            style={{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden",
              background: "#0a0a0a", borderRadius: 24,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 8, padding: 32, boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff" }}>{word.word}</div>
            <div style={{ fontSize: 13, color: "#666", fontStyle: "italic" }}>{word.phonetic}</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 8 }}>tap to reveal</div>
          </div>
          {/* back */}
          <div
            style={{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden",
              background: "#fff", borderRadius: 24, border: "1px solid #e8e8e8",
              transform: "rotateY(180deg)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              gap: 10, padding: 32, boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 500, color: "#0a0a0a" }}>{word.word}</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{word.definition}</div>
            <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>"{word.example}"</div>
          </div>
        </div>
      </div>
      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => { setIdx((i) => Math.max(0, i - 1)); setFlipped(false); }} disabled={idx === 0} style={{ padding: "8px 20px", borderRadius: 100, border: "1px solid #e8e8e8", background: "#fff", cursor: idx === 0 ? "not-allowed" : "pointer", fontSize: 13, color: idx === 0 ? "#ccc" : "#555", fontFamily: "'DM Sans', sans-serif" }}>Prev</button>
        <button
          onClick={() => { onToggle(word.id); }}
          style={{ padding: "8px 20px", borderRadius: 100, border: "none", background: learned.has(word.id) ? "#f0faf4" : "#f5f5f5", color: learned.has(word.id) ? "#16a34a" : "#777", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}
        >
          {learned.has(word.id) ? "✓ Learned" : "Mark learned"}
        </button>
        <button onClick={() => { setIdx((i) => Math.min(words.length - 1, i + 1)); setFlipped(false); }} disabled={idx === words.length - 1} style={{ padding: "8px 20px", borderRadius: 100, border: "1px solid #e8e8e8", background: "#fff", cursor: idx === words.length - 1 ? "not-allowed" : "pointer", fontSize: 13, color: idx === words.length - 1 ? "#ccc" : "#555", fontFamily: "'DM Sans', sans-serif" }}>Next</button>
      </div>
    </div>
  );
}

/* ── QuizMode ──────────────────────────────────────────────────────────────── */
function QuizMode({ words }: { words: Word[] }) {
  const [qIdx, setQIdx]   = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore]  = useState(0);
  const [done, setDone]    = useState(false);

  if (words.length < 4) return <div style={{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 14 }}>Need at least 4 words for quiz mode.</div>;

  const q = words[qIdx];
  const others = words.filter((_, i) => i !== qIdx);
  const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.definition);
  const options = [...distractors, q.definition].sort(() => Math.random() - 0.5);

  if (done) return (
    <div style={{ padding: 64, textAlign: "center" }}>
      <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: "-0.05em", color: "#0a0a0a", marginBottom: 8 }}>{score}<span style={{ fontSize: 20, color: "#bbb" }}>{`/${words.length}`}</span></div>
      <div style={{ fontSize: 14, color: "#777", marginBottom: 28 }}>{score === words.length ? "Perfect!" : score >= words.length * 0.7 ? "Great job!" : "Keep practising!"}</div>
      <button onClick={() => { setQIdx(0); setChosen(null); setScore(0); setDone(false); }} style={{ padding: "10px 28px", background: "#0a0a0a", color: "#fff", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Retry</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ fontSize: 12, color: "#bbb", marginBottom: 20 }}>Question {qIdx + 1} of {words.length}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: "#0a0a0a", marginBottom: 8 }}>{q.word}</div>
      <div style={{ fontSize: 12, color: "#999", fontStyle: "italic", marginBottom: 24 }}>{q.phonetic}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((opt) => {
          const isCorrect = opt === q.definition;
          let bg = "#fff", col = "#0a0a0a", border = "1px solid #e8e8e8";
          if (chosen) {
            if (opt === chosen && isCorrect)  { bg = "#f0faf4"; col = "#16a34a"; border = "1px solid #86efac"; }
            else if (opt === chosen)          { bg = "#fff1f2"; col = "#e11d48"; border = "1px solid #fca5a5"; }
            else if (isCorrect)               { bg = "#f0faf4"; col = "#16a34a"; border = "1px solid #86efac"; }
          }
          return (
            <button
              key={opt}
              disabled={!!chosen}
              onClick={() => {
                setChosen(opt);
                if (isCorrect) setScore((s) => s + 1);
                setTimeout(() => {
                  if (qIdx + 1 >= words.length) setDone(true);
                  else { setQIdx((i) => i + 1); setChosen(null); }
                }, 900);
              }}
              style={{
                padding: "14px 18px", borderRadius: 14, border, background: bg, color: col,
                textAlign: "left", cursor: chosen ? "default" : "pointer",
                fontSize: 13, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Vocabulary page ─────────────────────────────────────────────────── */
export function Vocabulary() {
  const [mode, setMode]       = useState<"browse" | "flashcard" | "quiz">("browse");
  const [topic, setTopic]     = useState("all");
  const [search, setSearch]   = useState("");
  const [learned, setLearned] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("grader_vocab_learned") || "[]")); }
    catch { return new Set(); }
  });

  const toggleLearned = (id: string) => {
    setLearned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("grader_vocab_learned", JSON.stringify([...next]));
      return next;
    });
  };

  const filteredWords = VOCAB.filter((w) => {
    const matchTopic  = topic === "all" || w.topic === topic;
    const matchSearch = !search || w.word.toLowerCase().includes(search.toLowerCase()) || w.definition.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  const learnedCount = filteredWords.filter((w) => learned.has(w.id)).length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        .voc-topic:hover { background: #f0f0f0 !important; }
        .voc-word-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1); }
        .voc-word-card:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.07); }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 48px" }}>

        {/* ── Hero ── */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center",
            background: "#0a0a0a", borderRadius: 24, padding: "48px 56px", marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#777", marginBottom: 16 }}>Vocabulary Builder</div>
            <h1 style={{ fontSize: 44, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.15, margin: "0 0 14px" }}>
              Expand your{" "}
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, color: "#ccc" }}>lexicon</em>
            </h1>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 400 }}>
              {VOCAB.length} curated IELTS words with definitions, examples, and pronunciation guides.
            </p>
            <div style={{ display: "flex", gap: 40 }}>
              {[
                { value: VOCAB.length.toString(), label: "Total words" },
                { value: learnedCount.toString(),  label: "Learned"     },
                { value: TOPICS.length - 1 + "",  label: "Topics"      },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Word of the day */}
          <div style={{ background: "#141414", borderRadius: 20, padding: 28, border: "1px solid #222" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 16 }}>Word of the day</div>
            <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff", marginBottom: 4 }}>{WORD_OF_DAY.word}</div>
            <div style={{ fontSize: 12, color: "#666", fontStyle: "italic", marginBottom: 12 }}>{WORD_OF_DAY.phonetic}</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.65, marginBottom: 14 }}>{WORD_OF_DAY.definition}</div>
            <div style={{ fontSize: 12, color: "#555", fontStyle: "italic" }}>"{WORD_OF_DAY.example}"</div>
          </div>
        </div>

        {/* ── Mode switcher ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "#fff", borderRadius: 100, padding: 4, border: "1px solid #e8e8e8", width: "fit-content" }}>
          {[
            { id: "browse",    label: "Browse",    icon: BookOpen },
            { id: "flashcard", label: "Flashcards", icon: Zap     },
            { id: "quiz",      label: "Quiz",       icon: Brain   },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id as "browse" | "flashcard" | "quiz")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 20px", borderRadius: 100, border: "none", cursor: "pointer",
                background: mode === id ? "#0a0a0a" : "transparent",
                color: mode === id ? "#fff" : "#777",
                fontSize: 13, fontWeight: mode === id ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s, color 0.2s",
              }}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* ── Search + topic pills ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <Search size={14} color="#bbb" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search words…"
              style={{
                padding: "10px 16px 10px 36px", border: "1px solid #e8e8e8", borderRadius: 100,
                fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "#fff",
                outline: "none", color: "#0a0a0a", width: 220,
              }}
            />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}><X size={12} color="#bbb" /></button>}
          </div>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTopic(t.id)}
              className="voc-topic"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "8px 16px", borderRadius: 100, border: "1px solid",
                borderColor: topic === t.id ? "#0a0a0a" : "#e8e8e8",
                background: topic === t.id ? "#0a0a0a" : "#fff",
                color: topic === t.id ? "#fff" : "#555",
                fontSize: 12, fontWeight: topic === t.id ? 600 : 400,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s, border-color 0.15s",
              }}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: "#bbb" }}>{filteredWords.length} words</span>
          <div style={{ flex: 1, height: 4, background: "#f0f0f0", borderRadius: 4, overflow: "hidden", maxWidth: 200 }}>
            <div style={{ height: "100%", width: filteredWords.length ? `${(learnedCount / filteredWords.length) * 100}%` : "0%", background: "#16a34a", borderRadius: 4, transition: "width 0.4s" }} />
          </div>
          <span style={{ fontSize: 12, color: "#bbb" }}>{learnedCount} learned</span>
        </div>

        {/* ── Mode content ── */}
        {mode === "flashcard" ? (
          <FlashcardMode words={filteredWords} learned={learned} onToggle={toggleLearned} />
        ) : mode === "quiz" ? (
          <QuizMode words={filteredWords} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filteredWords.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", color: "#bbb", fontSize: 14 }}>No words found</div>
            ) : (
              filteredWords.map((word) => (
                <div key={word.id} className="voc-word-card">
                  <WordCard word={word} learned={learned.has(word.id)} onToggle={() => toggleLearned(word.id)} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
