// ── Chart data for all IELTS Writing Task 1 topics ───────────────────────────

export type SliceData = { label: string; value: number; color: string };
export type SeriesData = { name: string; color: string; values: number[] };

export type ChartConfig =
  | { type: "line"; title?: string; yLabel?: string; xLabels: string[]; series: SeriesData[] }
  | { type: "bar";  title?: string; yLabel?: string; groups: string[]; series: SeriesData[] }
  | { type: "pie";  title?: string; slices: SliceData[] }
  | { type: "dual-pie"; title1: string; title2: string; slices1: SliceData[]; slices2: SliceData[] }
  | { type: "table"; title?: string; headers: string[]; rows: { label: string; values: (number | string)[] }[] }
  | { type: "combo"; title?: string; xLabels: string[]; bars: SeriesData[]; line: SeriesData; barYLabel?: string; lineYLabel?: string }
  | { type: "process"; title?: string; steps: { label: string; sub?: string }[] }
  | { type: "map"; title1: string; title2: string; features1: string[]; features2: string[] };

export const CHART_CONFIGS: Record<string, ChartConfig> = {

  // ── LINE GRAPHS ────────────────────────────────────────────────────────────
  t1_line_01: {
    type: "line",
    title: "Adults Using Social Media Daily (%) · 2015–2024",
    yLabel: "% adults",
    xLabels: ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
    series: [
      { name: "USA",       color: "#3B82F6", values: [62,65,68,71,74,76,79,81,83,85] },
      { name: "UK",        color: "#8B5CF6", values: [55,58,61,64,67,70,72,74,76,78] },
      { name: "Brazil",    color: "#10B981", values: [48,52,57,62,67,72,76,79,82,84] },
      { name: "S. Korea",  color: "#F59E0B", values: [72,75,77,79,82,84,86,88,90,92] },
    ],
  },

  t1_line_02: {
    type: "line",
    title: "Global Surface Temperature Anomaly (°C) · 1980–2024",
    yLabel: "°C vs baseline",
    xLabels: ["1980","1984","1988","1992","1996","2000","2004","2008","2012","2016","2020","2024"],
    series: [
      { name: "Observed",             color: "#EF4444", values: [0.28,0.16,0.40,0.23,0.34,0.42,0.56,0.54,0.65,0.99,1.02,1.35] },
      { name: "Current Policy (proj.)",color: "#F97316", values: [0.28,0.16,0.40,0.23,0.34,0.42,0.56,0.54,0.65,0.99,1.12,1.55] },
      { name: "Net-Zero (proj.)",      color: "#10B981", values: [0.28,0.16,0.40,0.23,0.34,0.42,0.56,0.54,0.65,0.99,1.05,1.15] },
    ],
  },

  t1_line_03: {
    type: "line",
    title: "Unemployment Rate (%) · Germany, Spain, Poland · 2010–2024",
    yLabel: "%",
    xLabels: ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
    series: [
      { name: "Germany", color: "#3B82F6", values: [7.1,5.9,5.5,5.2,5.0,4.6,4.2,3.8,3.4,3.0,3.7,3.6,3.0,2.9,3.0] },
      { name: "Spain",   color: "#EF4444", values: [20.1,21.7,24.8,26.1,24.4,22.1,19.6,17.2,15.2,14.1,15.5,14.8,12.9,11.8,11.5] },
      { name: "Poland",  color: "#F59E0B", values: [9.6,9.7,10.1,10.3,9.0,7.5,6.2,5.0,3.9,3.3,3.2,3.4,2.9,2.9,3.1] },
    ],
  },

  t1_line_04: {
    type: "line",
    title: "Type 2 Diabetes Cases per 100,000 · 2000–2023",
    yLabel: "per 100k",
    xLabels: ["2000","2003","2006","2009","2012","2015","2018","2021","2023"],
    series: [
      { name: "North America",    color: "#3B82F6", values: [4200,4800,5600,6400,7100,7800,8600,9200,9800] },
      { name: "Europe",           color: "#8B5CF6", values: [3500,3900,4300,4800,5400,5900,6400,6900,7200] },
      { name: "South Asia",       color: "#F59E0B", values: [5800,6500,7500,8600,9800,11200,12800,14500,16200] },
      { name: "Sub-Saharan Africa",color: "#10B981", values: [2100,2400,2700,3100,3600,4200,4900,5600,6200] },
    ],
  },

  t1_line_05: {
    type: "line",
    title: "Online vs On-Campus Enrolment (%) · 2015–2024",
    yLabel: "% of students",
    xLabels: ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
    series: [
      { name: "On-campus", color: "#3B82F6", values: [82,80,78,75,72,45,58,64,68,70] },
      { name: "Online",    color: "#F59E0B", values: [18,20,22,25,28,55,42,36,32,30] },
    ],
  },

  // ── BAR CHARTS ─────────────────────────────────────────────────────────────
  t1_bar_01: {
    type: "bar",
    title: "Weekly Smartphone Hours by Activity · 6 Countries (2024)",
    yLabel: "hrs/week",
    groups: ["USA","UK","India","Brazil","Japan","Germany"],
    series: [
      { name: "Social Media", color: "#3B82F6", values: [3.2,2.8,4.1,3.9,2.3,2.2] },
      { name: "Video",        color: "#8B5CF6", values: [2.8,2.5,3.6,3.2,2.8,2.4] },
      { name: "Messaging",    color: "#10B981", values: [1.9,1.7,2.8,2.4,2.1,1.8] },
      { name: "Work/Study",   color: "#F59E0B", values: [1.6,1.8,1.5,1.2,2.2,2.0] },
    ],
  },

  t1_bar_02: {
    type: "bar",
    title: "Renewable Electricity Share (%) · 8 Countries",
    yLabel: "%",
    groups: ["Norway","Germany","UK","France","USA","China","India","Australia"],
    series: [
      { name: "2010", color: "#93C5FD", values: [96,17,10,19,11, 9,14,10] },
      { name: "2017", color: "#3B82F6", values: [97,35,29,23,17,26,18,16] },
      { name: "2024", color: "#1D4ED8", values: [98,59,45,28,24,33,25,35] },
    ],
  },

  t1_bar_03: {
    type: "bar",
    title: "Loneliness 'Often/Always' by Age Group & Gender (%)",
    yLabel: "%",
    groups: ["18–29","30–44","45–59","60+"],
    series: [
      { name: "Men",   color: "#3B82F6", values: [22,18,16,20] },
      { name: "Women", color: "#EC4899", values: [26,22,19,24] },
    ],
  },

  t1_bar_04: {
    type: "bar",
    title: "Annual Household Expenditure by Category (USD, 2023)",
    yLabel: "USD",
    groups: ["Housing","Food","Transport","Healthcare","Education","Entertain.","Clothing"],
    series: [
      { name: "Japan",   color: "#EF4444", values: [14200,6800,3200,4100,2800,3600,1800] },
      { name: "Brazil",  color: "#10B981", values: [4800,5200,2800,1900,1200,1600,1100] },
      { name: "Nigeria", color: "#F59E0B", values: [1200,2800,900,600,400,300,350] },
    ],
  },

  t1_bar_05: {
    type: "bar",
    title: "PISA Scores by Subject · 7 Countries (2022)",
    yLabel: "Score",
    groups: ["Singapore","Japan","S. Korea","Canada","UK","USA","Brazil"],
    series: [
      { name: "Reading", color: "#3B82F6", values: [543,516,514,507,501,504,410] },
      { name: "Maths",   color: "#8B5CF6", values: [575,536,527,497,489,478,379] },
      { name: "Science", color: "#10B981", values: [561,547,528,515,520,502,403] },
    ],
  },

  // ── PIE CHARTS ─────────────────────────────────────────────────────────────
  t1_pie_01: {
    type: "dual-pie",
    title1: "Household Energy (2004)",
    title2: "Household Energy (2024)",
    slices1: [
      { label: "Natural Gas",  value: 38, color: "#F59E0B" },
      { label: "Electricity",  value: 28, color: "#3B82F6" },
      { label: "Oil",          value: 22, color: "#6B7280" },
      { label: "Renewables",   value:  8, color: "#10B981" },
      { label: "Other",        value:  4, color: "#8B5CF6" },
    ],
    slices2: [
      { label: "Electricity",  value: 42, color: "#3B82F6" },
      { label: "Natural Gas",  value: 26, color: "#F59E0B" },
      { label: "Renewables",   value: 24, color: "#10B981" },
      { label: "Oil",          value:  6, color: "#6B7280" },
      { label: "Other",        value:  2, color: "#8B5CF6" },
    ],
  },

  t1_pie_02: {
    type: "dual-pie",
    title1: "City Dwellers (2023)",
    title2: "Rural Dwellers (2023)",
    slices1: [
      { label: "Work Opportunities", value: 35, color: "#3B82F6" },
      { label: "Entertainment",      value: 22, color: "#8B5CF6" },
      { label: "Healthcare",         value: 18, color: "#10B981" },
      { label: "Education",          value: 15, color: "#F59E0B" },
      { label: "Family",             value: 10, color: "#EF4444" },
    ],
    slices2: [
      { label: "Lower Cost",     value: 30, color: "#10B981" },
      { label: "Quality of Life",value: 28, color: "#3B82F6" },
      { label: "Remote Work",    value: 22, color: "#8B5CF6" },
      { label: "Environment",    value: 12, color: "#F59E0B" },
      { label: "Community",      value:  8, color: "#EF4444" },
    ],
  },

  t1_pie_03: {
    type: "dual-pie",
    title1: "Internet Traffic (2015)",
    title2: "Internet Traffic (2025)",
    slices1: [
      { label: "Video",        value: 42, color: "#EF4444" },
      { label: "Social Media", value: 22, color: "#3B82F6" },
      { label: "Gaming",       value: 15, color: "#8B5CF6" },
      { label: "Web Browse",   value: 12, color: "#10B981" },
      { label: "E-commerce",   value:  6, color: "#F59E0B" },
      { label: "Other",        value:  3, color: "#6B7280" },
    ],
    slices2: [
      { label: "Video",        value: 58, color: "#EF4444" },
      { label: "Social Media", value: 18, color: "#3B82F6" },
      { label: "Gaming",       value: 12, color: "#8B5CF6" },
      { label: "E-commerce",   value:  7, color: "#F59E0B" },
      { label: "Web Browse",   value:  4, color: "#10B981" },
      { label: "Other",        value:  1, color: "#6B7280" },
    ],
  },

  // ── TABLES ─────────────────────────────────────────────────────────────────
  t1_table_01: {
    type: "table",
    title: "Health Indicators by Country (2023)",
    headers: ["Country", "Life Expectancy", "Infant Mortality (/1k births)", "Health Spend (USD/capita)"],
    rows: [
      { label: "Japan",   values: ["84.3 yrs", "1.8",  "$4,150"]  },
      { label: "Germany", values: ["81.2 yrs", "3.1",  "$7,220"]  },
      { label: "USA",     values: ["78.9 yrs", "5.4",  "$12,530"] },
      { label: "Brazil",  values: ["74.6 yrs", "12.8", "$1,240"]  },
      { label: "India",   values: ["69.8 yrs", "25.3", "$73"]     },
      { label: "Nigeria", values: ["54.7 yrs", "72.1", "$26"]     },
    ],
  },

  t1_table_02: {
    type: "table",
    title: "Tertiary Education & Graduate Outcomes (2010 vs 2023)",
    headers: ["Country", "Tertiary % 2010", "Tertiary % 2023", "Avg. Start Salary", "Grad Unemployment"],
    rows: [
      { label: "South Korea", values: ["40%","52%","$38,000","8.2%"]  },
      { label: "USA",         values: ["38%","46%","$52,000","5.1%"]  },
      { label: "UK",          values: ["35%","44%","$31,000","6.4%"]  },
      { label: "Germany",     values: ["26%","34%","$40,000","3.8%"]  },
      { label: "Brazil",      values: ["11%","22%","$12,000","14.2%"] },
    ],
  },

  t1_table_03: {
    type: "table",
    title: "Top 10 Countries by CO₂ Emissions Per Capita (2023)",
    headers: ["Country", "Per Capita (t)", "Total (Mt)", "Population (M)", "Change since 2010"],
    rows: [
      { label: "Qatar",        values: ["31.7","63","2.0",  "-12%"] },
      { label: "Kuwait",       values: ["25.3","97","3.8",  "-8%"]  },
      { label: "UAE",          values: ["22.5","246","10.9","-5%"]  },
      { label: "Australia",    values: ["14.9","386","25.9","-18%"] },
      { label: "USA",          values: ["13.8","4,577","331","-22%"] },
      { label: "Canada",       values: ["13.1","519","39.6","-20%"] },
      { label: "Russia",       values: ["12.9","1,872","145","+3%"] },
      { label: "Saudi Arabia", values: ["12.5","633","35",  "-2%"]  },
      { label: "South Korea",  values: ["11.2","581","51.7","-15%"] },
      { label: "Japan",        values: ["8.5","1,072","125","-26%"] },
    ],
  },

  // ── MIXED CHARTS ───────────────────────────────────────────────────────────
  t1_mixed_01: {
    type: "combo",
    title: "EV Sales (M units) & Avg. Price (USD k) · 2019–2024",
    xLabels: ["2019","2020","2021","2022","2023","2024"],
    bars: [
      { name: "China",  color: "#EF4444", values: [1.2,1.3,3.3,6.9,8.1,9.7] },
      { name: "Europe", color: "#3B82F6", values: [0.6,1.4,2.3,2.7,3.2,3.8] },
      { name: "USA",    color: "#10B981", values: [0.3,0.3,0.6,1.0,1.6,2.2] },
    ],
    line: { name: "Avg. Price ($k)", color: "#8B5CF6", values: [56,54,50,48,43,39] },
    barYLabel: "Sales (M units)",
    lineYLabel: "Price ($k)",
  },

  t1_mixed_02: {
    type: "dual-pie",
    title1: "Employment by Sector (1990)",
    title2: "Employment by Sector (2023)",
    slices1: [
      { label: "Manufacturing", value: 35, color: "#3B82F6" },
      { label: "Services",      value: 30, color: "#8B5CF6" },
      { label: "Agriculture",   value: 28, color: "#10B981" },
      { label: "Technology",    value:  3, color: "#F59E0B" },
      { label: "Other",         value:  4, color: "#6B7280" },
    ],
    slices2: [
      { label: "Services",      value: 48, color: "#8B5CF6" },
      { label: "Technology",    value: 18, color: "#F59E0B" },
      { label: "Manufacturing", value: 20, color: "#3B82F6" },
      { label: "Agriculture",   value:  5, color: "#10B981" },
      { label: "Other",         value:  9, color: "#6B7280" },
    ],
  },

  t1_mixed_03: {
    type: "line",
    title: "Global Obesity Prevalence (% adults) · 1990–2025",
    yLabel: "% adults",
    xLabels: ["1990","1995","2000","2005","2010","2015","2020","2025"],
    series: [
      { name: "High-Income Countries", color: "#EF4444", values: [18,21,24,27,30,33,36,39] },
      { name: "Low-Income Countries",  color: "#F59E0B", values: [5,6,8,10,13,16,19,22]   },
    ],
  },

  // ── PROCESS DIAGRAMS ───────────────────────────────────────────────────────
  t1_proc_01: {
    type: "process",
    title: "Municipal Solid Waste Management Process",
    steps: [
      { label: "Household Collection",    sub: "Bins & kerbside pickup" },
      { label: "Sorting Facility",        sub: "Automated + manual separation" },
      { label: "Recyclable Materials",    sub: "→ Recycling plants" },
      { label: "Organic Waste",           sub: "→ Composting / Biogas" },
      { label: "Combustible Waste",       sub: "→ Incineration / Energy recovery" },
      { label: "Residual Waste",          sub: "→ Engineered landfill" },
    ],
  },

  t1_proc_02: {
    type: "process",
    title: "Stages in Training a Large Language AI Model",
    steps: [
      { label: "Data Collection",       sub: "Web, books, code, structured data" },
      { label: "Preprocessing",         sub: "Deduplication, cleaning, filtering" },
      { label: "Tokenisation",          sub: "Text → token sequences" },
      { label: "Pre-training",          sub: "Self-supervised next-token prediction" },
      { label: "Supervised Fine-tuning",sub: "Labelled instruction-response pairs" },
      { label: "RLHF / Alignment",      sub: "Reward model + PPO optimisation" },
      { label: "Safety Evaluation",     sub: "Red-teaming, bias & harm testing" },
      { label: "Deployment",            sub: "API, inference, monitoring" },
    ],
  },

  t1_proc_03: {
    type: "process",
    title: "The Urban Water Cycle",
    steps: [
      { label: "Precipitation",        sub: "Rain & snow over the urban area" },
      { label: "Surface Runoff",       sub: "Hard surfaces accelerate flow" },
      { label: "Stormwater Drains",    sub: "Collected in drainage network" },
      { label: "Wastewater Treatment", sub: "Filtration + biological treatment" },
      { label: "River / Reservoir",    sub: "Treated water discharged" },
      { label: "Evapotranspiration",   sub: "Parks, trees & open water" },
      { label: "Cloud Formation",      sub: "Cycle repeats" },
    ],
  },

  // ── MAPS ───────────────────────────────────────────────────────────────────
  t1_map_01: {
    type: "map",
    title1: "Merriport — 1985",
    title2: "Merriport — 2025",
    features1: [
      "🌊 Small fishing harbour (south coast)",
      "🏘️ Compact residential centre",
      "🌾 Farmland stretching north",
      "🌲 Woodland to the east",
      "🛣️ Single main road through town",
    ],
    features2: [
      "🏭 New industrial port (south-east)",
      "🛣️ Motorway bypass (western edge)",
      "🌿 Nature reserve (east woodland)",
      "🏘️ Large residential expansion (north)",
      "🛒 Retail park near bypass junction",
    ],
  },

  t1_map_02: {
    type: "map",
    title1: "University Campus — 2000",
    title2: "University Campus — 2025",
    features1: [
      "📚 Central library (main building)",
      "🏋️ Sports hall (north-west)",
      "🏫 Lecture theatres (central)",
      "🅿️ Surface car parks (multiple)",
      "🌳 Small green spaces between buildings",
    ],
    features2: [
      "💻 Digital learning centre (library site)",
      "🏠 Student accommodation blocks (east)",
      "🌳 Outdoor green space & amphitheatre",
      "🚲 Cycling paths throughout campus",
      "🏋️ New multi-sport complex (north)",
    ],
  },

  t1_map_03: {
    type: "map",
    title1: "Industrial District — 1970",
    title2: "Mixed-Use Neighbourhood — 2025",
    features1: [
      "🏭 Large warehouses (central area)",
      "🏗️ Factories lining the river",
      "🚂 Freight railway line",
      "🛣️ Heavy goods vehicle access roads",
      "🚫 No residential buildings",
    ],
    features2: [
      "🏢 Office towers (former factory sites)",
      "🏘️ Residential apartments along river",
      "🛍️ Retail & dining zone (central)",
      "🌳 Riverside park & green corridor",
      "🚇 New light rail stop (central)",
    ],
  },
};
