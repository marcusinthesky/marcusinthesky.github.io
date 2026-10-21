import {
  circulationSchema,
  educationSchema,
  experienceSchema,
  methodSchema,
  openSourceContributionSchema,
  profileSchema,
  projectSchema,
  publicationSchema,
  writingSchema,
} from "./schema";

export const profile = profileSchema.parse({
  name: "Marcus Gawronsky",
  givenName: "Marcus",
  familyName: "Gawronsky",
  headline: "Applied AI · Quantitative Research · Research Engineering",
  summary:
    "Researcher and technical founder building AI systems, developing statistical methods and making quantitative research reproducible. Based in Cape Town, South Africa.",
  location: "Cape Town, South Africa",
  roles: ["Technology leader", "Quantitative researcher", "Research software engineer"],
  interests: [
    "Applied artificial intelligence",
    "Causal inference",
    "Information geometry",
    "Quantitative finance",
    "Reproducible research",
  ],
  links: [
    { label: "GitHub", url: "https://github.com/marcusinthesky" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/marcussky/" },
    { label: "ORCID", url: "https://orcid.org/0000-0003-0554-0850" },
    {
      label: "Google Scholar",
      url: "https://scholar.google.com/citations?hl=en&user=C_c7ZFEAAAAJ",
    },
    { label: "Hugging Face", url: "https://huggingface.co/marcusinthesky" },
    { label: "Kaggle", url: "https://www.kaggle.com/marcusgawronsky" },
  ],
});

export const publications = publicationSchema.array().parse([
  {
    slug: "information-games-strategic-crowding",
    title: "Information Games: Strategic Crowding and Firm Repositioning in Language-Model Space",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2026,
    status: "Preprint; accepted for World Finance & Banking Symposium, Riga (2026)",
    lede: "How does competition change firms' responses to opportunity in language-model space?",
    summary:
      "Develops a rational-share game of firm positioning, separating opportunity-driven reallocation from crowding and tracing how firms respond to changing peer structure in corporate news distributions.",
    keywords: ["strategic positioning", "language-model space", "computational finance"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2609.37820" }],
  },
  {
    slug: "wasserstein-barycentric-interaction-fields",
    title:
      "Wasserstein-Barycentric Interaction Fields for Spatial Factor Models: Evidence from Language-Model Representations",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2026,
    status: "Submitted / under review",
    lede: "Can distributional similarity define economically meaningful interaction fields?",
    summary:
      "Develops spatial factor structures from Wasserstein barycentres of textual representations, connecting distributional geometry with cross-sectional interaction.",
    keywords: ["spatial econometrics", "factor models", "optimal transport"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2608.29669" }],
  },
  {
    slug: "portfolio-risk-bounds",
    title:
      "Portfolio Risk Bounds without Cross-Asset Return Covariances: Distributional Fields from Language-Model Representations",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2026,
    status: "Submitted / under review",
    lede: "Can portfolio risk be bounded without estimating every cross-asset covariance directly?",
    summary:
      "Studies information-derived dependence structures and distributional fields as a route to portfolio-risk bounds under weaker covariance information.",
    keywords: ["portfolio risk", "distributional fields", "language models"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2608.29692" }],
  },
  {
    slug: "systematic-covariance-envelopes",
    title:
      "Systematic Covariance Envelopes from Wasserstein Geometry: Evidence from Language-Model Representations",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2024,
    status: "Preprint; presented at World Finance Conference, Malta (2025)",
    lede: "How much systematic covariance can be recovered from the geometry of probability-valued representations?",
    summary:
      "Uses Wasserstein geometry over language-model representations to study systematic covariance structure without treating text as a bag of features.",
    keywords: ["Wasserstein geometry", "representation learning", "covariance"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2410.23447" }],
  },
  {
    slug: "pricing-offshore-services",
    title: "Pricing Offshore Services: Evidence from the Paradise Papers",
    authors: ["Marcus Gawronsky"],
    year: 2021,
    status: "Master's thesis",
    summary:
      "An event study combining graph theory, network econometrics, and spatial econometrics to examine offshore-service pricing.",
    keywords: ["event study", "network econometrics", "Paradise Papers"],
    links: [{ label: "UCT repository", url: "https://open.uct.ac.za/handle/11427/36849" }],
  },
]);

export const projects = projectSchema.array().parse([
  {
    slug: "pricing-perspective",
    title: "Pricing Perspective",
    lede: "Can company information reveal economic relationships and financial risk?",
    summary:
      "A quantitative-finance research programme connecting language-model representations, optimal transport and portfolio risk, with software for empirical tests, simulation and formal verification.",
    narrative: [
      {
        text: "Pricing Perspective co-locates research manuscripts, data pipelines, simulations, formal Lean proofs, and a static publication website so that claims and evidence evolve atomically.",
        note: "In the pipeline, the Lean claim checks are inputs to the manuscript render stage.",
      },
      {
        text: "The research software connects financial data, mathematical models and empirical tests in a reproducible environment.",
        note: "The papers are connected in the pipeline as well as in argument: stages of each paper consume results produced by the others.",
      },
    ],
    role: "Research, modelling, software architecture, and reproducibility",
    technologies: ["Python", "Lean 4", "LaTeX", "Next.js", "Nix", "DVC"],
    featured: true,
    links: [
      { label: "Website", url: "https://marcusinthesky.github.io/PricingPerspective/" },
      { label: "GitHub", url: "https://github.com/marcusinthesky/PricingPerspective" },
    ],
    evidence: {
      figure: "reproducibility-graph",
      name: "Pipeline stage graph",
      question:
        "Can every number, figure and claim in the manuscripts be traced to the data, code and environment that produced it?",
      method:
        "The 88 DVC stages in dvc.yaml, grouped into families. An edge means a stage in one family declares an output of another as an input. A code-provenance stage hashes the source that every stage depends on.",
      observation:
        "The three papers share one corpus, one set of representations and one geometry layer, and cite one another's results. A change upstream re-runs every paper that depends on it.",
      limitation:
        "A snapshot of dvc.yaml at commit eb3c1b5 (6 September 2026). Families collapse many stages, and the Monte Carlo studies declare no inputs from the rest of the pipeline, so they appear unconnected.",
      source: {
        label: "dvc.yaml at eb3c1b5",
        url: "https://github.com/marcusinthesky/PricingPerspective/blob/eb3c1b523b797a180ebccbcf0f21310bf00c8661/dvc.yaml",
      },
    },
  },
  {
    slug: "precarious-papers",
    title: "Precarious Papers",
    lede: "What happens when hidden financial relationships become public?",
    summary:
      "An empirical investigation of offshore entities, leaked disclosures, network structure, and market pricing, combining event studies, graph theory, and reproducible analysis.",
    narrative: [
      "The project grew from the master's research programme and combines event-study design, graph structure, and reproducible analytical pipelines.",
    ],
    role: "Research and implementation",
    technologies: ["Python", "Jupyter", "Econometrics", "Graph theory"],
    featured: true,
    links: [{ label: "GitHub", url: "https://github.com/marcusinthesky/precarious-papers" }],
  },
  {
    slug: "solenya",
    title: "Solenya",
    lede: "Search and recommendations that work from the first request.",
    summary:
      "A multimodal discovery platform connecting text and image understanding with product search and recommendations, including for visitors without interaction history.",
    narrative: [
      "Solenya brings search, listings, recommendations, and agent workflows together around a shared product-discovery system.",
      "As co-founder and CTO, Marcus built a nine-person technical team and production inference infrastructure. A randomised retail experiment estimated a 27.14% revenue-per-user uplift (90% CI: 14.0%–41.9%).",
    ],
    role: "Co-founder & Chief Technology Officer",
    technologies: ["Multimodal AI", "Product discovery", "Recommendation systems"],
    featured: true,
    links: [
      { label: "Website", url: "https://www.solenya.ai/" },
      { label: "Published experiment", url: "https://www.solenya.ai/blog/24-ab-test-myrunway" },
    ],
  },
  {
    slug: "insitu",
    title: "insitu",
    lede: "Keep generated Markdown sections in sync with their source files.",
    summary:
      "A Python tool that keeps research documents connected to source files, queries and templates, with checks for stale content.",
    narrative: [
      "insitu marks generated regions in a document and refreshes them from declared project inputs.",
      "Its read-only check command can detect stale output without writing, while sync updates the managed sections in place.",
    ],
    role: "Creator and maintainer",
    technologies: ["Python", "Markdown", "Jinja", "Zensical"],
    featured: true,
    links: [{ label: "Website", url: "https://marcusinthesky.github.io/insitu/" }],
  },
  {
    slug: "talks",
    title: "Talks",
    lede: "Explaining technical ideas without flattening them.",
    summary:
      "Presentations for research, industry, and leadership audiences on machine learning, quantitative methods, reproducibility, and organisational strategy.",
    narrative: [
      "A public archive of presentation material designed to make technical ideas legible beyond their original room.",
    ],
    role: "Author and presenter",
    technologies: ["HTML", "Scientific communication", "Data visualisation"],
    featured: false,
    links: [{ label: "GitHub", url: "https://github.com/marcusinthesky/Talks" }],
  },
]);

export const writing = writingSchema.array().parse([
  {
    slug: "mega-ipos-ai-economic-measurement",
    title: "No returns: Mega-IPOs and the promise of AI as economic measurement",
    summary:
      "Mega-IPOs, the convergence of public and private markets, and the case for a new approach to financial measurement.",
    source: "Pricing Perspective",
    publishedAt: "2026-10-13",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/mega-ipos-ai-economic-measurement/",
    local: false,
  },
  {
    slug: "what-are-we-studying-ai-in-finance",
    title: "What are we actually studying when we study AI in finance?",
    summary:
      "AI in finance plays three distinct roles — a tool for financial practice, a source of economic change, and a means of measurement — and each demands different evidence.",
    source: "Pricing Perspective",
    publishedAt: "2026-10-09",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/what-are-we-studying-ai-in-finance/",
    local: false,
  },
  {
    slug: "language-models-markowitz-moment",
    title: "Do language models in finance need a Markowitz moment?",
    summary:
      "Language models read individual companies remarkably well; the harder question, as Markowitz taught finance, is what that information means together inside a portfolio.",
    source: "Pricing Perspective",
    publishedAt: "2026-10-07",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/language-models-markowitz-moment/",
    local: false,
  },
  {
    slug: "models-are-markup-tokens-are-features",
    title: "Models are Markup, Tokens are Features",
    summary:
      "A practical account of treating model structure as markup and token-specific adaptation as a feature-selection problem.",
    source: "Hugging Face",
    publishedAt: "2026-08-20",
    canonicalUrl:
      "https://huggingface.co/blog/marcusinthesky/models-are-markup-tokens-are-features",
    local: false,
  },
  {
    slug: "reproducibility-is-a-graph",
    title: "Reproducibility is a Graph",
    summary:
      "A reproducible result is not a folder of code. It is a dependency structure connecting data, assumptions, transformations, software, environments, and outputs.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-05",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/reproducibility-is-a-graph/",
    local: false,
  },
  {
    slug: "tidal-wave-of-ai-research-in-finance",
    title: "The Tidal Wave of AI Research in Finance",
    summary:
      "AI has expanded what can be measured in finance. It has also expanded the space of plausible-looking mistakes: a note on scale, validation, and methodological discipline.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-04",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/tidal-wave-of-ai-research-in-finance/",
    local: false,
  },
  {
    slug: "vintage-reproducible-ettax-models",
    title: "Vintage Reproducible ET Tax Models",
    summary:
      "Analytical results change when data, policy rules, assumptions, and software change. A practical note on preserving vintages so historical results stay reconstructable.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-03",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/vintage-reproducible-ettax-models/",
    local: false,
  },
  {
    slug: "beyond-average-revenue",
    title: "Beyond Average Revenue",
    summary:
      "An experiment-analysis perspective on commercial impact beyond a single average treatment effect.",
    source: "Solenya",
    publishedAt: "2026-05-06",
    canonicalUrl: "https://www.solenya.ai/blog/24-ab-test-myrunway",
    local: false,
  },
  {
    slug: "architecting-solenya-api-v1",
    title: "Architecting Solenya API V1",
    summary: "Design choices behind an applied-AI API and the infrastructure around it.",
    source: "Solenya",
    publishedAt: "2025-01-23",
    canonicalUrl: "https://www.solenya.ai/blog/23-ingredients-and-engine",
    local: false,
  },
  {
    slug: "what-is-zero-shot-discovery",
    title: "What is Zero-shot Discovery?",
    summary: "An introduction to finding useful structure without task-specific labelled examples.",
    source: "Solenya",
    publishedAt: "2024-01-03",
    canonicalUrl: "https://www.solenya.ai/blog/03-zs-discovery",
    local: false,
  },
]);

export const experience = experienceSchema.array().parse([
  {
    organization: "Solenya",
    role: "Co-Founder & Chief Technology Officer",
    location: "Cape Town, South Africa",
    period: "June 2024 — present",
    highlights: [
      "Built and led a nine-person team of engineers, researchers and data scientists across AI research, product development and infrastructure.",
      "Designed a randomised experiment spanning nearly one million sessions, estimating a 27.14% revenue-per-user uplift (90% CI: 14.0%–41.9%) for multimodal product discovery.",
      "Built production GPU infrastructure supporting over 250 inference requests per second at peak, with automated deployment, monitoring and disaster recovery.",
      "Led technical strategy, architecture, recruitment and supplier relationships; participated in fundraising and commercial engagements.",
    ],
  },
  {
    organization: "MyRunway",
    role: "Senior Data Scientist",
    location: "Cape Town, South Africa",
    period: "c. 2023 — April 2024",
    highlights: [
      "Developed experimentation and causal-measurement practices to evaluate commercial and operational decisions.",
      "Deployed vision-language and statistical pricing models, alongside optimisation and multi-agent simulation systems for retail operations.",
    ],
  },
  {
    organization: "MyRunway",
    role: "Data Scientist",
    location: "Cape Town, South Africa",
    period: "January 2021 — c. 2023",
    highlights: [
      "Built a cloud data warehouse and analytical infrastructure supporting pricing, purchasing and stock management for more than 45 business users.",
    ],
  },
  {
    organization: "DataProphet",
    role: "Junior Data Scientist",
    location: "Cape Town, South Africa",
    period: "August 2019 — January 2021",
    highlights: [
      "Delivered industrial machine-learning and digital-twin engagements for international manufacturers and equipment providers, combining model development, validation and client-facing technical work.",
    ],
  },
  {
    organization: "WorldQuant University, via Hubble Studios",
    role: "Financial Engineering Subject Matter Expert",
    location: "Cape Town, South Africa",
    period: "September 2018 — February 2019",
    highlights: [
      "Developed postgraduate learning materials in financial risk modelling, simulation, machine learning and macroeconomic modelling for the MSc in Financial Engineering.",
    ],
  },
  {
    organization: "NMRQL Research",
    role: "Research Intern",
    location: "Cape Town, South Africa",
    period: "May — July 2018",
    highlights: ["Applied natural-language models to financial risk-management problems."],
  },
]);

export const leadership = experienceSchema.array().parse([
  {
    organization: "University of Cape Town",
    role: "SRC Treasurer-General, Student Parliament Speaker & University Governance",
    location: "Cape Town, South Africa",
    period: "2015 — 2017",
    highlights: [
      "Served on university finance and student-funding committees, contributed to the 2016 UCT Fee Proposal, and helped raise over R2.5 million to support students facing financial exclusion.",
    ],
  },
  {
    organization: "University of Cape Town",
    role: "Vice-chair Debating Union",
    location: "Cape Town, South Africa",
    period: "2014",
    highlights: [
      "Vice-chair of UCT's oldest society, with over 150 years of history. Convenor of the 150th Year Open; competed at the Oxford and Cambridge IVs.",
    ],
  },
  {
    organization: "World Universities Debating Championship",
    role: "Director/Co-convenor",
    location: "Cape Town, South Africa",
    period: "2014 — 2015; 2019",
    highlights: [
      "Helped secure and deliver a championship involving approximately 950 participants. Managed more than 60 volunteers and staff, coordinating planning and fundraising. Helped secure R0.6 million in funding.",
    ],
  },
]);

export const education = educationSchema.array().parse([
  {
    institution: "University of Cape Town",
    qualification: "PhD Candidate in Finance",
    period: "2022 — expected 2027",
    summary: "Information geometry, representation learning and financial econometrics.",
  },
  {
    institution: "University of Cape Town",
    qualification: "MSc Statistics with Data Science (olim Advanced Analytics & Decision Science)",
    period: "2019 — 2021",
    summary: "Thesis: Pricing Offshore Services: Evidence from the Paradise Papers.",
  },
  {
    institution: "University of Cape Town",
    qualification: "BBusSc Finance, Banking and Investments (olim Finance)",
    period: "2014 — 2018",
    summary: "Economics minor. Class Medal in Natural Resource Economics.",
  },
]);

/** Where one idea appears across the work. Every reference is checked in data.test.ts. */
export const methods = methodSchema.array().parse([
  {
    slug: "optimal-transport",
    name: "Optimal transport and Wasserstein geometry",
    question:
      "What does the geometry of probability distributions say about the firms they describe?",
    publications: ["systematic-covariance-envelopes", "wasserstein-barycentric-interaction-fields"],
    projects: ["pricing-perspective"],
    writing: [],
    figures: [],
  },
  {
    slug: "covariance-structure",
    name: "Covariance and factor structure",
    question:
      "How much dependence between assets can be recovered, or bounded, without estimating it directly?",
    publications: [
      "systematic-covariance-envelopes",
      "wasserstein-barycentric-interaction-fields",
      "portfolio-risk-bounds",
    ],
    projects: ["pricing-perspective"],
    writing: [],
    figures: ["pca-cloud"],
  },
  {
    slug: "representation-learning",
    name: "Language-model representations",
    question:
      "Can a model's representation of a firm become a measurable object in quantitative finance?",
    publications: [
      "systematic-covariance-envelopes",
      "wasserstein-barycentric-interaction-fields",
      "portfolio-risk-bounds",
    ],
    projects: ["pricing-perspective"],
    writing: ["models-are-markup-tokens-are-features"],
    figures: [],
  },
  {
    slug: "network-econometrics",
    name: "Event studies and network econometrics",
    question:
      "What does the market learn when a network of financial relationships becomes public?",
    publications: ["pricing-offshore-services"],
    projects: ["precarious-papers"],
    writing: [],
    figures: [],
  },
  {
    slug: "simulation-and-uncertainty",
    name: "Simulation and uncertainty",
    question: "How far can an estimate be trusted, and how does randomness accumulate into a law?",
    publications: ["portfolio-risk-bounds"],
    projects: [],
    writing: ["beyond-average-revenue"],
    figures: ["galton-board", "monte-carlo-fan", "kalman-filter"],
  },
  {
    slug: "decisions-under-trade-offs",
    name: "Optimisation and decisions",
    question: "Which choice should be made when objectives conflict?",
    publications: ["portfolio-risk-bounds"],
    projects: [],
    writing: [],
    figures: ["pareto-frontier"],
  },
  {
    slug: "reproducible-research",
    name: "Reproducible research systems",
    question: "Can every result be traced to the data, code and environment that produced it?",
    publications: [],
    projects: ["pricing-perspective"],
    writing: [
      "reproducibility-is-a-graph",
      "vintage-reproducible-ettax-models",
      "tidal-wave-of-ai-research-in-finance",
    ],
    figures: ["reproducibility-graph"],
  },
]);

const preprints = publications.filter(({ links }) => links.some(({ label }) => label === "arXiv"));
const preprintYears = preprints.map(({ year }) => year);
const thesis = publications.find(({ slug }) => slug === "pricing-offshore-services");

/**
 * Where the work has been presented, deposited and published, by kind of
 * relationship. Details are derived from the records above where possible.
 */
export const circulation = circulationSchema.array().parse([
  {
    kind: "presentation",
    name: "World Finance & Banking Symposium",
    href: "https://www.world-finance-conference.com/conference.php?id=34",
  },
  {
    kind: "presentation",
    name: "World Finance Conference",
    href: "https://www.world-finance-conference.com/",
  },
  {
    kind: "paper",
    name: "arXiv",
    detail: `${preprints.length} preprints, ${Math.min(...preprintYears)}–${Math.max(...preprintYears)}`,
    href: "https://arxiv.org/search/?query=Gawronsky%2C+Marcus&searchtype=author",
  },
  {
    kind: "paper",
    name: "OpenUCT",
    detail: thesis ? `${thesis.status}, ${thesis.year}` : undefined,
    href: thesis?.links[0]?.url,
  },
  {
    kind: "software",
    name: "Hugging Face",
    href: "https://huggingface.co/marcusinthesky",
  },
  {
    kind: "software",
    name: "GitHub",
    detail: "Research code and public repositories",
    href: "https://github.com/marcusinthesky",
  },
  {
    kind: "education",
    name: "University of Cape Town",
    detail: education.map(({ qualification }) => qualification.split(" ")[0]).join(" · "),
    href: "/about/#education",
  },
]);

export const openSourceContributions = openSourceContributionSchema.array().parse([
  {
    project: "Hugging Face transformers",
    summary: "Proposed Optuna multi-objective hyperparameter optimisation support.",
    url: "https://github.com/huggingface/transformers/issues/25657",
  },
  {
    project: "Hugging Face peft",
    summary:
      "Contributed a sparse-matrix token fine-tuning implementation for selectively training token embeddings.",
    url: "https://github.com/huggingface/peft/pull/1541",
  },
]);
