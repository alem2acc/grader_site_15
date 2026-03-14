// ══════════════════════════════════════════════════════════════════════════════
// IELTS Academic Reading – 5 Full Practice Tests
// Each test: 3 passages · 40 questions · 60 minutes
// ══════════════════════════════════════════════════════════════════════════════

export interface QuestionItem {
  id: string;          // global question number within the test, e.g. "1"–"40"
  text: string;
  answer?: string;     // canonical correct answer (for auto-scoring)
  options?: { value: string; label: string }[];
}

export interface QuestionGroup {
  id: number;
  type:
    | "tfng"
    | "ynng"
    | "multiple-choice"
    | "matching-headings"
    | "matching-info"
    | "sentence-completion"
    | "summary-completion"
    | "short-answer";
  instruction: string;
  bank?: { value: string; label: string }[];
  summaryTitle?: string;
  summaryText?: string;
  items: QuestionItem[];
}

export interface Passage {
  title: string;
  subtitle: string;
  paragraphs: string[];
  questions: QuestionGroup[];
  firstQ: number;
  lastQ: number;
}

export interface IELTSTest {
  id: number;
  title: string;
  tags: string[];
  difficulty: "Moderate" | "Challenging" | "Advanced" | "Upper-Intermediate";
  passages: [Passage, Passage, Passage];
}

// ── helpers ───────────────────────────────────────────────────────────────────
const Q = (n: number) => String(n);

// ══════════════════════════════════════════════════════════════════════════════
// TEST 1
// ══════════════════════════════════════════════════════════════════════════════
const T1P1: Passage = {
  title: "The Deep Sleep of Hibernation",
  subtitle: "Reading Passage 1 · Questions 1–13",
  firstQ: 1, lastQ: 13,
  paragraphs: [
    /* A */ "Each winter, millions of mammals across the northern hemisphere enter a state so profound that early naturalists debated whether the animals had actually died. True hibernation — observed in ground squirrels, woodchucks, and certain bat species — involves a regulated drop in core body temperature to within a degree or two of the surrounding environment, a reduction in heart rate from hundreds of beats per minute to as few as three or four, and a slowing of metabolic rate to less than five percent of the waking norm. Far from a passive collapse, this state is an exquisitely orchestrated biological programme that allows animals to survive months without food or water.",
    /* B */ "Not all winter dormancy is equal. Bears, often cited as quintessential hibernators, actually enter a lighter torpor from which they can rouse relatively quickly; a female bear may even give birth and nurse cubs during this period. True hibernators such as the Arctic ground squirrel, by contrast, may remain in deep torpor for seven to eight months, periodically waking for brief episodes lasting only a few hours before returning to dormancy. The reasons for these 'interbout arousals' remain disputed, but one leading hypothesis is that they allow essential neural housekeeping — consolidating memories and clearing metabolic waste from the brain.",
    /* C */ "The metabolic slowdown of hibernation is regulated by a cascade of hormonal and genetic signals. In the weeks before hibernation, animals enter a hyperphagia phase — eating voraciously to accumulate fat stores that will serve as their sole energy source for months. Levels of the hormone leptin, which normally suppresses appetite, paradoxically rise without producing satiety; researchers believe the brain becomes temporarily resistant to the hormone's signal, a phenomenon with striking parallels to the development of leptin resistance in obese humans. As day length shortens, rising melatonin levels interact with thyroid hormones to initiate a controlled suppression of metabolic activity.",
    /* D */ "Hibernation is not without considerable risk. Prolonged inactivity in mammals typically causes rapid muscle atrophy — a process known as disuse atrophy — yet hibernating ground squirrels emerge in spring with remarkably little muscle loss despite months of immobility. Research has revealed that these animals actively synthesise certain muscle proteins even during deep torpor, effectively counteracting the usual effects of inactivity. More serious is the threat posed by pathogens: white-nose syndrome, caused by the fungus Pseudogymnoascus destructans, has devastated North American bat populations precisely because it disrupts hibernation, forcing bats to arouse prematurely and exhaust their fat reserves.",
    /* E */ "The ability to survive extreme metabolic suppression has attracted significant interest from medical researchers. Surgeons have long sought reliable methods of inducing controlled hypothermia in patients to limit cellular damage during cardiac surgery or following traumatic brain injury. Studies of hibernating animals have identified a substance dubbed 'hibernation induction trigger' — a class of endogenous opioid-like compounds that, when isolated and administered to non-hibernating mammals, appear to induce torpor-like states. If the precise molecular mechanisms underlying cold tolerance and cell preservation in hibernators can be replicated pharmacologically, the implications for emergency medicine, organ transplantation, and even long-distance space travel could be transformative.",
    /* F */ "For wildlife conservationists, an understanding of hibernation is increasingly urgent. Climate change is disrupting the environmental cues that trigger hibernation onset. Studies tracking yellow-bellied marmots in Colorado have documented a three-week advance in the date of spring emergence over three decades, driven by earlier snowmelt. When animals emerge before their food sources are available, they face an energy deficit at the most vulnerable time of year — a phenomenon researchers have termed 'phenological mismatch'. Protecting hibernating species therefore requires not merely preserving their habitat but also understanding and mitigating the cascading effects of a warming climate on seasonal biological rhythms.",
  ],
  questions: [
    {
      id: 1, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — A remarkable physiological feat" },
        { value: "ii",  label: "ii — Varieties of dormancy across species" },
        { value: "iii", label: "iii — The hormonal and metabolic triggers" },
        { value: "iv",  label: "iv — Risks and costs of long-term dormancy" },
        { value: "v",   label: "v — Potential medical applications" },
        { value: "vi",  label: "vi — Conservation implications" },
      ],
      items: [
        { id: Q(1), text: "Paragraph A", answer: "i" },
        { id: Q(2), text: "Paragraph B", answer: "ii" },
        { id: Q(3), text: "Paragraph C", answer: "iii" },
        { id: Q(4), text: "Paragraph D", answer: "iv" },
        { id: Q(5), text: "Paragraph E", answer: "v" },
        { id: Q(6), text: "Paragraph F", answer: "vi" },
      ],
    },
    {
      id: 2, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(7),  text: "Bears can give birth and nurse young while in their winter dormancy state.", answer: "True" },
        { id: Q(8),  text: "During hyperphagia, the brains of hibernating animals become insensitive to leptin's normal appetite-suppressing signal.", answer: "True" },
        { id: Q(9),  text: "White-nose syndrome has affected hibernating bat species on every inhabited continent.", answer: "Not Given" },
        { id: Q(10), text: "Yellow-bellied marmots in Colorado are now emerging from hibernation earlier than they did thirty years ago.", answer: "True" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(11), text: "The brief waking episodes that true hibernators experience during deep torpor are called __________.", answer: "interbout arousals" },
        { id: Q(12), text: "Ground squirrels avoid the usual consequences of inactivity by continuing to synthesise __________ proteins even during torpor.", answer: "muscle" },
        { id: Q(13), text: "Researchers call the problem that arises when animals emerge before their food supply is ready __________.", answer: "phenological mismatch" },
      ],
    },
  ],
};

const T1P2: Passage = {
  title: "The Rise of the Sharing Economy",
  subtitle: "Reading Passage 2 · Questions 14–26",
  firstQ: 14, lastQ: 26,
  paragraphs: [
    /* A */ "When Airbnb was founded in San Francisco in 2008, its three founders were struggling to pay their rent and decided to rent out air mattresses in their living room to conference attendees. Few could have predicted that this improvised solution would seed a multi-billion-dollar industry that, by the mid-2020s, would have disrupted real estate, transportation, finance, and labour markets simultaneously. The 'sharing economy' — a term that encompasses platforms facilitating peer-to-peer exchange of assets, services, and skills — had become one of the defining economic phenomena of the early 21st century.",
    /* B */ "The economic logic underpinning the sharing economy rests on the concept of idle capacity. Traditional ownership involves purchasing assets that spend much of their life unused: the average privately owned car in the United States is in motion for only about four percent of the time. Digital platforms that connect owners with prospective users allow this underutilised capacity to generate value, theoretically improving economic efficiency at a systemic level. Proponents argue that sharing economy services also reduce environmental impact by enabling more intensive use of existing goods, thereby decreasing the demand for new production.",
    /* C */ "The reality, however, is considerably more complex. Studies of Uber and Lyft's impact on urban transportation have found that, rather than replacing private car ownership, ride-hailing services in many cities initially increased total vehicle miles travelled by drawing passengers away from public transit. The promised environmental dividend failed to materialise until electric vehicles began to enter ride-hailing fleets in significant numbers. Similarly, research on Airbnb's impact on housing markets in cities such as Barcelona, Amsterdam, and New York found that the platform had contributed to rising rents and the displacement of long-term residents from central neighbourhoods — an outcome that was arguably the inverse of the original sharing ethos.",
    /* D */ "Labour relations represent one of the most contentious dimensions of the sharing economy. Platforms have typically classified their service providers — drivers, delivery workers, cleaners — as independent contractors rather than employees, allowing them to avoid obligations related to minimum wage, overtime pay, sick leave, and employer contributions to social insurance. Workers, in turn, have argued that the degree of control exercised over them by algorithmic management systems is inconsistent with genuine contractor status. A landmark ruling by the UK Supreme Court in 2021 held that Uber drivers were legally workers rather than self-employed contractors, entitled to minimum wage protections — a decision that sent ripples through gig economy business models globally.",
    /* E */ "Regulatory responses have varied markedly between jurisdictions. Some cities — most notably Barcelona — moved quickly to severely restrict short-term rental licences, motivated by housing crisis concerns. Others adopted a lighter-touch approach, seeking to capture tax revenue from platform transactions without imposing onerous operating constraints. The European Union's Digital Markets Act, which came into force in 2023, imposed new obligations on large platform operators to ensure fair and contestable digital markets, though critics argued that the legislation stopped short of addressing the deeper structural imbalances in platform labour relations.",
    /* F */ "Despite these controversies, the sharing economy has continued to grow. More recently, a new wave of platforms has extended the model beyond physical assets and personal services into professional knowledge and creative work. Platforms mediating freelance programming, graphic design, academic tutoring, and legal advice have created global labour markets in which a software engineer in Nairobi competes directly with one in Berlin. While this has genuinely expanded economic opportunity in some lower-income countries, it has also exerted downward pressure on wages in high-income markets and complicated long-standing professional boundaries and licensing frameworks that were designed to protect public welfare.",
  ],
  questions: [
    {
      id: 1, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(14), text: "An account of the circumstances that led to the founding of a major sharing economy platform.", answer: "A" },
        { id: Q(15), text: "A description of a court ruling that has international implications for how platform workers are classified.", answer: "D" },
        { id: Q(16), text: "Evidence that a sharing economy service increased rather than reduced resource consumption in some markets.", answer: "C" },
        { id: Q(17), text: "A description of how the sharing economy model has been extended to knowledge-based and professional work.", answer: "F" },
      ],
    },
    {
      id: 2, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(18), text: "According to paragraph B, what is the core economic argument behind the sharing economy?",
          answer: "B",
          options: [
            { value: "A", label: "Creating new consumer markets through digital technology." },
            { value: "B", label: "Allowing underused assets to generate economic value." },
            { value: "C", label: "Reducing consumer spending on physical possessions." },
            { value: "D", label: "Replacing traditional companies with decentralised networks." },
          ],
        },
        {
          id: Q(19), text: "What does the passage suggest about the environmental benefit of ride-hailing services?",
          answer: "C",
          options: [
            { value: "A", label: "It was immediately significant in most major cities." },
            { value: "B", label: "It was achieved mainly by encouraging people to give up car ownership." },
            { value: "C", label: "It was delayed until electric vehicles became widespread in those fleets." },
            { value: "D", label: "It was undermined entirely by the expansion of aviation." },
          ],
        },
        {
          id: Q(20), text: "Which of the following best describes Barcelona's regulatory approach to short-term rentals?",
          answer: "B",
          options: [
            { value: "A", label: "It focused primarily on collecting taxes from platform operators." },
            { value: "B", label: "It moved quickly to place strict limits on short-term rental licences." },
            { value: "C", label: "It preferred a lighter approach to attract platform investment." },
            { value: "D", label: "It followed the EU-wide Digital Markets Act approach." },
          ],
        },
      ],
    },
    {
      id: 3, type: "ynng",
      instruction: "Do the following statements agree with the views of the writer? Write YES, NO, or NOT GIVEN.",
      items: [
        { id: Q(21), text: "The sharing economy has had a uniformly positive impact on housing affordability in major cities.", answer: "No" },
        { id: Q(22), text: "The classification of gig workers as independent contractors is inconsistent with the actual level of control platforms exert over them.", answer: "Yes" },
        { id: Q(23), text: "The EU's Digital Markets Act fully resolved the structural problems in platform labour relations.", answer: "No" },
        { id: Q(24), text: "The global expansion of knowledge-work platforms has had both beneficial and detrimental effects on workers in different countries.", answer: "Yes" },
        { id: Q(25), text: "Airbnb's founders initially planned to build one of the world's largest hospitality companies.", answer: "Not Given" },
        { id: Q(26), text: "Ride-hailing services drew passengers away from public transportation in many cities.", answer: "Yes" },
      ],
    },
  ],
};

const T1P3: Passage = {
  title: "The Gut Microbiome: Your Second Brain",
  subtitle: "Reading Passage 3 · Questions 27–40",
  firstQ: 27, lastQ: 40,
  paragraphs: [
    /* A */ "The human gastrointestinal tract harbours a community of microorganisms so vast and complex that scientists have compared it to a separate organ. Comprising approximately 100 trillion bacteria, archaea, viruses, and fungi — collectively termed the microbiome — this ecosystem encodes roughly three million unique genes, dwarfing the approximately 20,000 protein-coding genes in the human genome. For much of medical history, the gut's microbial residents were regarded as largely incidental, their presence tolerated rather than valued. The past two decades have overturned this view entirely.",
    /* B */ "The microbiome begins to form at birth. Infants delivered vaginally acquire an initial microbial community that closely resembles the maternal vaginal and faecal microbiota, providing early colonisers that play a foundational role in training the infant immune system. Caesarean-delivered infants, by contrast, are initially colonised primarily by skin and environmental bacteria, a difference associated in some studies with higher rates of allergies and autoimmune conditions in later life — though researchers stress that this is a correlation and that many confounding factors complicate the picture. Breastfeeding further shapes the infant microbiome: human milk contains oligosaccharides — complex carbohydrates that humans cannot digest — that appear to function specifically as food for beneficial bacterial species such as Bifidobacterium.",
    /* C */ "Diet remains the single most powerful modulator of the adult microbiome. Research consistently shows that dietary fibre — found in vegetables, legumes, whole grains, and fruit — is fermented by gut bacteria into short-chain fatty acids (SCFAs) such as butyrate, propionate, and acetate. Butyrate, in particular, serves as the primary energy source for colonocytes (the cells lining the colon), supports gut barrier integrity, and exerts anti-inflammatory effects. A diet low in fibre, characteristic of many industrialised food environments, leads to reduced microbial diversity and lower SCFA production — a pattern consistently associated with higher rates of inflammatory bowel disease, metabolic syndrome, and colorectal cancer.",
    /* D */ "Perhaps the most surprising finding in recent microbiome research is the extent to which gut bacteria communicate with the brain. The 'gut-brain axis' — a bidirectional communication network involving the vagus nerve, enteric nervous system, immune signalling molecules, and gut-derived neurotransmitters — means that microbial activity in the gut can measurably influence mood, cognition, and behaviour. Studies in germ-free mice — animals raised in sterile conditions with no gut microbiome — display markedly abnormal stress responses and anxiety-like behaviours that can be partially reversed by introducing specific bacterial strains. In humans, certain probiotic strains have demonstrated modest but statistically significant reductions in self-reported anxiety and cortisol levels, though researchers caution that the field is at an early stage and that most studies are small.",
    /* E */ "The concept of 'dysbiosis' — a disrupted or imbalanced microbial community — has been implicated in a wide range of conditions beyond the gut, including rheumatoid arthritis, Parkinson's disease, and major depressive disorder. Faecal microbiota transplantation (FMT) — transferring gut bacteria from a healthy donor to a patient — has emerged as a powerful therapy for recurrent Clostridioides difficile infection, with cure rates exceeding ninety percent in some clinical trials. Researchers are now exploring FMT for inflammatory bowel disease, obesity, and even autism spectrum disorder, though results have been more variable and the mechanisms less clear.",
    /* F */ "The commercialisation of microbiome science has created a booming market for probiotics and 'gut health' products of highly variable quality and scientific credibility. Many over-the-counter probiotic supplements contain bacterial strains and quantities that, while generally safe, have not been demonstrated to colonise the gut durably or produce the health benefits claimed on product labelling. Nutritional scientists have noted that increasing dietary fibre — an inexpensive and accessible intervention — consistently demonstrates more robust evidence for improving microbiome diversity than most commercial supplement regimens. Nevertheless, the microbiome remains one of the most active and commercially lucrative frontiers in biomedical research, with potential applications in drug delivery, personalised nutrition, and disease prevention.",
  ],
  questions: [
    {
      id: 1, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(27), text: "What is the writer's main point about the human microbiome in paragraph A?",
          answer: "B",
          options: [
            { value: "A", label: "Its complexity has made it almost impossible to study scientifically." },
            { value: "B", label: "Medical understanding of its importance has changed dramatically in recent years." },
            { value: "C", label: "It contains more genes than the human genome but plays a minor role in health." },
            { value: "D", label: "It was well understood by scientists long before modern research began." },
          ],
        },
        {
          id: Q(28), text: "What does the passage say about the link between delivery method and infant microbiome?",
          answer: "C",
          options: [
            { value: "A", label: "Caesarean delivery definitively causes higher rates of autoimmune disease." },
            { value: "B", label: "Vaginally delivered infants never develop conditions found in caesarean-delivered infants." },
            { value: "C", label: "Researchers acknowledge that the observed correlation may involve multiple influencing factors." },
            { value: "D", label: "The maternal microbiome has no influence on microbiome formation at birth." },
          ],
        },
        {
          id: Q(29), text: "According to paragraph C, why is dietary fibre important for gut health?",
          answer: "B",
          options: [
            { value: "A", label: "It reduces the overall number of bacteria in the gut." },
            { value: "B", label: "It is converted by bacteria into compounds that support colon health and reduce inflammation." },
            { value: "C", label: "It prevents cancer by directly destroying abnormal cells." },
            { value: "D", label: "It increases the production of digestive enzymes in the stomach." },
          ],
        },
      ],
    },
    {
      id: 2, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(30), text: "A warning about the limited evidence supporting many commercially available gut health products.", answer: "F" },
        { id: Q(31), text: "A description of a therapy that works by transferring gut bacteria between individuals.", answer: "E" },
        { id: Q(32), text: "An explanation of how a component of breast milk selectively feeds beneficial bacteria.", answer: "B" },
        { id: Q(33), text: "Evidence from animal experiments illustrating the connection between gut bacteria and mental state.", answer: "D" },
      ],
    },
    {
      id: 3, type: "summary-completion",
      instruction: "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      summaryTitle: "The Gut-Brain Axis",
      summaryText: "Gut bacteria communicate with the brain through a network called the '(34)__________'. This bidirectional system involves the vagus nerve, the enteric nervous system, and immune signalling molecules. Studies using (35)__________ mice — animals raised without any gut microbiome — revealed abnormal stress responses and heightened anxiety. In human trials, certain (36)__________ strains have produced modest but measurable reductions in self-reported anxiety and in the stress hormone (37)__________.",
      items: [
        { id: Q(34), text: "Name of the gut-to-brain communication network:", answer: "gut-brain axis" },
        { id: Q(35), text: "Term for mice raised in sterile conditions with no microbiome:", answer: "germ-free" },
        { id: Q(36), text: "Type of bacterial product used in the human trials:", answer: "probiotic" },
        { id: Q(37), text: "Stress hormone measured in human studies:", answer: "cortisol" },
      ],
    },
    {
      id: 4, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(38), text: "Caesarean-delivered infants are definitively known to develop higher rates of allergic disease regardless of other factors.", answer: "False" },
        { id: Q(39), text: "FMT has already been proven effective for treating obesity and autism spectrum disorder.", answer: "Not Given" },
        { id: Q(40), text: "Increasing dietary fibre intake has stronger scientific support than most probiotic supplement regimens for improving microbiome diversity.", answer: "True" },
      ],
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TEST 2
// ══════════════════════════════════════════════════════════════════════════════
const T2P1: Passage = {
  title: "Light Pollution: Stealing the Night",
  subtitle: "Reading Passage 1 · Questions 1–13",
  firstQ: 1, lastQ: 13,
  paragraphs: [
    /* A */ "For most of human history, the night sky was an unobstructed window onto the cosmos — a navigational tool for sailors, a religious canvas for ancient civilisations, and a perennial source of scientific inquiry. Today, more than a third of the world's population can no longer see the Milky Way from where they live. Artificial light, the defining achievement of industrial civilisation, has become one of its most pervasive and least-discussed forms of environmental pollution. Every year, the total amount of artificially lit outdoor surface area increases by roughly two percent globally — a statistic that masks even more rapid growth in luminance in developing nations undergoing rapid electrification.",
    /* B */ "Ecologists have documented the impacts of artificial light at night (ALAN) across virtually every animal phylum. Sea turtle hatchlings, guided by the faint glow of moonlight reflected on ocean waves, crawl towards the brightest light source visible — which on urbanised coastlines is typically an inland road or a hotel complex. Disoriented, they die of dehydration or are struck by vehicles before reaching the sea. Migratory birds navigate by the stars and become fatally confused by illuminated buildings and communication towers; an estimated one billion birds die each year in North America alone from collisions with lit structures. Insects, which constitute the base of most terrestrial food chains, are known to gather around artificial light sources, disrupting their natural feeding, mating, and pollination behaviours.",
    /* C */ "For humans, the health consequences of nocturnal light exposure are increasingly well-documented. Light perceived through the eyes — even at relatively low intensities — suppresses the production of melatonin, a hormone produced by the pineal gland that regulates the circadian rhythm, the body's internal 24-hour biological clock. Disruption to the circadian system has been linked to elevated risks of several serious health conditions including obesity, type 2 diabetes, cardiovascular disease, and certain cancers. Shift workers, who face chronic circadian disruption as a function of their work schedules, have been found to have significantly higher rates of breast and prostate cancer, a finding that has led the International Agency for Research on Cancer to classify overnight shift work as a 'probable carcinogen'.",
    /* D */ "The technological composition of light pollution has shifted significantly in recent years. The widespread adoption of light-emitting diode (LED) lighting, hailed as an energy-saving revolution, has produced an unexpected paradox. LED lights are far more efficient than their incandescent or fluorescent predecessors, dramatically reducing the energy required to produce a given amount of light. Yet this efficiency gain has in many cases been offset — or more than offset — by a phenomenon called the Jevons paradox: reduced operational costs lead to increased deployment of lighting, so that the total light output from a city may grow even as the energy efficiency per unit improves. Moreover, early LED street lights emitted disproportionately high levels of short-wavelength 'blue' light, which is particularly effective at suppressing melatonin and at scattering in the atmosphere, worsening skyglow.",
    /* E */ "Solutions exist and are increasingly being adopted. Astronomers and wildlife organisations have long advocated for 'dark sky' policies — regulations requiring lights to be shielded, directed downward, and limited in brightness and colour temperature. The International Dark-Sky Association certifies communities and natural areas that meet stringent standards of lighting practice. Redesigned LED fixtures that emit warm, amber-tinted light rather than blue-white light can dramatically reduce biological impacts while maintaining adequate visibility. Motion-activated lighting and smart grid systems that dim or extinguish street lights during hours of minimal pedestrian activity offer further means of reducing unnecessary illumination. The key insight is that effective light management is not about eliminating light but about applying it with precision.",
    /* F */ "The cultural dimension of light pollution should not be underestimated. The disappearance of the night sky from the lived experience of urban populations has severed a connection to the natural world that shaped human culture for millennia. Astronomers have noted that an entire generation has grown up without ever having seen a truly dark sky; for many urban children, the Milky Way is an abstraction encountered only in photographs. Dark sky parks and reserves — protected areas where light pollution is actively managed — serve not only ecological and scientific purposes but also an increasingly valued recreational and educational function, providing communities with a tangible connection to the wider universe.",
  ],
  questions: [
    {
      id: 1, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(1), text: "More than one third of the global population is unable to see the Milky Way from their location.", answer: "True" },
        { id: Q(2), text: "Sea turtle hatchlings are naturally attracted to the brightest visible light source.", answer: "True" },
        { id: Q(3), text: "The adoption of LED technology has consistently reduced the total amount of light emitted by cities.", answer: "False" },
        { id: Q(4), text: "The International Agency for Research on Cancer has classified overnight shift work as a probable cause of cancer.", answer: "True" },
        { id: Q(5), text: "The International Dark-Sky Association was established primarily to protect the economic interests of telescope manufacturers.", answer: "Not Given" },
      ],
    },
    {
      id: 2, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(6),  text: "An explanation of why improving the energy efficiency of lighting does not necessarily reduce total light output.", answer: "D" },
        { id: Q(7),  text: "A description of how light pollution affects the behaviour of multiple animal species.", answer: "B" },
        { id: Q(8),  text: "An argument that the loss of night sky visibility has cultural and educational consequences.", answer: "F" },
        { id: Q(9),  text: "A list of practical technological and regulatory measures to reduce light pollution.", answer: "E" },
      ],
    },
    {
      id: 3, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(10), text: "What does the Jevons paradox, as described in the passage, refer to in the context of LED lighting?",
          answer: "C",
          options: [
            { value: "A", label: "The tendency of LED lights to fail more quickly than conventional lighting." },
            { value: "B", label: "The discovery that LED light is more harmful to wildlife than incandescent light." },
            { value: "C", label: "The situation where efficiency gains lead to greater overall consumption of a resource." },
            { value: "D", label: "The observation that LED lighting is too expensive for developing countries." },
          ],
        },
        {
          id: Q(11), text: "What is the writer's main point in paragraph E?",
          answer: "C",
          options: [
            { value: "A", label: "All artificial lighting should be eliminated to protect wildlife and human health." },
            { value: "B", label: "Only astronomers and wildlife organisations are taking meaningful action on light pollution." },
            { value: "C", label: "Targeted, well-designed lighting can meet practical needs while minimising environmental harm." },
            { value: "D", label: "Smart lighting systems are too expensive to be viable in most cities." },
          ],
        },
        {
          id: Q(12), text: "What type of light from early LED street lights was particularly problematic?",
          answer: "B",
          options: [
            { value: "A", label: "Red-spectrum light that disrupted bird navigation." },
            { value: "B", label: "Short-wavelength blue light that suppressed melatonin and increased skyglow." },
            { value: "C", label: "Amber-tinted warm light that caused confusion in nocturnal animals." },
            { value: "D", label: "Ultraviolet light harmful to insect populations." },
          ],
        },
        {
          id: Q(13), text: "What does the passage suggest about the overall trend in global artificial outdoor lighting?",
          answer: "C",
          options: [
            { value: "A", label: "It is decreasing in developed nations but increasing in developing ones." },
            { value: "B", label: "It is stable overall, with some regions increasing while others decrease." },
            { value: "C", label: "It continues to increase year on year worldwide, including rapidly in some developing nations." },
            { value: "D", label: "It has been falling since the introduction of LED technology." },
          ],
        },
      ],
    },
  ],
};

const T2P2: Passage = {
  title: "The Psychology of Money",
  subtitle: "Reading Passage 2 · Questions 14–26",
  firstQ: 14, lastQ: 26,
  paragraphs: [
    /* A */ "Standard economic theory rests on the assumption that individuals are rational agents who process financial information consistently and make decisions that maximise their long-term wellbeing. Decades of research in behavioural economics and cognitive psychology have comprehensively undermined this assumption. Human beings are subject to a rich catalogue of systematic biases and heuristics that cause them to behave in ways that depart predictably from rational economic models — and understanding these tendencies has become a priority for policymakers, financial institutions, and public health authorities alike.",
    /* B */ "One of the most robust and counterintuitive findings is that people feel the psychological pain of a financial loss roughly twice as intensely as they feel the pleasure of an equivalent gain — a phenomenon termed 'loss aversion', first described by Daniel Kahneman and Amos Tversky in their landmark 1979 paper introducing Prospect Theory. Loss aversion explains a wide range of otherwise puzzling behaviours: why investors hold onto declining stocks far longer than is rational, why homeowners refuse to sell at a price below what they originally paid even when market conditions have fundamentally changed, and why insurance products are often purchased even when their expected value is negative.",
    /* C */ "Closely related is the concept of 'mental accounting' — the tendency of individuals to organise and evaluate financial outcomes in separate mental 'accounts' rather than treating all money as fungible. People routinely behave differently towards money depending on its perceived origin and intended use: a tax refund may be spent freely on a luxury item even by someone who would never consider withdrawing the same sum from their savings to make the same purchase. Casinos have long exploited this tendency by converting currency into chips, which research suggests are experienced psychologically as less 'real' than banknotes, lowering the psychological threshold for spending.",
    /* D */ "The 'anchoring effect' exerts a powerful and frequently exploited influence on financial decisions. When presented with an initial numerical value — however arbitrary — people's subsequent judgements tend to cluster around that figure. Salary negotiations, real estate valuations, and retail pricing strategies all deliberately leverage this effect. A property listed at a high initial price will tend to attract higher final sale prices, on average, than a comparable property listed more modestly, even when buyers are sophisticated market participants who believe they are immune to such effects. Experimental studies have shown that anchoring can occur even when the initial value is demonstrably random — generated by spinning a wheel, for instance — suggesting that the bias operates below the level of conscious deliberation.",
    /* E */ "Perhaps the most widely cited distinction in behavioural economics is the one drawn between System 1 and System 2 thinking, popularised by Kahneman in his 2011 book Thinking, Fast and Slow. System 1 refers to fast, automatic, emotional, and heuristic-driven cognitive processing, while System 2 refers to slow, deliberate, effortful, and logical reasoning. The vast majority of everyday financial micro-decisions — whether to buy the prominently displayed item at the checkout, whether to add the extended warranty to a new appliance — are made through System 1. Retailers, advertisers, and financial product designers invest enormous resources in understanding and exploiting System 1 processing to influence consumer behaviour.",
    /* F */ "The practical implications of behavioural economics have been most influentially developed through 'nudge theory', associated primarily with Richard Thaler and Cass Sunstein. Rather than attempting to correct biases through education or imposing restrictions on choice, the nudge approach advocates redesigning the architecture of decision-making environments so that the default option — the outcome that occurs if a person takes no active decision — is the one that best serves their long-term interests. Automatically enrolling employees in pension savings schemes, with the option to opt out rather than opt in, has dramatically increased retirement savings participation rates in multiple countries. Critics, however, have raised concerns about the paternalistic implications of institutions designing environments to steer behaviour, and have questioned whether nudges can achieve meaningful structural change in financial systems characterised by profound inequality.",
  ],
  questions: [
    {
      id: 1, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — The irrationality of standard economic assumptions" },
        { value: "ii",  label: "ii — Loss aversion and its behavioural consequences" },
        { value: "iii", label: "iii — How initial figures distort financial judgements" },
        { value: "iv",  label: "iv — Treating money differently based on its source or purpose" },
        { value: "v",   label: "v — Using default settings to encourage better financial decisions" },
        { value: "vi",  label: "vi — Fast versus slow thinking in financial choices" },
      ],
      items: [
        { id: Q(14), text: "Paragraph A", answer: "i" },
        { id: Q(15), text: "Paragraph B", answer: "ii" },
        { id: Q(16), text: "Paragraph C", answer: "iv" },
        { id: Q(17), text: "Paragraph D", answer: "iii" },
        { id: Q(18), text: "Paragraph E", answer: "vi" },
        { id: Q(19), text: "Paragraph F", answer: "v" },
      ],
    },
    {
      id: 2, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(20), text: "According to loss aversion research, people experience gains and losses with roughly equal emotional intensity.", answer: "False" },
        { id: Q(21), text: "Casino chips may reduce the psychological significance of spending compared to cash.", answer: "True" },
        { id: Q(22), text: "The anchoring effect only operates when the initial value is relevant and credible.", answer: "False" },
        { id: Q(23), text: "Most everyday financial decisions are made through slow, deliberate System 2 reasoning.", answer: "False" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(24), text: "Kahneman and Tversky's 1979 paper introduced a framework for understanding financial decision-making called __________ Theory.", answer: "Prospect" },
        { id: Q(25), text: "The tendency to treat money differently depending on where it came from is known as __________ accounting.", answer: "mental" },
        { id: Q(26), text: "Nudge theory works by redesigning the __________ of decision-making environments so beneficial choices become the default.", answer: "architecture" },
      ],
    },
  ],
};

const T2P3: Passage = {
  title: "Vertical Farming: Growing Up",
  subtitle: "Reading Passage 3 · Questions 27–40",
  firstQ: 27, lastQ: 40,
  paragraphs: [
    /* A */ "In a repurposed warehouse on the outskirts of Newark, New Jersey, lettuce grows in towering racks bathed in the pink-purple glow of LED lights, never touched by natural sunlight or rainfall. This is vertical farming — the practice of cultivating crops in stacked, climate-controlled layers inside urban buildings. Once confined to experimental greenhouses and research laboratories, the technology has attracted billions of dollars of venture capital investment and is rapidly reshaping assumptions about where and how food can be produced. By 2025, the global vertical farming market was estimated at over seven billion US dollars, with industry analysts projecting a fivefold expansion by the end of the decade.",
    /* B */ "At the core of vertical farming technology are three interlocking systems: precise LED lighting calibrated to the specific light spectrum optimal for each crop variety; hydroponic or aeroponic nutrient delivery, which bathes or mists plant roots directly in nutrient-rich water rather than soil; and sealed environmental control systems that regulate temperature, humidity, and CO₂ concentration independently of outdoor conditions. The elimination of soil removes not only conventional pest habitats but also the spatial constraints of horizontal agriculture, allowing production to be stacked vertically in buildings with floor-to-ceiling growing racks. Yields per square metre of floor space can exceed those of conventional field farming by a factor of ten or more for certain crops.",
    /* C */ "The advantages of vertical farming over conventional outdoor agriculture are considerable. Because production occurs in sealed, controlled environments, vertical farms can use between seventy and ninety-five percent less water than field farming through closed-loop recirculation systems, eliminate the need for pesticides and herbicides, and produce fresh crops year-round regardless of weather or season. The proximity of urban vertical farms to consumers reduces food miles — the distance food travels from producer to consumer — and the associated carbon emissions and refrigeration requirements. For high-value crops such as salad greens, herbs, and strawberries, the economics are already commercially viable without subsidies in some markets.",
    /* D */ "The most persistent challenge facing vertical farming is energy consumption. Replacing sunlight with artificial LED lighting is enormously costly in energy terms. A 2021 study by Cornell University found that the energy required to grow one head of lettuce in a vertical farm produced five times more carbon dioxide than growing the same lettuce in a conventional greenhouse, and approximately twice as much as field-grown lettuce when accounting for typical electricity grid emissions. Proponents argue that this calculation will change dramatically as electricity grids decarbonise and renewable energy costs continue to fall — but critics point out that vertical farms currently remain dependent on largely fossil-fuel-powered electricity infrastructure in most markets.",
    /* E */ "Beyond leafy vegetables and herbs, advocates argue that vertical farming could play a critical role in global food security. Climate change is reducing the reliability of rainfall across large agricultural regions, and the expansion of arid and semi-arid zones is forecast to shrink global arable land. Countries with limited agricultural territory — Japan, Singapore, and the Netherlands — have been early adopters of controlled-environment agriculture for precisely this reason. In conflict zones or regions affected by prolonged drought, portable modular vertical farm units have been proposed and piloted as a means of providing fresh produce where conventional supply chains have broken down.",
    /* F */ "Despite sustained investment and genuine technological progress, vertical farming faces significant economic obstacles to large-scale adoption. High capital costs for construction and specialised equipment, ongoing energy expenses, and the current technological limitation to a relatively narrow range of crops restrict the commercial case. Staple crops such as wheat, maize, and rice — which together provide the majority of human caloric intake globally — have not been successfully scaled in vertical farm environments due to their light requirements and yield economics. Whether vertical farming can transition from a premium urban niche to a mainstream pillar of global food supply depends heavily on energy cost trajectories and continued technological innovation.",
  ],
  questions: [
    {
      id: 1, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — An overview of the core enabling technologies" },
        { value: "ii",  label: "ii — Origins and the scale of investment" },
        { value: "iii", label: "iii — Water savings and operational advantages" },
        { value: "iv",  label: "iv — The economic constraints on wider adoption" },
        { value: "v",   label: "v — Energy use as a fundamental limitation" },
        { value: "vi",  label: "vi — Applications in food-insecure contexts" },
      ],
      items: [
        { id: Q(27), text: "Paragraph A", answer: "ii" },
        { id: Q(28), text: "Paragraph B", answer: "i" },
        { id: Q(29), text: "Paragraph C", answer: "iii" },
        { id: Q(30), text: "Paragraph D", answer: "v" },
        { id: Q(31), text: "Paragraph E", answer: "vi" },
        { id: Q(32), text: "Paragraph F", answer: "iv" },
      ],
    },
    {
      id: 2, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(33), text: "Vertical farms can produce yields more than ten times greater per floor area than conventional farms for some crops.", answer: "True" },
        { id: Q(34), text: "The energy consumed by vertical farms currently produces less carbon dioxide than conventional greenhouse production for equivalent crops.", answer: "False" },
        { id: Q(35), text: "Japan and Singapore have adopted controlled-environment agriculture partly because of their limited agricultural land.", answer: "True" },
        { id: Q(36), text: "Vertical farms are currently capable of producing most staple crops economically at commercial scale.", answer: "False" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(37), text: "Vertical farms deliver nutrients directly to plant roots through hydroponic or __________ systems, eliminating the need for soil.", answer: "aeroponic" },
        { id: Q(38), text: "The distance food travels from producer to consumer is known as __________.", answer: "food miles" },
        { id: Q(39), text: "A Cornell University study found that growing lettuce in a vertical farm produced __________ times more CO₂ than conventional greenhouse production.", answer: "five" },
        { id: Q(40), text: "Crops such as wheat, maize, and rice have not been scaled in vertical farms due to their __________ requirements and yield economics.", answer: "light" },
      ],
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TEST 3
// ══════════════════════════════════════════════════════════════════════════════
const T3P1: Passage = {
  title: "Ocean Acidification: The Other CO₂ Problem",
  subtitle: "Reading Passage 1 · Questions 1–13",
  firstQ: 1, lastQ: 13,
  paragraphs: [
    /* A */ "As global attention has focused on the atmospheric warming effects of carbon dioxide emissions, a parallel and equally serious consequence has received comparatively little public notice. Since the Industrial Revolution, the world's oceans have absorbed approximately thirty percent of all CO₂ emitted by human activities, buffering the rate of atmospheric warming but in doing so undergoing a profound chemical transformation. The average pH of surface seawater has fallen from 8.2 to approximately 8.1 since pre-industrial times — a shift that, while small in absolute terms, represents a thirty percent increase in hydrogen ion concentration and a fundamental alteration of the ocean's chemical equilibrium.",
    /* B */ "When CO₂ dissolves in seawater, it reacts with water to form carbonic acid, which subsequently dissociates to release bicarbonate ions and hydrogen ions. The increase in hydrogen ion concentration reduces the availability of carbonate ions — the building blocks that marine organisms use to construct calcium carbonate shells and skeletons. This process does not dissolve existing shells outright but prevents new shell material from being deposited as rapidly, weakening structures and slowing growth. At sufficiently low pH levels, calcium carbonate structures actively dissolve — a threshold that deep ocean regions have in some cases already reached.",
    /* C */ "The organisms most immediately threatened by ocean acidification are those that rely on calcium carbonate structures: corals, oysters, mussels, sea urchins, and the pteropods — tiny free-swimming snails — that form a critical link in polar marine food webs. Laboratory studies have consistently demonstrated that many of these species show reduced calcification rates, thinner shells, deformed larvae, and impaired reproductive success under conditions simulating projected mid-century ocean chemistry. The economic implications are severe: shellfish aquaculture and coral reef tourism together generate hundreds of billions of dollars annually and support the livelihoods of hundreds of millions of coastal people worldwide.",
    /* D */ "The effects of acidification are not confined to shell-forming organisms. Some fish species have exhibited disrupted sensory processing — including impaired ability to detect and avoid predators — under elevated CO₂ conditions, though the robustness of these findings across species and experimental settings has been debated. Seagrasses and certain macroalgae, by contrast, may benefit from increased CO₂ availability, as it can enhance photosynthesis, suggesting that acidification will produce winners as well as losers and that ecosystem responses will be complex and non-linear.",
    /* E */ "Ocean acidification does not act in isolation. It compounds the stress on marine ecosystems already experiencing warming temperatures, declining oxygen levels, and altered circulation patterns driven by climate change. Coral reefs, for instance, face simultaneous threats from thermal bleaching events — which have increased dramatically in frequency — and the chemical erosion associated with acidification, creating a combined assault that many scientists believe will make functioning tropical coral reef ecosystems essentially untenable by mid-century under high-emission scenarios.",
    /* F */ "Addressing ocean acidification ultimately requires reducing CO₂ emissions at source, since the oceans' chemical state mirrors atmospheric composition over time. In the shorter term, researchers are investigating localised interventions including alkalinity enhancement — adding alkaline minerals to seawater to raise its pH — and the selective breeding or genetic engineering of acidification-tolerant shellfish and coral strains. Marine protected areas that reduce additional stressors such as overfishing and nutrient pollution may also enhance the resilience of marine ecosystems to acidification, buying time while systemic mitigation efforts take effect.",
  ],
  questions: [
    {
      id: 1, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(1), text: "An explanation of the chemical reaction by which dissolved CO₂ reduces the availability of carbonate ions in seawater.", answer: "B" },
        { id: Q(2), text: "A description of research into localised measures that could protect marine environments while emissions are reduced.", answer: "F" },
        { id: Q(3), text: "A reference to the economic value of industries that depend on healthy ocean chemistry.", answer: "C" },
        { id: Q(4), text: "Evidence that not all marine organisms are negatively affected by increased CO₂ levels.", answer: "D" },
        { id: Q(5), text: "An explanation of how ocean acidification interacts with other effects of climate change to threaten coral reefs.", answer: "E" },
      ],
    },
    {
      id: 2, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(6), text: "Ocean pH has fallen by approximately 30 percent since pre-industrial times.", answer: "False" },
        { id: Q(7), text: "Pteropods play an important role in the food webs of polar marine environments.", answer: "True" },
        { id: Q(8), text: "All fish species studied show impaired predator avoidance under elevated CO₂ conditions.", answer: "False" },
        { id: Q(9), text: "The world's oceans have absorbed roughly one third of all human-produced CO₂ emissions.", answer: "True" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(10), text: "The measure of the concentration of hydrogen ions in seawater is expressed as its __________.", answer: "pH" },
        { id: Q(11), text: "When CO₂ dissolves in seawater, it first forms __________, which then breaks down to release hydrogen ions.", answer: "carbonic acid" },
        { id: Q(12), text: "One proposed short-term intervention to counter acidification involves adding alkaline minerals to seawater in a process called __________ enhancement.", answer: "alkalinity" },
        { id: Q(13), text: "Marine zones that exclude overfishing and reduce nutrient pollution are known as __________ areas.", answer: "marine protected" },
      ],
    },
  ],
};

const T3P2: Passage = {
  title: "The Digital Divide: Inequality in the Information Age",
  subtitle: "Reading Passage 2 · Questions 14–26",
  firstQ: 14, lastQ: 26,
  paragraphs: [
    /* A */ "When the internet was first commercialised in the 1990s, its most enthusiastic advocates predicted that it would become the great equaliser — a technology that would dissolve geographic, economic, and social barriers to information, education, and opportunity. Three decades on, the digital divide — the gap between those with meaningful access to digital technologies and those without — remains one of the most persistent forms of inequality in contemporary societies. Researchers now distinguish between a first-level divide concerning physical access to devices and connectivity, a second-level divide relating to the skills required to use technology effectively, and an emerging third-level divide concerning the differential ability to translate digital engagement into tangible social and economic benefits.",
    /* B */ "At the global level, disparities in internet access remain stark. As of 2024, approximately 2.6 billion people worldwide — predominantly in sub-Saharan Africa, South Asia, and rural areas across Latin America — remained entirely offline. Mobile connectivity has dramatically narrowed the access gap in many regions over the past decade, with smartphones providing first-time internet access to hundreds of millions of people. Yet mobile internet — typically slower, less reliable, and restricted by data cost constraints — frequently delivers a significantly inferior experience compared to the high-speed fixed broadband that underpins economic productivity and educational attainment in wealthier societies.",
    /* C */ "Within economically developed nations, the digital divide manifests along lines of age, income, disability, and geography that are less visible but equally consequential. Older adults consistently show lower rates of internet use and digital skills than younger cohorts, making them more vulnerable to exclusion as public services, banking, healthcare, and social connection migrate online. Low-income households are disproportionately reliant on mobile-only internet access, with the limitations this imposes particularly acute for children attempting remote schooling. Rural communities across Europe, North America, and Australia continue to face inadequate broadband infrastructure, a problem that became acutely visible during the COVID-19 pandemic when the assumption of universal connectivity proved dramatically false.",
    /* D */ "The consequences of digital exclusion are both immediate and long-term. In education, students without reliable home internet access are systematically disadvantaged in their academic achievement and in developing the digital literacy skills that employers increasingly regard as essential. In employment, the migration of job vacancies, application processes, and professional development opportunities to online platforms creates structural barriers for those without digital skills or access. In healthcare, the rapid expansion of digital appointment booking, patient portals, and telemedicine risks creating a two-tier system that disadvantages precisely the populations — elderly, low-income, disabled — that typically have the highest healthcare needs.",
    /* E */ "Government responses to the digital divide have encompassed a range of interventions. Publicly subsidised broadband rollout programmes, such as the UK's Project Gigabit and the US Broadband Equity, Access, and Deployment (BEAD) programme, aim to extend infrastructure to underserved areas. Device lending schemes, digital skills training programmes in libraries and community centres, and discounted internet tariffs for low-income households seek to address second-level barriers. Critics argue, however, that the pace of infrastructure investment has consistently lagged behind the rate at which essential services migrate online, leaving a persistent structural gap.",
    /* F */ "The emergence of artificial intelligence-driven services and the anticipated rollout of 5G networks and Internet of Things devices threaten to open a new front in digital inequality. As AI-powered tools become central to productivity, healthcare diagnostics, educational personalisation, and civic engagement, those who lack the devices, connectivity, and skills to access and operate these systems risk a qualitatively new form of exclusion. Some researchers argue that addressing the digital divide is no longer merely a matter of equity but of democratic participation itself — that meaningful citizenship in an increasingly digital society requires digital access and literacy as fundamental as the ability to read and write.",
  ],
  questions: [
    {
      id: 1, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — Global gaps in internet access and quality" },
        { value: "ii",  label: "ii — Digital inequality within wealthy nations" },
        { value: "iii", label: "iii — New technologies threaten to deepen existing divides" },
        { value: "iv",  label: "iv — Three dimensions of digital inequality and its origins" },
        { value: "v",   label: "v — Government policies and their limitations" },
        { value: "vi",  label: "vi — The consequences of digital exclusion for education and employment" },
      ],
      items: [
        { id: Q(14), text: "Paragraph A", answer: "iv" },
        { id: Q(15), text: "Paragraph B", answer: "i" },
        { id: Q(16), text: "Paragraph C", answer: "ii" },
        { id: Q(17), text: "Paragraph D", answer: "vi" },
        { id: Q(18), text: "Paragraph E", answer: "v" },
        { id: Q(19), text: "Paragraph F", answer: "iii" },
      ],
    },
    {
      id: 2, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(20), text: "What limitation of mobile internet access does the writer highlight in paragraph B?",
          answer: "C",
          options: [
            { value: "A", label: "Mobile internet is unavailable in most sub-Saharan African countries." },
            { value: "B", label: "Mobile internet has made the global access gap worse, not better." },
            { value: "C", label: "Mobile internet is typically slower, less reliable, and constrained by data costs." },
            { value: "D", label: "Mobile internet only provides access to social media, not educational content." },
          ],
        },
        {
          id: Q(21), text: "According to paragraph C, which group was particularly disadvantaged by inadequate connectivity during the COVID-19 pandemic?",
          answer: "B",
          options: [
            { value: "A", label: "Young professionals working from home in urban areas." },
            { value: "B", label: "Children in rural and low-income households attempting remote schooling." },
            { value: "C", label: "Government employees accessing public service platforms." },
            { value: "D", label: "Elderly users who were unfamiliar with smartphone technology." },
          ],
        },
        {
          id: Q(22), text: "What does the writer suggest about government responses to the digital divide in paragraph E?",
          answer: "D",
          options: [
            { value: "A", label: "They have been entirely ineffective and should be abandoned." },
            { value: "B", label: "They have focused exclusively on building physical infrastructure." },
            { value: "C", label: "They have successfully eliminated the digital divide in developed nations." },
            { value: "D", label: "Infrastructure investment has not kept pace with the migration of essential services online." },
          ],
        },
      ],
    },
    {
      id: 3, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(23), text: "Researchers now identify three distinct levels of digital divide.", answer: "True" },
        { id: Q(24), text: "Approximately 2.6 billion people worldwide had no internet access as of 2024.", answer: "True" },
        { id: Q(25), text: "Older adults in developed nations have higher rates of digital skills than younger people.", answer: "False" },
        { id: Q(26), text: "The writer suggests that digital access and literacy may be as fundamental to modern citizenship as reading and writing.", answer: "True" },
      ],
    },
  ],
};

const T3P3: Passage = {
  title: "Universal Basic Income: An Idea Whose Time Has Come?",
  subtitle: "Reading Passage 3 · Questions 27–40",
  firstQ: 27, lastQ: 40,
  paragraphs: [
    /* A */ "The idea of providing every citizen with an unconditional regular cash payment from the state — regardless of employment status, income, or willingness to work — has a philosophical lineage stretching back centuries. Thomas Paine advocated a form of citizen's dividend in 1797; philosopher and economist Milton Friedman proposed a 'negative income tax' delivering a minimum income to all in 1962; and in the 1960s and 1970s, a series of guaranteed income experiments in the United States and Canada produced intriguing but ultimately inconclusive data. The concept — variously termed Universal Basic Income, Basic Income Guarantee, or Unconditional Basic Income — remained on the academic margins for decades before being dramatically revived in the 2010s.",
    /* B */ "The revival was driven by converging anxieties about the future of work. The rapid expansion of artificial intelligence and automation raised fears that technological unemployment might displace workers from routine cognitive as well as manual tasks faster than labour markets could adapt. These concerns lent urgency to proposals for an income floor that would decouple economic security from employment. A series of high-profile pilot programmes attracted global attention: Finland's two-year experiment provided 2,000 unemployed individuals with €560 per month unconditionally; the city of Stockton, California provided 125 low-income residents with $500 monthly for 24 months; and GiveDirectly's programme in rural Kenya provided direct cash transfers to thousands of village households over a decade.",
    /* C */ "Economists supporting UBI argue that it would eliminate the poverty trap embedded in means-tested welfare systems — the counterproductive situation in which people lose benefits as their earnings rise, creating powerful disincentives to take up low-paid work. A universal payment requires no means testing, reduces bureaucratic overhead, and would automatically support people through the increasingly frequent transitions between employment, retraining, and entrepreneurship that characterise modern labour markets. Supporters further argue that UBI would recognise and compensate economically invisible unpaid work — including caring for children or elderly relatives — that is essential to social functioning but currently receives no direct economic recognition.",
    /* D */ "Critics, however, raise powerful objections. The fiscal cost of a genuinely universal and meaningful payment is enormous: paying every adult in the UK a basic income of £12,000 per year would cost approximately £600 billion annually, comparable to the entire existing government budget. Funding such a scheme without substantial redistribution or the abolition of existing welfare provisions would require tax increases that many economists regard as economically damaging. Some opponents argue that an unconditional income would reduce the incentive to work, lowering labour supply and potentially increasing inflation. Others contend that targeted, means-tested interventions are a more efficient use of limited public resources.",
    /* E */ "Empirical evidence from pilot programmes has been largely positive but limited in scope and generalisability. The Finnish experiment found that recipients reported significantly better wellbeing, greater trust in social institutions, and marginally improved employment outcomes compared to control groups. The Stockton programme showed participants were more likely to find full-time employment than their counterparts who did not receive payments. Critics note, however, that small-scale, time-limited trials cannot replicate the macroeconomic effects — particularly on inflation and labour supply — that would accompany a genuine national implementation, and that the positive effects observed may partly reflect the novelty or selectivity of participation.",
    /* F */ "The debate over Universal Basic Income ultimately reflects deeper disagreements about the proper relationship between the state, the individual, and the labour market. Proponents see it as a recognition of human dignity — a guarantee of material security as a civic right — while opponents worry that it represents an unsustainable expansion of state provision that undermines the social value of work and personal responsibility. As automation continues to reshape labour markets, and as the limitations of existing social safety nets become more apparent, the case for reconsidering the architecture of income support is likely to grow, even if the precise form that support should take remains genuinely contested.",
  ],
  questions: [
    {
      id: 1, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(27), text: "According to paragraph A, which of the following best describes the history of UBI?",
          answer: "C",
          options: [
            { value: "A", label: "It was a 21st-century idea inspired by concerns about AI and automation." },
            { value: "B", label: "It was universally rejected by economists in the 20th century." },
            { value: "C", label: "It has historical roots but was revived in recent decades by new economic anxieties." },
            { value: "D", label: "It was first proposed in the 2010s by Milton Friedman." },
          ],
        },
        {
          id: Q(28), text: "What is the 'poverty trap', as described in paragraph C?",
          answer: "B",
          options: [
            { value: "A", label: "A situation where UBI payments are too small to lift people out of poverty." },
            { value: "B", label: "A situation where people lose welfare benefits as earnings rise, discouraging them from working." },
            { value: "C", label: "A system where benefits are reduced for those who refuse employment." },
            { value: "D", label: "A bureaucratic barrier that prevents eligible people from claiming welfare support." },
          ],
        },
        {
          id: Q(29), text: "What does the passage say about evidence from UBI pilot programmes?",
          answer: "D",
          options: [
            { value: "A", label: "All pilots showed participants were less likely to find employment after receiving payments." },
            { value: "B", label: "The Finnish experiment showed no meaningful difference in wellbeing between recipients and controls." },
            { value: "C", label: "Pilot programmes provide definitive evidence about the macroeconomic effects of national UBI." },
            { value: "D", label: "Results have generally been positive but small trials cannot replicate the effects of national-scale implementation." },
          ],
        },
        {
          id: Q(30), text: "According to paragraph D, what is one key fiscal concern about implementing a genuine UBI in the UK?",
          answer: "A",
          options: [
            { value: "A", label: "The annual cost could equal the entire existing government budget." },
            { value: "B", label: "The existing welfare system would need to be doubled in size." },
            { value: "C", label: "A UBI would only be affordable if all other public spending were abolished." },
            { value: "D", label: "Funding a UBI would require borrowing that most economists consider unsustainable." },
          ],
        },
      ],
    },
    {
      id: 2, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(31), text: "A description of how UBI would support people during job transitions and recognise unpaid work.", answer: "C" },
        { id: Q(32), text: "An account of three specific UBI pilot programmes and what they provided to participants.", answer: "B" },
        { id: Q(33), text: "An argument that the UBI debate reflects fundamental disagreements about the state's role and the value of work.", answer: "F" },
        { id: Q(34), text: "Details of early historical proposals for a form of guaranteed citizen income.", answer: "A" },
      ],
    },
    {
      id: 3, type: "ynng",
      instruction: "Do the following statements agree with the views of the writer? Write YES, NO, or NOT GIVEN.",
      items: [
        { id: Q(35), text: "The writer believes the evidence from existing pilot programmes is sufficient to justify national UBI implementation.", answer: "Not Given" },
        { id: Q(36), text: "The writer suggests that the arguments against UBI are so strong that the idea should be abandoned.", answer: "No" },
        { id: Q(37), text: "The writer implies that as automation reshapes work, there will be increasing pressure to reconsider how income support is structured.", answer: "Yes" },
      ],
    },
    {
      id: 4, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(38), text: "The term used for the disincentive to work created by losing benefits as earnings rise is the __________ trap.", answer: "poverty" },
        { id: Q(39), text: "The Stockton UBI programme found that participants were more likely to find __________ employment than those who did not receive payments.", answer: "full-time" },
        { id: Q(40), text: "One argument for UBI is that it would compensate people for __________ work that is socially essential but economically invisible.", answer: "unpaid" },
      ],
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TEST 4
// ══════════════════════════════════════════════════════════════════════════════
const T4P1: Passage = {
  title: "Sleep and Memory: The Brain's Overnight Filing System",
  subtitle: "Reading Passage 1 · Questions 1–13",
  firstQ: 1, lastQ: 13,
  paragraphs: [
    /* A */ "For decades, sleep was regarded by neuroscientists as little more than a passive state of neural rest — necessary for the body but essentially a pause in the meaningful cognitive activity of waking life. This view has been thoroughly dismantled. Contemporary sleep science has established that sleep is not a suspension of brain function but an active, energetically demanding process during which the brain performs critical maintenance, consolidation, and reorganisation tasks that are impossible to achieve during wakefulness. Of these, the processing and long-term storage of memories has emerged as one of the most well-documented and consequential functions of sleep.",
    /* B */ "Sleep is not uniform. The brain cycles through distinct stages approximately every ninety minutes during a typical night of sleep. These stages are broadly divided into non-rapid eye movement (NREM) sleep — which itself encompasses three substages of increasing depth — and rapid eye movement (REM) sleep, characterised by vivid dreaming, near-complete muscle atonia, and patterns of neural activity that closely resemble those of the waking brain. Early in the night, sleep cycles are dominated by slow-wave NREM sleep, during which slow oscillations in the prefrontal cortex coordinate the 'replay' of recently encoded memories stored in the hippocampus. As the night progresses, REM sleep periods lengthen, and it is during REM sleep that the brain appears to integrate new memories with existing knowledge networks.",
    /* C */ "The hippocampus serves as the brain's short-term memory buffer, rapidly encoding experiences during wakefulness but lacking the storage capacity for long-term retention. Memory consolidation — the process by which fragile, recently formed memories are stabilised and transferred to the neocortex for long-term storage — occurs predominantly during sleep. This transfer is coordinated by a dialogue between hippocampal sharp-wave ripples, thalamocortical sleep spindles, and the slow oscillations of NREM sleep that together create a temporal structure supporting the replay and integration of memory traces. Research using electroencephalography and functional MRI has allowed scientists to observe this process in real time, confirming that information processed during wakefulness is literally re-processed during sleep.",
    /* D */ "Experimental evidence for the role of sleep in memory consolidation is extensive. Studies in which participants learn lists of words, motor skills, or spatial navigation tasks before sleep consistently show significantly better retention and performance the following day compared to participants tested after equivalent periods of wakefulness. Research on targeted memory reactivation — in which sounds or odours associated with specific learned material are re-presented during sleep, without waking the participant — shows that such cues can selectively strengthen the memories they were paired with. Perhaps most strikingly, studies have demonstrated that a ninety-minute afternoon nap can produce overnight-equivalent improvements in certain types of declarative memory, suggesting that the consolidation benefit is directly tied to the occurrence of sleep rather than simply the passage of time.",
    /* E */ "The consequences of insufficient sleep for memory and learning are correspondingly severe. A single night of total sleep deprivation reduces hippocampal activity during subsequent learning by approximately forty percent, impairs the brain's ability to encode new long-term memories, and produces cognitive deficits in attention, working memory, and executive function comparable to several days of sustained partial sleep restriction. Adolescents, who require more sleep than adults and who face cultural and educational pressures — including early school start times — that systematically reduce sleep duration, are among the most acutely affected. Longitudinal research has linked chronic sleep insufficiency in adolescence to measurable deficits in academic attainment and risk of developing anxiety and depressive disorders.",
    /* F */ "The implications for educational and workplace practice are substantial but have been slow to influence institutional behaviour. While the science of sleep and memory is now well established, school systems in many countries continue to operate on schedules that are misaligned with adolescent circadian biology, which predisposes teenagers to sleep later and wake later than adults. A growing body of research from schools and universities that have delayed start times documents consistent improvements in attendance, attentiveness, and academic outcomes. In professional contexts, the culture of regarding minimal sleep as a badge of productivity and commitment — prevalent in medicine, law, finance, and technology — runs directly counter to decades of evidence on the relationship between sleep and cognitive performance.",
  ],
  questions: [
    {
      id: 1, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — How memories are transferred from short-term to long-term storage during sleep" },
        { value: "ii",  label: "ii — Outdated views versus the modern understanding of sleep's purpose" },
        { value: "iii", label: "iii — The stages of sleep and their respective roles in memory processing" },
        { value: "iv",  label: "iv — Experimental evidence demonstrating sleep's role in memory consolidation" },
        { value: "v",   label: "v — The cognitive damage caused by inadequate sleep" },
        { value: "vi",  label: "vi — Slow institutional change despite strong scientific consensus" },
      ],
      items: [
        { id: Q(1), text: "Paragraph A", answer: "ii" },
        { id: Q(2), text: "Paragraph B", answer: "iii" },
        { id: Q(3), text: "Paragraph C", answer: "i" },
        { id: Q(4), text: "Paragraph D", answer: "iv" },
        { id: Q(5), text: "Paragraph E", answer: "v" },
        { id: Q(6), text: "Paragraph F", answer: "vi" },
      ],
    },
    {
      id: 2, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(7),  text: "Early in the night, REM sleep dominates the sleep cycle.", answer: "False" },
        { id: Q(8),  text: "The hippocampus has unlimited capacity for the long-term storage of memories.", answer: "False" },
        { id: Q(9),  text: "A 90-minute afternoon nap can produce improvements in certain types of declarative memory equivalent to a full night's sleep.", answer: "True" },
        { id: Q(10), text: "Research from schools with delayed start times has shown improvements in attendance and academic outcomes.", answer: "True" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(11), text: "The process by which recently formed memories are stabilised and transferred to the neocortex is called memory __________.", answer: "consolidation" },
        { id: Q(12), text: "A technique in which sounds or smells associated with learned material are replayed during sleep is called __________ memory reactivation.", answer: "targeted" },
        { id: Q(13), text: "A single night of total __________ deprivation can reduce the hippocampus's ability to encode new long-term memories by around forty percent.", answer: "sleep" },
      ],
    },
  ],
};

const T4P2: Passage = {
  title: "Fast Fashion: The True Cost of Cheap Clothes",
  subtitle: "Reading Passage 2 · Questions 14–26",
  firstQ: 14, lastQ: 26,
  paragraphs: [
    /* A */ "When a global fashion retailer can sell a summer dress for the equivalent of five US dollars, the supply chain that makes this possible depends on the precise coordination of raw material sourcing, textile manufacturing, logistics, and retail — typically distributed across a dozen or more countries. The 'fast fashion' model — characterised by rapid turnover of clothing styles, low prices, and vast production volumes — emerged in the 1990s and transformed the fashion industry from one producing two or four seasonal collections per year to one in which new styles may arrive in stores weekly or even daily. Global clothing production roughly doubled between 2000 and 2015, while the average number of times a garment is worn before disposal fell by more than a third.",
    /* B */ "The environmental consequences of this model are severe. The fashion industry is responsible for approximately eight to ten percent of global greenhouse gas emissions — more than the combined emissions of the international aviation and shipping industries. Cotton cultivation, the source of around a third of all textile fibres, is one of the most water-intensive agricultural processes on Earth: producing a single cotton t-shirt requires approximately 2,700 litres of water. Synthetic fibres — primarily polyester derived from petroleum — now constitute over sixty percent of all textiles produced, and every wash cycle releases hundreds of thousands of microscopic plastic fibres, known as microplastics, that pass through sewage treatment systems into rivers and oceans, where they have been detected in the tissues of marine organisms including fish and filter-feeding invertebrates.",
    /* C */ "The human cost of cheap clothing is equally troubling. The majority of garment manufacturing is concentrated in a small number of low-income countries — Bangladesh, Cambodia, Vietnam, India, and Ethiopia among them — where labour costs are minimal and regulatory enforcement is weak. Garment workers, of whom an estimated eighty percent are women, typically earn wages well below living wage thresholds, work in unsafe conditions, and have limited legal protection for organising collectively. The 2013 collapse of the Rana Plaza factory complex in Dhaka, Bangladesh — which killed 1,134 workers and injured more than 2,500 others — focused global attention on the structural safety failures endemic to the industry, but independent assessments suggest that building safety compliance across the sector remains inconsistent and inadequate.",
    /* D */ "Consumers in high-income countries have traditionally shown limited awareness of — and willingness to pay for — the social and environmental costs embedded in clothing prices. Research consistently shows a substantial gap between consumers' stated preferences for ethically and sustainably produced goods and their actual purchasing behaviour — a phenomenon psychologists call the 'intention-action gap'. Nonetheless, there are signs of shifting attitudes among younger consumers, for whom sustainability credentials have become an increasingly important factor in purchase decisions. The secondhand clothing market — driven partly by the growth of resale platforms such as Depop, ThredUp, and Vinted — has grown rapidly, with some analysts projecting that the secondhand market will surpass fast fashion in market size within the next decade.",
    /* E */ "The concept of a circular economy — one in which materials cycle through repeated use and recycling rather than following a linear 'make, use, dispose' trajectory — offers an alternative framework for the fashion industry. In a circular model, garments are designed for durability and repairability, manufactured from materials that can be effectively recycled or composted at end of life, and collected and processed through take-back schemes operated by brands or municipalities. Several large fashion companies have announced commitments to circular principles, and a small number of specialist firms now offer commercially viable garment-to-garment fibre recycling. Critics argue, however, that these initiatives remain marginal relative to the overall scale of production and that genuine circularity is incompatible with the fundamental logic of a business model premised on encouraging consumers to discard and replace clothing as rapidly as possible.",
    /* F */ "Regulatory pressure is beginning to mount. The European Union's Strategy for Sustainable and Circular Textiles, published in 2022, proposed mandatory minimum recycled content requirements for textiles, ecodesign regulations requiring garments to be durable and repairable, and extended producer responsibility schemes requiring brands to fund the collection and recycling of their products at end of life. In France, legislation passed in 2023 required fashion brands selling more than a threshold number of garments annually to pay a surcharge that increases progressively, with revenues directed towards the promotion of secondhand and repair services. Whether such national and regional measures can achieve meaningful change in an industry whose supply chains and sales are inherently global remains an open and contested question.",
  ],
  questions: [
    {
      id: 1, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(14), text: "According to paragraph A, what is one way fast fashion has changed the clothing industry since the 1990s?",
          answer: "C",
          options: [
            { value: "A", label: "Global clothing production has roughly halved since 2000." },
            { value: "B", label: "The number of times a garment is worn before disposal has increased significantly." },
            { value: "C", label: "The frequency of new styles arriving in stores has increased dramatically." },
            { value: "D", label: "The fashion industry has reduced to two seasonal collections per year." },
          ],
        },
        {
          id: Q(15), text: "According to paragraph B, what environmental problem is associated with synthetic textile fibres?",
          answer: "D",
          options: [
            { value: "A", label: "They require more water to produce than natural fibres such as cotton." },
            { value: "B", label: "They produce more greenhouse gases than cotton during manufacturing." },
            { value: "C", label: "They cannot be recycled or composted at end of life." },
            { value: "D", label: "Washing them releases microscopic plastic particles into water systems." },
          ],
        },
        {
          id: Q(16), text: "What does the writer mean by the 'intention-action gap' in paragraph D?",
          answer: "B",
          options: [
            { value: "A", label: "The difference between what fashion brands promise and what they deliver on sustainability." },
            { value: "B", label: "The gap between consumers' stated preferences for ethical goods and their actual buying habits." },
            { value: "C", label: "The delay between a consumer noticing a garment and deciding to purchase it." },
            { value: "D", label: "The discrepancy between the price consumers are willing to pay and actual production costs." },
          ],
        },
      ],
    },
    {
      id: 2, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(17), text: "A reference to a specific industrial disaster that highlighted safety failures in garment manufacturing.", answer: "C" },
        { id: Q(18), text: "A description of how regulatory requirements for fashion brands are being introduced in Europe.", answer: "F" },
        { id: Q(19), text: "An argument that circular economy commitments by fashion companies remain too small in scale to matter.", answer: "E" },
        { id: Q(20), text: "Evidence that the market for secondhand clothing is growing rapidly.", answer: "D" },
      ],
    },
    {
      id: 3, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(21), text: "The fashion industry's greenhouse gas emissions exceed the combined emissions of aviation and shipping.", answer: "True" },
        { id: Q(22), text: "Approximately eighty percent of garment workers in the industry are women.", answer: "True" },
        { id: Q(23), text: "All major fashion companies have committed to full circular economy principles by 2030.", answer: "Not Given" },
      ],
    },
    {
      id: 4, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(24), text: "Producing a single cotton __________ requires approximately 2,700 litres of water.", answer: "t-shirt" },
        { id: Q(25), text: "Plastic fibres released during washing are collectively known as __________.", answer: "microplastics" },
        { id: Q(26), text: "In a __________ model, garments are designed for durability and manufactured from recyclable materials.", answer: "circular" },
      ],
    },
  ],
};

const T4P3: Passage = {
  title: "Rewilding: Letting Nature Take Back Control",
  subtitle: "Reading Passage 3 · Questions 27–40",
  firstQ: 27, lastQ: 40,
  paragraphs: [
    /* A */ "In September 1995, fourteen grey wolves were reintroduced to Yellowstone National Park in Wyoming, USA, after a seventy-year absence. What followed has become one of the most cited case studies in modern ecology. Over the subsequent decades, the wolves' predatory pressure dramatically reduced the overgrazing behaviour of elk herds, allowing riparian vegetation — willows, aspens, and cottonwood trees — to recover along riverbanks that had been stripped bare. The root systems of this recovering vegetation stabilised stream banks, changed the course of rivers, and increased habitat complexity in ways that benefited dozens of species from beavers to songbirds. This phenomenon — the cascading ecological effects of reintroducing a top predator — became a foundational example of what is now called rewilding.",
    /* B */ "Rewilding is an approach to conservation that prioritises the restoration of natural processes and the reintroduction of missing species over the more traditional conservation goal of maintaining landscapes in a fixed historical state. Rather than intensively managing habitats to preserve a particular ecosystem composition, rewilding seeks to reduce human intervention, restore food webs, and allow ecological complexity to re-establish itself. The concept was formally developed in the 1990s by conservation biologist Michael Soulé and environmental writer Dave Foreman, who emphasised three principles: the restoration of large predators, the creation of large protected core areas, and the establishment of connectivity between them through wildlife corridors.",
    /* C */ "In Europe, rewilding efforts have been shaped by the continent's particular history of land use. With the exception of some remaining wilderness in the Carpathians and Scandinavia, most of Europe's land has been continuously farmed or otherwise managed for millennia. Large predators — wolves, lynx, brown bears, and wolverines — were extirpated from most of western and central Europe during the 18th and 19th centuries. Over recent decades, however, natural recolonisation — aided by legal protection and changing land use patterns driven by rural depopulation — has seen wolves return to Germany, France, Belgium, Denmark, and the Netherlands. Rewilding Europe, a non-governmental organisation founded in 2011, has supported the recovery of bison in Romania, wild horses in Portugal, and white-tailed eagles in Ireland.",
    /* D */ "The ecological benefits associated with rewilding extend well beyond the restoration of individual species. Healthy, complex ecosystems — with intact food webs, diverse plant communities, and abundant invertebrate populations — sequester carbon more effectively than degraded ones, providing a climate-relevant case for rewilding alongside its biodiversity rationale. Restored wetlands, in particular, have documented benefits for carbon storage, flood attenuation, and water purification. Research in the Scottish Highlands, where the rewilded Alladale Wilderness Reserve has been studied for over a decade, has documented significant increases in soil carbon and plant species diversity compared to adjacent intensively grazed land.",
    /* E */ "Opposition to rewilding, however, is significant and should not be dismissed. Farming communities in areas where wolves and bears have returned face real costs in livestock losses, and the psychological impact on farmers of predator presence — even where losses are compensated — is substantial and poorly acknowledged in policy discussions. Land ownership questions complicate rewilding in countries like Scotland, where large areas of upland are controlled by a small number of private estates. Critics also question the philosophical premise of rewilding: the idea of a 'natural' baseline to which ecosystems can be restored is contested, since all landscapes bear the imprint of millennia of human management, and the target state of a 'wild' ecosystem in Europe or North America is necessarily a construct.",
    /* F */ "Despite these challenges, rewilding has moved from the academic fringe to the mainstream of conservation policy. The EU's Biodiversity Strategy for 2030 committed to rewilding at least 10 percent of EU land and sea areas. The UK government's Environment Act 2021 included provisions for nature recovery networks and legally binding targets for biodiversity improvement. The growing recognition that the biodiversity crisis requires not merely the protection of surviving habitat fragments but the large-scale restoration of ecological function has made rewilding politically viable in ways that would have seemed implausible a generation ago. Whether implementation matches ambition, however, remains to be demonstrated.",
  ],
  questions: [
    {
      id: 1, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — The definition and founding principles of rewilding" },
        { value: "ii",  label: "ii — The wolf reintroduction to Yellowstone and its cascading effects" },
        { value: "iii", label: "iii — Carbon storage and other ecological services of rewilded landscapes" },
        { value: "iv",  label: "iv — European examples and the return of large predators" },
        { value: "v",   label: "v — Opposition from farming communities and philosophical critiques" },
        { value: "vi",  label: "vi — Policy momentum and the gap between ambition and implementation" },
      ],
      items: [
        { id: Q(27), text: "Paragraph A", answer: "ii" },
        { id: Q(28), text: "Paragraph B", answer: "i" },
        { id: Q(29), text: "Paragraph C", answer: "iv" },
        { id: Q(30), text: "Paragraph D", answer: "iii" },
        { id: Q(31), text: "Paragraph E", answer: "v" },
        { id: Q(32), text: "Paragraph F", answer: "vi" },
      ],
    },
    {
      id: 2, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(33), text: "What does the Yellowstone wolf reintroduction case study primarily illustrate?",
          answer: "B",
          options: [
            { value: "A", label: "How quickly wolves can recover from near-extinction when given legal protection." },
            { value: "B", label: "How reintroducing a top predator can produce ecological changes far beyond simply reducing prey populations." },
            { value: "C", label: "How river courses can be engineered using large predators to stabilise stream banks." },
            { value: "D", label: "How elk herds can coexist with wolves when grazing areas are carefully managed." },
          ],
        },
        {
          id: Q(34), text: "According to paragraph B, what distinguishes rewilding from traditional conservation approaches?",
          answer: "D",
          options: [
            { value: "A", label: "Rewilding focuses exclusively on the reintroduction of large predators." },
            { value: "B", label: "Rewilding aims to maintain landscapes in a historically accurate state." },
            { value: "C", label: "Rewilding excludes any human intervention in natural ecosystems." },
            { value: "D", label: "Rewilding prioritises restoring natural processes over preserving a fixed ecosystem state." },
          ],
        },
        {
          id: Q(35), text: "What does the writer suggest about opposition to rewilding in paragraph E?",
          answer: "C",
          options: [
            { value: "A", label: "Opposition from farmers is exaggerated and should be ignored by policymakers." },
            { value: "B", label: "The philosophical critiques of rewilding are more important than the practical objections." },
            { value: "C", label: "The concerns of farming communities are real and legitimate, even where financial compensation exists." },
            { value: "D", label: "Opposition to rewilding comes primarily from large landowners rather than farmers." },
          ],
        },
        {
          id: Q(36), text: "What is the writer's view of the current state of rewilding policy in paragraph F?",
          answer: "B",
          options: [
            { value: "A", label: "Policy ambitions have already been exceeded in practice in several EU countries." },
            { value: "B", label: "Policy commitments to rewilding have grown but it is uncertain whether they will be delivered." },
            { value: "C", label: "The EU's Biodiversity Strategy has committed to rewilding 50 percent of European land." },
            { value: "D", label: "Rewilding is still considered impractical by the majority of conservation scientists." },
          ],
        },
      ],
    },
    {
      id: 3, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(37), text: "Wolves were absent from Yellowstone National Park for approximately seventy years before their reintroduction.", answer: "True" },
        { id: Q(38), text: "Michael Soulé and Dave Foreman formally developed the concept of rewilding in the 1990s.", answer: "True" },
        { id: Q(39), text: "The Alladale Wilderness Reserve study found no significant differences in carbon storage between rewilded and grazed land.", answer: "False" },
        { id: Q(40), text: "All European countries have introduced legally binding national rewilding targets.", answer: "Not Given" },
      ],
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TEST 5
// ══════════════════════════════════════════════════════════════════════════════
const T5P1: Passage = {
  title: "Coral Reefs: A World Under Threat",
  subtitle: "Reading Passage 1 · Questions 1–13",
  firstQ: 1, lastQ: 13,
  paragraphs: [
    /* A */ "Coral reefs occupy less than one percent of the ocean floor, yet they support approximately twenty-five percent of all known marine species — a biodiversity richness that has led marine biologists to describe them as the rainforests of the sea. Beyond their ecological significance, coral reefs provide direct economic benefits estimated at over 375 billion US dollars annually through fisheries, coastal protection, and tourism. An estimated 500 million people worldwide depend directly on coral reef ecosystems for their food security and livelihoods. Given their disproportionate importance relative to their spatial extent, the rapid deterioration of the world's coral reefs over recent decades represents one of the most consequential biodiversity crises of the contemporary era.",
    /* B */ "Coral reefs are built by tiny marine animals — coral polyps — that secrete calcium carbonate to form the hard skeletal structures that accumulate over centuries and millennia into the massive reef formations visible today. Corals exist in a symbiotic relationship with photosynthetic microalgae called zooxanthellae, which live within coral tissues and provide up to ninety percent of the coral's energy requirements through photosynthesis in exchange for a protected habitat and nutrients. This symbiosis is extraordinarily temperature-sensitive: when water temperatures rise just one to two degrees Celsius above the seasonal maximum for a sustained period, corals expel their zooxanthellae in a stress response. The result — coral bleaching — leaves the coral pale, physiologically stressed, and vulnerable to disease and starvation.",
    /* C */ "Mass coral bleaching events, virtually unknown before 1980, have become increasingly frequent and severe as ocean temperatures have risen. The Great Barrier Reef — the world's largest coral reef system, stretching over 2,300 kilometres along the northeastern coast of Australia — experienced mass bleaching events in 1998, 2002, 2016, 2017, 2020, and 2022. Each event results in significant mortality, and in reefs weakened by multiple bleaching events within short intervals, recovery becomes increasingly impaired. Climate projections suggest that under high-emission scenarios, the ocean temperatures required to trigger mass bleaching will become an annual occurrence for most tropical reef systems by the 2040s.",
    /* D */ "Ocean acidification — the reduction in seawater pH resulting from the ocean's absorption of atmospheric CO₂ — compounds the thermal stress on coral reefs. As pH falls, the saturation state of calcium carbonate in seawater decreases, reducing the rate at which corals can calcify and making existing reef structures more vulnerable to physical erosion. Laboratory experiments and natural experiments at submarine CO₂ vents have confirmed that reduced pH impairs coral growth, skeleton density, and structural integrity. Some scientists argue that even if global warming were halted at 1.5°C above pre-industrial levels — the most ambitious target of the Paris Agreement — ocean acidification alone would significantly degrade the structural complexity of tropical coral reefs.",
    /* E */ "Human activities beyond climate change impose additional direct stressors on coral reef ecosystems. Coastal development drives sedimentation and nutrient runoff from agricultural land, stimulating algal growth that can outcompete and smother coral. Destructive fishing practices — including blast fishing and the use of cyanide — cause direct physical damage and disrupt reef food webs. Coral harvesting for the ornamental aquarium trade removes species critical to reef ecosystem function. Sunscreen chemicals — specifically oxybenzone and octinoxate — have been demonstrated in laboratory and field studies to be toxic to juvenile corals at concentrations found near popular dive sites, leading several jurisdictions including Hawaii and Palau to ban their sale.",
    /* F */ "In response to accelerating reef degradation, conservation practitioners have developed a diverse toolkit of interventions. Marine protected areas that exclude or limit fishing can allow fish populations and coral cover to recover within their boundaries, and well-enforced MPAs show significantly higher coral cover and fish biomass than adjacent unprotected reefs. Coral gardening — growing coral fragments on underwater nurseries and transplanting them onto degraded reefs — has proven effective at increasing coral cover at local scales, though the labour intensity and cost of the approach limits its applicability at the scale required. The most experimental interventions include assisted evolution — selectively breeding or genetically modifying corals for increased thermal and acid tolerance — and cloud brightening over reef systems to locally reduce sea surface temperatures.",
  ],
  questions: [
    {
      id: 1, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(1), text: "An explanation of the symbiotic relationship between corals and photosynthetic microalgae, and what happens when it breaks down.", answer: "B" },
        { id: Q(2), text: "A description of conservation interventions including reef restoration and experimental genetic approaches.", answer: "F" },
        { id: Q(3), text: "Evidence that bleaching events at the Great Barrier Reef have become more frequent over recent decades.", answer: "C" },
        { id: Q(4), text: "A description of how human activities other than climate change directly damage coral reefs.", answer: "E" },
        { id: Q(5), text: "Statistics on the economic and social value of coral reefs globally.", answer: "A" },
      ],
    },
    {
      id: 2, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(6), text: "Coral reefs cover less than one percent of the ocean floor but support around a quarter of all known marine species.", answer: "True" },
        { id: Q(7), text: "Corals expel their zooxanthellae when water temperatures fall significantly below the seasonal average.", answer: "False" },
        { id: Q(8), text: "The Great Barrier Reef has never fully recovered from its first mass bleaching event in 1998.", answer: "Not Given" },
        { id: Q(9), text: "Oxybenzone and octinoxate have been found to be harmful to juvenile corals.", answer: "True" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(10), text: "Photosynthetic microalgae living inside coral tissues are called __________.", answer: "zooxanthellae" },
        { id: Q(11), text: "The technique of growing coral fragments on underwater nurseries and replanting them onto damaged reefs is called coral __________.", answer: "gardening" },
        { id: Q(12), text: "Marine protected areas that are well __________ show significantly higher coral cover and fish populations than adjacent unprotected reefs.", answer: "enforced" },
        { id: Q(13), text: "Algal growth stimulated by __________ and coastal development can smother coral and outcompete it for space on the reef.", answer: "nutrient runoff" },
      ],
    },
  ],
};

const T5P2: Passage = {
  title: "The Science of the Placebo Effect",
  subtitle: "Reading Passage 2 · Questions 14–26",
  firstQ: 14, lastQ: 26,
  paragraphs: [
    /* A */ "In the 1950s, a physician named Henry Beecher published a paper arguing that approximately thirty-five percent of patients across a range of medical conditions showed meaningful improvement when given inert treatments — sugar pills, saline injections, or sham surgical procedures — that they believed to be active therapies. This figure has been cited and disputed ever since, but Beecher's central insight — that the context, ritual, and expectations surrounding a treatment can produce genuine physiological change in a patient — has been confirmed and elaborated by decades of subsequent research. The placebo effect is now understood to be not a nuisance to be controlled away in clinical trials, but a scientifically tractable phenomenon that illuminates fundamental aspects of the relationship between the mind and the body.",
    /* B */ "The neurological mechanisms underlying placebo responses are now partially understood. In pain contexts — where placebo research is most advanced — double-blind studies have demonstrated that inert painkillers reliably trigger the release of endogenous opioids and endocannabinoids in the brain's reward circuits and pain-modulation pathways. Administration of naloxone — a drug that blocks opioid receptors — partially abolishes placebo analgesia, providing direct pharmacological evidence that the effect involves genuine neurotransmitter activity rather than merely subjective reporting. Neuroimaging studies have shown reduced activity in pain-processing brain regions such as the anterior cingulate cortex and insula following placebo administration, mirroring the changes produced by active analgesic drugs.",
    /* C */ "The magnitude of the placebo effect varies substantially depending on the nature of the intervention's presentation. A placebo delivered by injection produces larger effects than the same substance delivered as a pill; a branded pill produces larger effects than a generic one; a treatment administered by an attentive, empathic clinician in an elaborate clinical setting produces larger effects than the same treatment delivered impersonally. These observations suggest that the placebo effect is not solely a property of the inert substance itself but is substantially mediated by the expectations, trust, and ritual associated with the therapeutic encounter — factors sometimes described collectively as the 'therapeutic context'.",
    /* D */ "One of the most counterintuitive recent developments in placebo research is the finding that so-called 'open-label placebos' — inert treatments administered with full disclosure to patients that they contain no active ingredient — can produce significant clinical benefits. A series of trials, most notably by Harvard researcher Ted Kaptchuk, found that patients with irritable bowel syndrome and chronic lower back pain showed significant symptom improvement when given open-label placebos compared to no-treatment controls, even though they knew they were taking sugar pills. These findings challenge the longstanding assumption that deception is necessary for placebo responses to occur and raise novel possibilities for ethically deploying placebo effects in clinical practice.",
    /* E */ "The mirror image of the placebo effect — the 'nocebo' effect — is equally real and clinically significant. When patients are told to expect side effects from a treatment, they are significantly more likely to experience them, even when taking an inert substance. Rates of reported side effects in clinical drug trials increase when patients are given detailed information about possible adverse reactions, and patients who believe they have been given an active drug rather than a placebo in trials report more side effects even when they have in fact received the placebo. The nocebo effect has been implicated in the discontinuation of effective medications due to reported side effects that may in many cases be attributable to negative expectations rather than direct pharmacological activity.",
    /* F */ "The implications of placebo and nocebo research for clinical practice are substantial but their ethical navigation is complex. Maximising placebo responses ethically requires improving the quality of clinical communication, cultivating therapeutic relationships built on trust, and thoughtful attention to the design of clinical environments — all changes broadly desirable on independent grounds. The more challenging question is whether clinicians are ever justified in withholding negative prognostic information to reduce nocebo effects, or in using the ritual and expectations of the therapeutic encounter to enhance drug effects beyond what the pharmacology alone would produce. These questions sit at the intersection of bioethics, clinical psychology, and the philosophy of medicine, and they do not admit of simple answers.",
  ],
  questions: [
    {
      id: 1, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(14), text: "What was the significance of Henry Beecher's 1950s paper, according to the passage?",
          answer: "C",
          options: [
            { value: "A", label: "It proved that thirty-five percent of all medical treatments are ineffective." },
            { value: "B", label: "It showed that placebos should be removed from clinical trials to ensure valid results." },
            { value: "C", label: "It established that the context and expectations surrounding treatment can produce genuine physical changes." },
            { value: "D", label: "It demonstrated that patients who receive inert treatments always report improvement." },
          ],
        },
        {
          id: Q(15), text: "What does the naloxone experiment described in paragraph B demonstrate?",
          answer: "B",
          options: [
            { value: "A", label: "That placebo analgesia is entirely a psychological phenomenon with no biological basis." },
            { value: "B", label: "That placebo pain relief involves genuine release of the brain's natural pain-reducing chemicals." },
            { value: "C", label: "That opioid drugs are no more effective than placebos in treating pain." },
            { value: "D", label: "That naloxone can be used therapeutically to reduce placebo responses in clinical trials." },
          ],
        },
        {
          id: Q(16), text: "What was the key finding of Ted Kaptchuk's open-label placebo trials?",
          answer: "D",
          options: [
            { value: "A", label: "Placebos only work when patients are unaware that they are receiving an inert treatment." },
            { value: "B", label: "Open-label placebos are as effective as active drugs for all medical conditions studied." },
            { value: "C", label: "Patients with irritable bowel syndrome showed no benefit from open-label placebos." },
            { value: "D", label: "Patients can experience clinical benefits from placebos even when fully informed they contain no active ingredient." },
          ],
        },
      ],
    },
    {
      id: 2, type: "matching-headings",
      instruction: "The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.",
      bank: [
        { value: "i",   label: "i — Beecher's foundational contribution and the rehabilitation of placebo research" },
        { value: "ii",  label: "ii — The brain chemistry underlying placebo pain relief" },
        { value: "iii", label: "iii — Why placebos work better in some contexts than others" },
        { value: "iv",  label: "iv — Negative expectations producing negative outcomes: the nocebo effect" },
        { value: "v",   label: "v — Patients benefit from placebos even when told they are receiving them" },
        { value: "vi",  label: "vi — Ethical challenges in applying placebo knowledge to clinical practice" },
      ],
      items: [
        { id: Q(17), text: "Paragraph A", answer: "i" },
        { id: Q(18), text: "Paragraph B", answer: "ii" },
        { id: Q(19), text: "Paragraph C", answer: "iii" },
        { id: Q(20), text: "Paragraph D", answer: "v" },
        { id: Q(21), text: "Paragraph E", answer: "iv" },
        { id: Q(22), text: "Paragraph F", answer: "vi" },
      ],
    },
    {
      id: 3, type: "sentence-completion",
      instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      items: [
        { id: Q(23), text: "In pain studies, placebos trigger the release of endogenous opioids and __________ in the brain's reward and pain-modulation circuits.", answer: "endocannabinoids" },
        { id: Q(24), text: "The combined factors of expectation, trust, and ritual in a treatment context are described as the '__________ context'.", answer: "therapeutic" },
        { id: Q(25), text: "When patients are told to expect side effects from a treatment, they are more likely to experience them — a phenomenon called the __________ effect.", answer: "nocebo" },
        { id: Q(26), text: "An inert treatment given to a patient who knows it is inactive is called an __________ placebo.", answer: "open-label" },
      ],
    },
  ],
};

const T5P3: Passage = {
  title: "Artificial Intelligence in Healthcare: Promise and Peril",
  subtitle: "Reading Passage 3 · Questions 27–40",
  firstQ: 27, lastQ: 40,
  paragraphs: [
    /* A */ "The application of artificial intelligence to medicine has moved from speculative to operational with striking speed. Algorithms trained on millions of retinal photographs can detect diabetic retinopathy with accuracy exceeding that of specialist ophthalmologists; AI systems trained on mammographic images identify breast cancers that radiologists miss; deep learning models applied to electrocardiograms detect atrial fibrillation and predict cardiac events years before they occur. In drug discovery, AI systems have dramatically compressed the timeline from target identification to candidate molecule selection — a task that previously required teams of medicinal chemists working for years can now be accomplished in months. The question is no longer whether AI can perform specific clinical tasks at a high level, but how to integrate these capabilities into healthcare systems in ways that are safe, equitable, and trusted.",
    /* B */ "Medical imaging represents the most mature clinical application of AI. Convolutional neural networks trained on large labelled datasets have demonstrated performance at or above radiologist level in a growing range of tasks: detecting pneumonia in chest X-rays, classifying skin lesions, identifying early colorectal polyps in colonoscopy video, and grading the severity of diabetic eye disease. Several such systems have received regulatory approval in the United States, European Union, and United Kingdom, and are now deployed in clinical settings. Yet deployment studies — evaluating AI performance on real patient populations rather than curated research datasets — have sometimes revealed significant performance degradation when systems encounter populations, scanner types, or image quality standards that differ from those on which they were trained.",
    /* C */ "Beyond imaging, AI is being applied to predict clinical outcomes from the structured and unstructured data held in electronic health records. Sepsis prediction algorithms, early warning systems for acute kidney injury, and models predicting hospital readmission risk have been deployed in major healthcare systems with varying results. Some implementations have demonstrated clear patient benefit; others have produced high false-positive rates that generated alert fatigue among clinical staff without improving outcomes. The integration of AI predictions into clinical workflows raises complex questions about how clinicians should weight algorithmic outputs against their own clinical judgement, particularly in cases where the algorithm's reasoning is opaque and cannot be interrogated.",
    /* D */ "The single most significant obstacle to equitable and effective AI in healthcare is the quality and representativeness of training data. Medical datasets reflect the populations that generated them — which in practice means that AI systems trained predominantly on data from high-income countries, large urban academic hospitals, and specific demographic groups may perform significantly less well for patients who differ from that training population in age, ethnicity, comorbidity profile, or access to healthcare. Multiple studies have documented that AI diagnostic systems show higher error rates for patients with darker skin tones, women, and older adults compared to the populations on which they were primarily trained. Without deliberate effort to include diverse, representative data and to evaluate and correct for these performance disparities, AI risks encoding and amplifying existing healthcare inequalities.",
    /* E */ "Patient and clinician attitudes towards AI in healthcare are complex and context-dependent. Surveys consistently show that patients are broadly accepting of AI assistance in diagnostics but more resistant to the idea of AI making autonomous treatment decisions. Clinicians, meanwhile, are divided: some view AI tools as powerful aids that extend their diagnostic reach; others express concerns about deskilling — the erosion of clinical expertise if AI handles the tasks through which expertise is developed — and about professional and legal accountability when AI recommendations contribute to adverse outcomes. The question of liability when an AI-assisted decision leads to patient harm remains legally unresolved in most jurisdictions.",
    /* F */ "Regulatory frameworks for medical AI are still being developed and remain inconsistent internationally. The US Food and Drug Administration has adopted a 'predetermined change control plan' approach that allows AI systems to update their algorithms without resubmitting for full regulatory review, provided changes remain within pre-specified boundaries. The EU's AI Act, which came into force in 2024, classifies most medical AI applications as 'high risk', requiring robust transparency, human oversight, and post-market monitoring obligations. There is broad consensus that the pace of AI development is outstripping the capacity of existing regulatory frameworks to ensure safety and effectiveness, and that new institutional mechanisms — including mandatory adverse event reporting, post-deployment performance monitoring, and international coordination — are urgently needed.",
  ],
  questions: [
    {
      id: 1, type: "matching-info",
      instruction: "The passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter A–F.",
      items: [
        { id: Q(27), text: "Evidence that AI diagnostic tools can sometimes perform significantly worse on real patient populations than on research datasets.", answer: "B" },
        { id: Q(28), text: "A description of concerns among clinicians about AI's potential impact on professional expertise and accountability.", answer: "E" },
        { id: Q(29), text: "A reference to documented differences in AI error rates across patient demographic groups.", answer: "D" },
        { id: Q(30), text: "An account of AI applications in predicting patient deterioration and clinical outcomes from health records.", answer: "C" },
        { id: Q(31), text: "An overview of AI achievements in medical imaging and drug discovery.", answer: "A" },
      ],
    },
    {
      id: 2, type: "multiple-choice",
      instruction: "Choose the correct letter, A, B, C or D.",
      items: [
        {
          id: Q(32), text: "What does the passage identify as the most significant obstacle to equitable AI in healthcare?",
          answer: "C",
          options: [
            { value: "A", label: "The reluctance of clinicians to adopt AI diagnostic tools." },
            { value: "B", label: "The high cost of training and deploying AI systems in healthcare settings." },
            { value: "C", label: "The quality and representativeness of the data on which AI systems are trained." },
            { value: "D", label: "The lack of regulatory approval for AI diagnostic systems." },
          ],
        },
        {
          id: Q(33), text: "According to paragraph C, what problem has been observed with some AI sepsis and readmission prediction systems?",
          answer: "B",
          options: [
            { value: "A", label: "They have been entirely ineffective and have not been deployed in major hospitals." },
            { value: "B", label: "High false-positive rates have caused alert fatigue without consistently improving patient outcomes." },
            { value: "C", label: "They work well in intensive care but fail in general ward settings." },
            { value: "D", label: "Clinicians have refused to use them because the reasoning they provide is too complex." },
          ],
        },
        {
          id: Q(34), text: "What does the passage say about patient attitudes towards AI in healthcare?",
          answer: "A",
          options: [
            { value: "A", label: "Patients are generally comfortable with AI helping with diagnosis but less so with AI making treatment decisions autonomously." },
            { value: "B", label: "Patients universally prefer AI-assisted diagnosis over that performed by human clinicians." },
            { value: "C", label: "Patients have shown strong resistance to AI assistance in any aspect of their care." },
            { value: "D", label: "Patients are primarily concerned about the cost implications of AI-assisted care." },
          ],
        },
        {
          id: Q(35), text: "What does the EU AI Act require of most medical AI applications?",
          answer: "D",
          options: [
            { value: "A", label: "They must be fully autonomous, without any requirement for human oversight." },
            { value: "B", label: "They must be approved by a single EU-wide regulatory body before clinical use." },
            { value: "C", label: "They are classified as low-risk and require only basic safety documentation." },
            { value: "D", label: "They require transparency, human oversight, and post-market monitoring as high-risk applications." },
          ],
        },
      ],
    },
    {
      id: 3, type: "tfng",
      instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE, or NOT GIVEN.",
      items: [
        { id: Q(36), text: "AI algorithms trained on retinal photographs can detect diabetic retinopathy with accuracy that exceeds that of specialist eye doctors.", answer: "True" },
        { id: Q(37), text: "All medical AI systems that have received regulatory approval perform equally well across diverse patient populations.", answer: "False" },
        { id: Q(38), text: "The legal question of liability when AI-assisted decisions lead to patient harm has been resolved in most countries.", answer: "False" },
        { id: Q(39), text: "The EU AI Act was introduced primarily to reduce the cost of AI development in the healthcare sector.", answer: "Not Given" },
        { id: Q(40), text: "There is broad agreement that regulatory frameworks have not kept pace with the development of medical AI.", answer: "True" },
      ],
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TESTS ARRAY
// ══════════════════════════════════════════════════════════════════════════════
export const TESTS: IELTSTest[] = [
  {
    id: 1,
    title: "Practice Test 1",
    tags: ["Biology", "Economics", "Medicine"],
    difficulty: "Moderate",
    passages: [T1P1, T1P2, T1P3],
  },
  {
    id: 2,
    title: "Practice Test 2",
    tags: ["Environment", "Psychology", "Agriculture"],
    difficulty: "Moderate",
    passages: [T2P1, T2P2, T2P3],
  },
  {
    id: 3,
    title: "Practice Test 3",
    tags: ["Marine Science", "Technology", "Economics"],
    difficulty: "Challenging",
    passages: [T3P1, T3P2, T3P3],
  },
  {
    id: 4,
    title: "Practice Test 4",
    tags: ["Neuroscience", "Society", "Conservation"],
    difficulty: "Challenging",
    passages: [T4P1, T4P2, T4P3],
  },
  {
    id: 5,
    title: "Practice Test 5",
    tags: ["Marine Science", "Medicine", "AI & Health"],
    difficulty: "Advanced",
    passages: [T5P1, T5P2, T5P3],
  },
];

// ── Band score table ──────────────────────────────────────────────────────────
export function getBandScore(correct: number): number {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 33) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 27) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 19) return 5.5;
  if (correct >= 15) return 5.0;
  if (correct >= 13) return 4.5;
  if (correct >= 10) return 4.0;
  return 3.5;
}

export interface GeneralReadingTest {
  id: number;
  title: string;
  tags: string[];
  difficulty: "Moderate" | "Challenging" | "Advanced" | "Upper-Intermediate";
  passages: [Passage];
}

export const GENERAL_TESTS: GeneralReadingTest[] = [
  {
    id: 1,
    title: "Can Stress Ever Be Good for You?",
    tags: ["Psychology", "Health", "Social Science"],
    difficulty: "Moderate",
    passages: [
      {
        title: "Can Stress Ever Be Good for You?",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          /* A */ "Stress is one of the most widespread psychological phenomena in the modern world, yet its effects on the human body and mind remain complex and sometimes misunderstood. Researchers continue to investigate how stress functions and whether it is always harmful.",
          /* B */ "Historically, stress was understood purely as a threat response. However, research in the 1980s, particularly by psychologist Richard Lazarus, demonstrated that stress is not simply caused by external events but by how individuals appraise and interpret those events. A situation one person finds threatening may be seen as a challenge by another.",
          /* C */ "According to Hans Selye, the founder of stress research, the body responds to stress through a three-stage process called General Adaptation Syndrome: alarm, resistance, and exhaustion. During the alarm stage, the body releases adrenaline and prepares to react. In the resistance stage, the body attempts to adapt and return to balance. If stress continues too long, the exhaustion stage sets in, increasing the risk of illness.",
          /* D */ "Neuroscientist Bruce McEwen introduced the concept of allostatic load – the cumulative wear and tear on the body caused by repeated or chronic stress. He argued that while the stress response is useful in short bursts, prolonged activation of stress hormones such as cortisol damages brain structures including the hippocampus, which is responsible for memory and learning.",
          /* E */ "Psychologist Kelly McGonigal challenges the traditional view, arguing that stress is only harmful when people believe it to be. Her research suggests that individuals who view stress as energising rather than damaging have better health outcomes and longer lives. The key factor is not the amount of stress but one’s mindset about it.",
          /* F */ "Recent studies using brain imaging by Naomi Eisenberger show that social support significantly reduces the neural response to stress. When people feel connected to others, the brain’s threat-detection centres become less reactive. This suggests that relationships and community are among the most powerful buffers against the negative effects of stress.",
          /* G */ "Teresa Amabile’s research in workplace settings confirms that time pressure and unclear goals are major stress triggers that reduce both creativity and productivity. However, moderate levels of challenge – when goals are clear and achievable – can produce a state of positive stress, or eustress, which motivates performance and focus."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "According to Richard Lazarus, stress is caused directly by negative external events rather than by how people interpret them.", answer: "how individuals appraise and interpret those events" },
              { id: "2", text: "Hans Selye described the General Adaptation Syndrome as having four stages: alarm, resistance, recovery, and exhaustion.", answer: "three stages: alarm, resistance, and exhaustion" },
              { id: "3", text: "Bruce McEwen argued that prolonged stress hormones particularly damage the cerebellum, which controls movement.", answer: "hippocampus, which is responsible for memory and learning" },
              { id: "4", text: "Kelly McGonigal suggests that the total amount of stress a person experiences is the main factor determining health outcomes.", answer: "one's mindset about it" },
              { id: "5", text: "Naomi Eisenberger’s research shows that social connection makes the brain’s threat-detection centres more reactive to stress.", answer: "less reactive" },
              { id: "6", text: "Teresa Amabile found that unclear goals and time pressure increase creativity and productivity in the workplace.", answer: "reduce both creativity and productivity" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Where Does Inspiration Come From?",
    tags: ["Psychology", "Neuroscience", "Creativity"],
    difficulty: "Challenging",
    passages: [
      {
        title: "Where Does Inspiration Come From?",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          /* A */ "Inspiration is widely celebrated as the driving force behind great art, science, and innovation, yet it remains one of the least understood aspects of human psychology. Unlike motivation, which can be built through habits and discipline, inspiration often arrives unexpectedly and cannot easily be forced.",
          /* B */ "Psychologists Todd Thrash and Andrew Elliot conducted some of the first systematic studies of inspiration in the early 2000s. They identified three core properties of inspiration: evocation – it is triggered rather than deliberately chosen; transcendence – it goes beyond ordinary concerns; and approach motivation – it compels the person to act on a new idea or vision.",
          /* C */ "Cognitive scientists suggest that inspiration frequently emerges from the default mode network – the area of the brain most active during rest and mind-wandering. When people are not focused on a specific task, the brain makes unexpected connections between stored memories, past experiences, and new information, sometimes producing sudden insight.",
          /* D */ "Mihaly Csikszentmihalyi’s research on ‘flow’ describes a related but distinct state. Flow occurs when a person is deeply absorbed in a challenging activity, losing awareness of time and self. Unlike inspiration, which often arrives without effort, flow requires a close match between the difficulty of a task and the individual’s skill level.",
          /* E */ "According to researcher Scott Barry Kaufman, inspired individuals score higher in openness to experience, one of the five major personality traits. They are more receptive to beauty, complexity, and new ideas. Kaufman argues that inspiration bridges the gap between what currently exists and what could be possible, making it central to both creativity and personal growth.",
          /* F */ "Neurological research by Rex Jung suggests that during moments of creative inspiration, the prefrontal cortex – responsible for logical reasoning and self-censorship – becomes temporarily less dominant. This reduction in critical thinking allows more unusual associations to surface, a process sometimes called transient hypofrontality.",
          /* G */ "Environmental factors also play a role. Studies show that natural settings, physical movement such as walking, and exposure to new cultures can all increase the frequency of inspirational experiences. Teresa Amabile’s research similarly suggests that psychological safety and the absence of external pressure create the best conditions for inspiration to occur."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "Thrash and Elliot identified two core properties of inspiration: transcendence and approach motivation.", answer: "three core properties: evocation, transcendence, and approach motivation" },
              { id: "2", text: "According to cognitive scientists, inspiration typically emerges when people are intensely focused on solving a difficult problem.", answer: "when people are not focused on a specific task" },
              { id: "3", text: "Csikszentmihalyi argues that flow and inspiration are essentially the same state, both requiring deep absorption in an activity.", answer: "related but distinct state. Unlike inspiration, flow requires a close match between difficulty and skill level" },
              { id: "4", text: "Scott Barry Kaufman claims that inspired individuals score higher in conscientiousness, one of the five major personality traits.", answer: "higher in openness to experience" },
              { id: "5", text: "Rex Jung’s research suggests that during inspiration, the prefrontal cortex becomes more dominant, improving logical reasoning.", answer: "temporarily less dominant" },
              { id: "6", text: "Research shows that structured office environments and competitive pressure are the most effective triggers for inspiration.", answer: "psychological safety and the absence of external pressure" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "What Makes a Great Leader?",
    tags: ["Business", "Sociology", "Workplace"],
    difficulty: "Advanced",
    passages: [
      {
        title: "What Makes a Great Leader?",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          /* A */ "Leadership is a complex and much-debated concept in both psychology and organisational studies. While everyone has an intuitive sense of what leadership involves, researchers have struggled for decades to define exactly what makes a person an effective leader and whether leadership is a fixed trait or a learnable skill.",
          /* B */ "Early theories of leadership, often called the ‘Great Man’ theories, assumed that leaders are born, not made. Researchers in the early twentieth century, such as Thomas Carlyle, believed that history was shaped by exceptional individuals who possessed innate qualities of intelligence, courage, and charisma. This view largely fell out of favour by the mid-twentieth century.",
          /* C */ "Psychologist Kurt Lewin conducted foundational experiments in the 1930s identifying three main leadership styles: autocratic, democratic, and laissez-faire. His research found that democratic leadership generally produced higher quality work and greater group satisfaction, while autocratic styles led to higher short-term productivity but increased hostility among group members.",
          /* D */ "James MacGregor Burns introduced an influential distinction between transactional and transformational leadership. Transactional leaders focus on exchange – rewards for performance, discipline for failure. Transformational leaders, by contrast, inspire followers to exceed their own self-interest and work toward a shared vision. Burns argued that transformational leadership leads to deeper and more lasting change.",
          /* E */ "Psychologist Daniel Goleman proposed that emotional intelligence – the ability to understand and manage one’s own emotions and those of others – is the most critical factor in effective leadership. His research across hundreds of organisations showed that emotional intelligence accounted for nearly 90% of the difference between average and outstanding leaders in senior positions.",
          /* F */ "More recent research by Amy Edmondson at Harvard focuses on the concept of psychological safety – the belief that one can speak up, take risks, and make mistakes without fear of punishment. Her studies show that teams led by psychologically safe leaders are significantly more innovative, more willing to share information, and perform better over time.",
          /* G */ "Cross-cultural research by Geert Hofstede demonstrates that effective leadership styles vary significantly across cultures. In high power-distance cultures, where inequality is accepted as natural, directive and hierarchical leadership is often expected. In low power-distance cultures, collaborative and participative approaches tend to be more effective and better received."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "Early ‘Great Man’ theories, associated with Thomas Carlyle, argued that leadership is primarily a skill that can be developed through training.", answer: "assumed that leaders are born, not made" },
              { id: "2", text: "Kurt Lewin’s research found that autocratic leadership produced higher quality work and greater group satisfaction than democratic styles.", answer: "democratic leadership generally produced higher quality work and greater group satisfaction" },
              { id: "3", text: "James MacGregor Burns described transactional leaders as those who inspire followers to work beyond their personal interests toward a shared vision.", answer: "Transformational leaders" },
              { id: "4", text: "According to Daniel Goleman, emotional intelligence accounted for nearly 50% of the difference between average and outstanding senior leaders.", answer: "nearly 90%" },
              { id: "5", text: "Amy Edmondson’s research shows that psychological safety leads teams to become more cautious and less willing to share sensitive information.", answer: "significantly more innovative, more willing to share information" },
              { id: "6", text: "Geert Hofstede found that directive and hierarchical leadership is most effective in low power-distance cultures.", answer: "high power-distance cultures" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Are We Becoming Cyborgs?",
    tags: ["Technology", "Futurism", "Biomechanics"],
    difficulty: "Moderate",
    passages: [
      {
        title: "Are We Becoming Cyborgs?",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          /* A */ "The concept of the cyborg – a being that combines biological and artificial components – has moved from science fiction into scientific reality. As technology advances, the boundary between human and machine is becoming increasingly difficult to define, raising profound questions about identity, ethics, and the future of humanity.",
          /* B */ "The term ‘cyborg’ was first coined by scientists Manfred Clynes and Nathan Kline in 1960. They used it to describe human beings enhanced by technology in order to survive in extraterrestrial environments. Their original vision was not about replacing human abilities but about extending them – allowing the body to adapt to conditions beyond what biology alone could support.",
          /* C */ "Today, basic forms of cybernetic enhancement already exist. Cochlear implants restore hearing by converting sound into electrical signals sent directly to the auditory nerve. Deep brain stimulation devices help patients with Parkinson’s disease by delivering targeted electrical impulses to specific regions of the brain. Researcher Kevin Warwick became one of the first people to implant a chip in his own nervous system, enabling him to control machines with his thoughts.",
          /* D */ "Futurist Ray Kurzweil predicts that by the 2030s, nanobots – microscopic robots – will travel through the human bloodstream, repairing cells, fighting disease, and potentially connecting the human brain directly to cloud-based computing systems. Kurzweil argues this will dramatically enhance memory, intelligence, and sensory experience, representing what he calls the ‘Singularity’: the point at which human and artificial intelligence merge.",
          /* E */ "However, critics warn of serious risks. Philosopher Nick Bostrom argues that unequal access to enhancement technologies could create a divided society in which enhanced individuals have overwhelming advantages in employment, education, and social status. This could deepen existing inequalities rather than reduce them, producing what some researchers describe as a ‘cognitive underclass’.",
          /* F */ "Bioethicist Donna Haraway takes a more optimistic view, arguing in her influential work that the cyborg represents an opportunity to move beyond fixed categories of gender, race, and species. She sees technological integration not as a threat to human identity but as a chance to redefine it more freely and inclusively.",
          /* G */ "Neuroscientist Miguel Nicolelis has demonstrated that brain-machine interfaces can allow paralysed patients to control robotic limbs through thought alone. His research suggests that the brain can adapt remarkably quickly to incorporate artificial devices as extensions of the self, a phenomenon known as neuroplasticity. Nicolelis believes that within decades, such interfaces will become widely available and fundamentally transform medicine and human experience."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "The term ‘cyborg’ was coined by Clynes and Kline to describe humans enhanced by technology in order to survive underwater environments.", answer: "extraterrestrial environments" },
              { id: "2", text: "Kevin Warwick’s experiment involved implanting a chip in his brain, allowing him to communicate directly with other people’s nervous systems.", answer: "implant a chip in his own nervous system, enabling him to control machines with his thoughts" },
              { id: "3", text: "Ray Kurzweil predicts that nanobots will connect the human brain to cloud computing by the 2050s, an event he calls the ‘Singularity’.", answer: "by the 2030s" },
              { id: "4", text: "Nick Bostrom argues that equal access to enhancement technologies will eliminate existing social inequalities and create a more just society.", answer: "unequal access to enhancement technologies could create a divided society" },
              { id: "5", text: "Donna Haraway argues that technological integration is a threat to human identity and should be approached with extreme caution.", answer: "represents an opportunity to move beyond fixed categories... change to redefine it more freely" },
              { id: "6", text: "Miguel Nicolelis’ research shows that the brain adapts slowly to artificial devices and rarely incorporates them as natural extensions of itself.", answer: "adapts remarkably quickly to incorporate artificial devices as extensions of the self" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "The Paradox of Choice",
    tags: ["Psychology", "Sociology", "Behavioral Economics"],
    difficulty: "Upper-Intermediate",
    passages: [
      {
        title: "The Paradox of Choice",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          "In modern consumer societies, freedom is often equated with the availability of choice. Stores offer dozens of varieties of toothpaste, streaming platforms push thousands of movies, and career paths seem limitless. The underlying assumption is that more choice leads to greater autonomy and, consequently, increased happiness. However, a growing body of psychological research suggests the precise opposite.",
          "Psychologist Barry Schwartz popularised the concept of the 'paradox of choice' in the early 2000s. He argued that while a certain amount of choice is essential for well-being, an abundance of options often leads to decision paralysis. When faced with too many possibilities, consumers frequently experience anxiety, fear of making the wrong decision, and ultimately, dissatisfaction with whatever choice they eventually make.",
          "One of the most famous experiments illustrating this phenomenon was conducted by Sheena Iyengar and Mark Lepper in 2000. In their 'jam study,' shoppers at a supermarket were presented with either 24 varieties of gourmet jam or just six. While the larger display attracted more attention, only 3% of consumers bought jam from it. By contrast, nearly 30% of those exposed to the smaller selection made a purchase. The researchers concluded that extensive choices overwhelm cognitive processing.",
          "Schwartz distinguishes between two types of decision-makers: 'maximisers' and 'satisficers.' Maximisers meticulously research and evaluate every option to ensure they make the absolute best choice. Satisficers, on the other hand, settle for the first option that meets their basic criteria. Studies show that although maximisers sometimes achieve better objective outcomes, satisficers generally report higher levels of happiness and lower levels of regret.",
          "The negative effects of excessive choice extend beyond retail. In the modern dating scene, dating apps have gamified romance, giving users access to thousands of potential partners. Rather than facilitating better matches, this abundance often fosters an illusion of infinite alternatives, causing individuals to dismiss highly compatible partners in the hope that someone marginally better is just one swipe away.",
          "Psychologists suggest that one reason excessive choice induces misery is the phenomenon of opportunity cost. Every time a selection is made, the individual must mentally sacrifice the benefits of all unchosen alternatives. With two options, the opportunity cost is limited, but with fifty options, the combined psychological weight of foregone benefits can be overwhelming.",
          "To combat decision fatigue, experts recommend artificially restricting one’s options. Strategies include setting strict time limits on research, adopting the mindset of a satisficer, and avoiding overthinking non-consequential choices like what to watch or eat. Ultimately, accepting that perfect choices rarely exist is the most effective way to regain a sense of contentment in a complex world."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "In modern societies, the prevailing assumption is that fewer choices lead to greater autonomy and increased happiness.", answer: "more choice leads to greater autonomy and increased happiness" },
              { id: "2", text: "The 'jam study' revealed that the display with 24 varieties attracted less attention but resulted in significantly more purchases.", answer: "attracted more attention, but only 3% bought... 30% exposed to the smaller selection made a purchase" },
              { id: "3", text: "According to Schwartz, 'satisficers' meticulously research every option but report lower levels of happiness than 'maximisers.'", answer: "settle for the first option that meets their basic criteria" },
              { id: "4", text: "In the context of modern dating apps, the abundance of potential partners has proven to significantly facilitate better matches for users.", answer: "often fosters an illusion of infinite alternatives" },
              { id: "5", text: "The concept of opportunity cost suggests that having fewer options increases the psychological weight of foregone benefits.", answer: "with fifty options, the combined psychological weight of foregone benefits can be overwhelming" },
              { id: "6", text: "To reduce decision fatigue, experts suggest adopting the mindset of a maximiser when dealing with non-consequential choices.", answer: "adopting the mindset of a satisficer" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "The Attention Economy",
    tags: ["Technology", "Society", "Media"],
    difficulty: "Upper-Intermediate",
    passages: [
      {
        title: "Paying with Our Minds: The Attention Economy",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          "In the digital age, information is no longer a scarce resource; it is infinitely abundant. As a result, the limiting factor in global commerce is no longer the production of content, but the human capacity to consume it. This paradigm shift has given rise to the 'attention economy,' a system in which human focus is treated as a highly valuable commodity to be harvested and sold.",
          "The term was first coined by psychologist and economist Herbert A. Simon in 1971. He noted that a wealth of information creates a poverty of attention. Today, technology companies, social media platforms, and news outlets design their products with the primary goal of capturing and retaining user attention for as long as possible, often relying on sophisticated psychological triggers.",
          "One of the most effective tools in the attention economy is the intermittent variable reward system. Pioneered by B.F. Skinner using slot machines, this principle operates on the unpredictability of a reward. Social media feeds utilize this mechanism perfectly: users scroll endlessly without knowing when they will encounter a highly engaging post or a notification. This unpredictability causes a dopamine spike, resulting in addictive behaviour.",
          "The consequences of this constant competition for our cognitive resources are profound. Studies indicate that the average human attention span has fragmented, leading to a phenomenon known as 'continuous partial attention.' Rather than focusing deeply on a single task, individuals constantly scan their environment for new stimuli. This state of alertness severely diminishes the capacity for deep, analytical thought.",
          "Furthermore, the algorithms driving the attention economy are inherently biassed toward outrage and emotional polarization. Content that provokes anger or fear is algorithmically promoted because it reliably generates more engagement than nuanced or balanced information. Consequently, the attention economy is frequently blamed for increasing political polarization and societal division.",
          "To reclaim cognitive autonomy, proponents of 'digital minimalism,' such as author Cal Newport, suggest drastically reducing screen time and restructuring our relationship with technology. This involves turning off non-essential notifications, scheduling specific times to check email, and treating attention as a finite, precious resource rather than an infinite well.",
          "Ultimately, the battle for human attention shows no signs of slowing down, especially as virtual and augmented reality technologies enter the mainstream. Unless individuals consciously assert control over where they direct their focus, their minds will remain the primary product in an increasingly extractive digital marketplace."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "In the digital age, human focus is a scarce resource because the production of content is extremely limited and expensive.", answer: "information is no longer a scarce resource; it is infinitely abundant" },
              { id: "2", text: "Herbert A. Simon argued in 1971 that a wealth of information naturally leads to an abundance of human attention.", answer: "a wealth of information creates a poverty of attention" },
              { id: "3", text: "Social media feeds use a predictable reward system where users know exactly when they will see engaging content.", answer: "unpredictability causes a dopamine spike" },
              { id: "4", text: "Continuous partial attention allows individuals to focus deeply and analytically on a single task without distraction.", answer: "severely diminishes the capacity for deep, analytical thought" },
              { id: "5", text: "Algorithms in the attention economy tend to promote nuanced and balanced information because it reduces political polarization.", answer: "biassed toward outrage and emotional polarization" },
              { id: "6", text: "Digital minimalists argue that we should treat human attention as an infinite well that can never be fully depleted.", answer: "finite, precious resource rather than an infinite well" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "The Science of Dreams",
    tags: ["Biology", "Neuroscience", "Health"],
    difficulty: "Upper-Intermediate",
    passages: [
      {
        title: "The Mystery of Sleep and Dreams",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          "For much of human history, dreams were regarded as prophetic messages or direct communications with the divine. It was only with the advent of modern neuroscience that sleep and dreaming were subjected to empirical study. Yet, despite decades of research, the precise evolutionary function of dreaming remains one of the most hotly debated topics in biology.",
          "From a physiological standpoint, sleep is divided into several stages, but dreaming occurs most intensely during Rapid Eye Movement (REM) sleep. During this phase, the brain becomes highly active, mimicking the neural patterns of wakefulness. Paradoxically, the body undergoes temporary paralysis, known as REM atonia, which prevents individuals from physically acting out their dreams and injuring themselves.",
          "Sigmund Freud proposed that dreams are the “royal road to the unconscious,” acting as a safe space for repressed desires to manifest. However, modern scientists largely reject Freud’s psychoanalytic interpretation. The Activation-Synthesis theory, proposed by Allan Hobson and Robert McCarley in 1977, argues that dreams are merely the forebrain's attempt to make sense of random neural signals fired from the brainstem during sleep.",
          "More recent theories emphasize the role of dreaming in memory consolidation and emotional regulation. Matthew Walker, a prominent sleep researcher, describes dreaming as a form of 'overnight therapy.' During REM sleep, the brain processes emotionally charged experiences in a neurochemical environment completely devoid of noradrenaline, an anxiety-triggering chemical. This allows the mind to strip the emotional sting from painful memories.",
          "Another leading hypothesis is the 'Threat Simulation Theory,' introduced by philosopher Antti Revonsuo. He posits that the biological function of dreaming is to simulate threatening events in a safe environment, allowing the nervous system to practice threat-avoidance behaviors. This explains why nightmares and anxiety-inducing dreams are remarkably common across all human cultures.",
          "Interestingly, some individuals possess the ability to recognize they are dreaming while the dream is still occurring, a phenomenon known as lucid dreaming. Studies using functional magnetic resonance imaging (fMRI) have shown that during lucid dreams, the prefrontal cortex—the area of the brain responsible for logical reasoning and self-awareness—reactivates, bridging the gap between waking consciousness and the dream state.",
          "As neuroimaging technology advances, our understanding of dreams continues to evolve. While they may not contain supernatural prophecies, dreams clearly serve critical functions in preserving mental health, preparing us for waking challenges, and optimizing human cognition."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "Dreams occur most intensely during REM sleep, a phase in which both the brain and the physical limbs become highly active and mobile.", answer: "the body undergoes temporary paralysis, known as REM atonia" },
              { id: "2", text: "The Activation-Synthesis theory supports Freud's idea that dreams primarily exist to reveal repressed subconscious desires.", answer: "dreams are merely the forebrain's attempt to make sense of random neural signals" },
              { id: "3", text: "During REM sleep, the brain processes memories in an environment filled with noradrenaline, which increases emotional distress.", answer: "environment completely devoid of noradrenaline... strip the emotional sting" },
              { id: "4", text: "According to the Threat Simulation Theory, human nightmares are rare because the brain naturally avoids simulating anxiety-inducing events.", answer: "simulate threatening events... practice threat-avoidance behaviors" },
              { id: "5", text: "During a lucid dream, the brain's prefrontal cortex shuts down completely, preventing any form of logical reasoning or self-awareness.", answer: "prefrontal cortex... reactivates, bridging the gap" },
              { id: "6", text: "Modern neuroimaging has proven that dreams possess no actual biological utility and are simply random byproducts of sleep.", answer: "serve critical functions in preserving mental health" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Nature’s Internet: The Wood Wide Web",
    tags: ["Ecology", "Environment", "Science"],
    difficulty: "Upper-Intermediate",
    passages: [
      {
        title: "The Hidden World of Mycorrhizal Networks",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          "For centuries, forests were perceived merely as collections of individual trees competing ruthlessly for sunlight, water, and nutrients. This Darwinian view of the forest focused entirely on above-ground competition. However, in recent decades, ecologists have uncovered a hidden, highly cooperative network beneath the forest floor that fundamentally transforms our understanding of plant life.",
          "At the heart of this collaborative system are mycorrhizal fungi. These microscopic fungi attach themselves to the roots of trees, creating a vast underground lattice that connects nearly all the plants in a mature forest. In 1997, the journal Nature published a groundbreaking paper by Suzanne Simard, who dubbed this intricate system the 'Wood Wide Web.'",
          "The relationship between the trees and the fungi is highly symbiotic. Trees, which can photosynthesize, produce carbon-rich sugars that they share with the underground fungi. In return, the fungi use their incredibly fine threads, called mycelium, to scavenge the soil for essential minerals like phosphorus and nitrogen, delivering them back to the tree's roots. Neither organism could thrive without the other.",
          "What makes the Wood Wide Web truly remarkable is that it facilitates communication and resource-sharing between the trees themselves. Simard’s research demonstrated that older, deeply rooted 'hub trees' or 'mother trees' act as central nodes in the network. These mature trees use the fungal connections to pump excess nutrients to shaded saplings struggling to survive in the forest understory.",
          "Furthermore, the network acts as an early warning system. When a tree is attacked by insects or pathogens, it can release chemical distress signals through the mycorrhizal network. Neighboring trees detect these signals and pre-emptively boost their own defensive enzymes and chemical repellents, preparing for an attack before it actually arrives.",
          "However, this network is not immune to exploitation. Certain opportunistic plants, such as the phantom orchid, lack chlorophyll and cannot photosynthesize. Instead, they tap into the mycorrhizal network to siphon off nutrients produced by surrounding trees, acting essentially as botanical 'hackers' operating entirely as parasites.",
          "The discovery of the Wood Wide Web has profound implications for forestry and conservation. Traditional logging practices that clear-cut entire areas and remove ancient mother trees inadvertently destroy the invisible fungal infrastructure. Preserving the health of a forest requires protecting the unseen connections beneath the soil just as much as the visible canopy above."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "Historically, scientists viewed forests as highly cooperative environments where trees gracefully shared water and sunlight.", answer: "perceived merely as collections of individual trees competing ruthlessly" },
              { id: "2", text: "Trees depend on mycorrhizal fungi for carbon-rich sugars because trees are unable to produce it themselves.", answer: "Trees, which can photosynthesize, produce carbon-rich sugars that they share with the underground fungi" },
              { id: "3", text: "Suzanne Simard discovered that ‘mother trees’ actively block younger saplings from accessing nutrients to reduce competition.", answer: "pump excess nutrients to shaded saplings struggling to survive" },
              { id: "4", text: "When facing a fungal infection, a tree sends chemical distress signals through the air to warn its neighbors.", answer: "release chemical distress signals through the mycorrhizal network" },
              { id: "5", text: "The phantom orchid uses the mycorrhizal network to distribute its excess chlorophyll to surrounding plants.", answer: "lack chlorophyll... tap into the mycorrhizal network to siphon off nutrients" },
              { id: "6", text: "Modern conservationists argue that clear-cutting old trees is beneficial because it allows the fungal infrastructure to easily grow back.", answer: "Traditional logging practices... remove ancient mother trees inadvertently destroy the invisible fungal infrastructure" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "The Psychology of Time Perception",
    tags: ["Psychology", "Physics", "Cognitive Science"],
    difficulty: "Upper-Intermediate",
    passages: [
      {
        title: "Why Does Time Fly?",
        subtitle: "General Reading Practice",
        firstQ: 1,
        lastQ: 6,
        paragraphs: [
          "Time is supposedly a constant, ticking away at an unvarying pace as dictated by the laws of physics. Yet, the human experience of time is profoundly subjective. While a painful hour spent in a doctor's waiting room can feel like an eternity, a joyous weekend with friends seems to vanish in an instant. This subjectivity—the psychological perception of time—has fascinated philosophers and cognitive scientists alike.",
          "One of the most universal human complaints is that time appears to speed up as we grow older. To a five-year-old child, one year represents a massive 20% of their entire existence, making the gap from one birthday to the next feel monumental. To a fifty-year-old, however, a year is merely 2% of their life. This mathematical theory, known as proportional theory, partly explains why decades seem to compress in later life.",
          "However, neuroscientists suggest that the biological mechanics of memory play an even bigger role. The brain does not encode every second of existence equally. Instead, it prioritizes novel experiences, complex information, and strong emotions. When we are young, the world is full of “firsts”—the first time riding a bike, first day of school, or first romantic relationship. These novelties require intense cognitive processing, creating dense, detailed memories.",
          "As we age, life falls into predictable routines. Commuting to work, managing daily chores, and performing familiar tasks require very little cognitive effort. Because the brain encounters less novel information, it lays down fewer dense memory markers. Consequently, when an adult looks back on the past month, there are fewer temporal landmarks, creating the psychological illusion that the month passed by extremely rapidly.",
          "This dynamic is clearly illustrated in the 'holiday paradox.' While you are on a vacation in a new, exotic environment, the days often feel expansive and long because the brain is constantly decoding new sights, sounds, and navigational challenges. However, when you return home and try to recall the trip weeks later, it feels as though it was incredibly brief.",
          "Our emotional state in the present moment also warps the internal clock. Fear and intense anxiety trigger the sudden release of adrenaline, causing the brain to sample visual and sensory data at a much higher frame rate than normal. This hyper-focus creates detailed memories that make scary events, such as a car accident, feel as though they occurred in slow motion.",
          "Understanding the elasticity of time perception offers a potential remedy to the feeling of life slipping away. By actively injecting novelty into our routines—such as traveling to unfamiliar places, learning complex new skills, or simply changing our daily commute—we can force the brain to record more temporal data, effectively slowing down the subjective passage of time."
        ],
        questions: [
          {
            id: 1,
            type: "short-answer",
            instruction: "Find the inconsistency. Read the article. Find one inconsistency in each statement. Write the correct version based on the text.",
            items: [
              { id: "1", text: "The subjective perception of time proves that physical time ticks away at a constantly varying pace.", answer: "Time is supposedly a constant, ticking away at an unvarying pace" },
              { id: "2", text: "According to the proportional theory, a year feels shorter to a fifty-year-old because they have fewer memories remaining.", answer: "To a fifty-year-old... a year is merely 2% of their life" },
              { id: "3", text: "The brain encodes every single second of an adult's routine life efficiently to create detailed psychological landmarks.", answer: "prioritizes novel experiences... lays down fewer dense memory markers" },
              { id: "4", text: "The holiday paradox describes how a vacation in an exotic location feels like it passes extremely quickly while you are experiencing it.", answer: "the days often feel expansive and long... when you return home... it feels as though it was incredibly brief" },
              { id: "5", text: "During terrifying moments, adrenaline reduces the brain's frame rate, causing people to forget the details of accidents.", answer: "sample visual and sensory data at a much higher frame rate... feel as though they occurred in slow motion" },
              { id: "6", text: "Scientists suggest that sticking to predictable daily routines is the best way to mentally stretch out the passage of time.", answer: "actively injecting novelty into our routines... effectively slowing down the subjective passage of time" }
            ]
          }
        ]
      }
    ]
  }
];
