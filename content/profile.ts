/**
 * Everything hand-written on the site lives in this file.
 * Edit text here; the layout and the live GitHub data take care of the rest.
 */

export type Project = {
  /** GitHub repo name. Live data (last push, status, demo link) is matched on this. */
  repo: string;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  /** How it came to exist: hackathon, solo build, learning build. */
  context: string;
  stack: string[];
};

export type ExperienceEntry = {
  /** Shown as "start — end", for example "Aug 2026 — Present". */
  start: string;
  end: string;
  role: string;
  org: string;
  /** Optional link for the organisation. */
  url?: string;
  body: string;
  tags: string[];
};

export const profile = {
  name: "Sudharsan S",
  handle: "5nss",
  role: "AI-native builder",
  tagline: "I turn specs into shipped systems, with AI agents in the loop.",
  /** Words that cycle after "building" under your name. */
  building: ["AI agents", "backend systems", "spec-first products", "things that ship"],
  location: "Coimbatore, IN",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  openToWork: true,

  /** Wrap a phrase in **double stars** to highlight it. */
  about: [
    "I'm Sudharsan, a mechanical engineering student at **GCT Coimbatore** and a **Siemens Scholar** who got pulled into software. I like building systems end to end: a clear spec, a working backend, and something a person can actually use.",
    "I build the AI-native way. AI coding agents do most of the typing. My job is the part that decides whether it works: scoping the problem, setting the architecture, and verifying the result before I call it done. Right now I do that as an intern at a **stealth startup**, building AI agents and backend features for the product.",
    "Before that I interned at **The Yellow Network**, where I was chosen to represent Cohort 3, and I run alumni relations for **gSARC**. My mechanical background keeps pulling me toward problems where software meets physical systems, like predictive maintenance.",
  ],

  links: {
    github: "https://github.com/5nss",
    linkedin: "https://linkedin.com/in/sudharsan-s-9652b1331",
    // Leave empty to hide the button. Fill in to show it.
    email: "sudharsansenthil5nss@gmail.com",
    resume: "",
  },

  lookingFor: "Internships and early roles in AI agents, backend and product engineering.",
} as const;

/** The loop shown under About. It is how the projects below were actually built. */
export const buildLoop = [
  { key: "Spec", title: "Write the spec", body: "Every build starts with a written source of truth. The repos carry their specs." },
  { key: "Agent", title: "Direct the agents", body: "AI coding agents do the typing. I set scope, constraints and architecture." },
  { key: "Build", title: "Assemble", body: "FastAPI and Python on the backend, TypeScript on the front." },
  { key: "Verify", title: "Verify, then claim", body: "The database is the truth, not the UI. Nothing is done until it has run." },
  { key: "Ship", title: "Ship and demo", body: "Working end to end beats a long feature list." },
] as const;

/** Newest first. Edit the dates here. */
export const experience: ExperienceEntry[] = [
  {
    start: "Sep 2026",
    end: "Present",
    role: "AI and Backend Intern",
    org: "Stealth startup",
    body: "Building new AI agents, developing backend features for the product, and owning pieces of work from idea to shipped.",
    tags: ["AI agents", "Backend", "Python", "Product ownership"],
  },
  {
    start: "Aug 2026",
    end: "Oct 2026",
    role: "Intern, Cohort 3 Representative",
    org: "The Yellow Network",
    url: "https://www.linkedin.com/company/the-yellow-network",
    body: "Selected to represent and coordinate Cohort 3 across the program while working on real-world AI and software projects.",
    tags: ["AI", "Software", "Leadership"],
  },
  {
    start: "Sep 2026",
    end: "Present",
    role: "Alumni Relations Manager",
    org: "gSARC, GCT Coimbatore",
    body: "Stepped up after a year of volunteering to strengthen the alumni network and connect students with graduates.",
    tags: ["Community", "Communication"],
  },
  {
    start: "Feb 2025",
    end: "Present",
    role: "Siemens Scholar",
    org: "Siemens",
    url: "https://www.siemens.com",
    body: "Merit-based scholarship for engineering students in India, with training in mechatronics, automation and digital technologies.",
    tags: ["Scholarship", "Mechatronics", "Automation"],
  },
  {
    start: "2024",
    end: "2028",
    role: "BE Mechanical Engineering",
    org: "Government College of Technology, Coimbatore",
    body: "Member of the Cyber Physical Systems Club and gSARC.",
    tags: ["Engineering"],
  },
];

export const projects: Project[] = [
  {
    repo: "fixflow",
    name: "FixFlow",
    tagline: "Smart fault reporting and resolution",
    summary:
      "Replaces informal equipment-fault reporting in colleges, labs and plants with one trackable workflow. A fault becomes a ticket on a shared dashboard that maintenance staff move from open to resolved.",
    highlights: [
      "Smart Fault Assistant suggests a category, flags likely duplicates and surfaces safety wording, with no API key required",
      "Backend is the source of truth: the interface never shows a report as saved unless the database says so",
    ],
    context: "Hackathon · C1X · CareerNova",
    stack: ["FastAPI", "SQLModel", "React", "TypeScript", "Vite"],
  },
  {
    repo: "Flowstate",
    name: "Flowstate",
    tagline: "Drop-in workflow builder",
    summary:
      "A framework-agnostic workflow builder shipped as a single Web Component. Drag nodes onto a canvas, wire them into a campaign flow and export a clean JSON graph.",
    highlights: [
      "Shadow DOM isolation, so it drops into React, Angular or legacy pages with zero style leakage",
      "Cycle detection blocks invalid loops before export",
    ],
    context: "Hackathon · C1X · CareerNova",
    stack: ["TypeScript", "Web Components", "litegraph.js", "Vite"],
  },
  {
    repo: "ai-decision-tracker",
    name: "AI Decision Tracker",
    tagline: "Learn from your own decisions",
    summary:
      "Log a decision with your reasoning and expected outcome, come back with what actually happened, and see where your thinking was off and which mistakes you keep repeating.",
    highlights: [
      "Three-layer memory: raw decisions, extracted features, long-term behaviour patterns",
      "Gemini-powered analysis with a rule-based fallback, so it keeps working without an API key",
    ],
    context: "Solo build",
    stack: ["FastAPI", "SQLAlchemy", "Gemini API", "JavaScript"],
  },
  {
    repo: "pump",
    name: "Pump Failure Predictor",
    tagline: "Predictive maintenance for centrifugal pumps",
    summary:
      "A sensor-data pipeline that engineers features and trains a classifier to flag pump failures early. This is where my mechanical background meets machine learning.",
    highlights: [
      "End-to-end pipeline: data loading, feature engineering, Random Forest, evaluation",
      "Runs on synthetic demo data: a proof of approach, not a field deployment",
    ],
    context: "Solo build",
    stack: ["Python", "pandas", "scikit-learn"],
  },
  {
    repo: "DATALab-API",
    name: "DataLab API",
    tagline: "Analytics backend for CSV data",
    summary:
      "Upload a CSV and get dataset summaries, correlation analysis and z-score anomaly detection back through a clean REST API.",
    highlights: ["Built to learn FastAPI properly, end to end"],
    context: "Learning build",
    stack: ["FastAPI", "SQLAlchemy", "SQLite", "pandas", "NumPy"],
  },
];

export const stack = [
  { label: "Core", items: ["Python", "FastAPI", "SQLAlchemy / SQL", "pandas", "NumPy"] },
  { label: "AI", items: ["AI agents", "LLM APIs (Gemini)", "Spec-driven AI development", "scikit-learn", "XGBoost"] },
  { label: "Also", items: ["TypeScript", "React", "Java", "C++", "Git"] },
] as const;

export const signals = [
  { label: "Siemens Scholar", detail: "Merit scholarship, since 2025" },
  { label: "NPTEL Programming in Java", detail: "87 / 100 · IIT Kharagpur" },
  { label: "Cohort 3 Representative", detail: "The Yellow Network" },
  { label: "Languages", detail: "English · German (elementary)" },
] as const;
