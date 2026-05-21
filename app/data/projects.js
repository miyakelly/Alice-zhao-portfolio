export const projects = {
  "simplifying-data-access": {
    slug: "simplifying-data-access",
    heroImage: "/img/s3tables/heroimg-1.JPEG",
    title: "I designed a unified console that cut multi-service data access from hours to minutes for AWS storage customers",
    cardTitle: { main: "Streamlining data access", sub: "" },
    navTitle: "Streamlining data access",
    heroProblem: "Customers had no unified way to manage data access across AWS storage services. Each service had its own console, its own permission model, its own workflow.",
    heroSolution: "A single console that unifies data access management across all storage services, letting customers configure, monitor, and troubleshoot from one place instead of four.",
    impact: { hero: "A unified console for AWS storage customers", card: "Impact statement placeholder" },
    type: "AWS",
    year: "2024",
    role: "Lead UX Designer",
    timeline: "Jan 2025 - Jun 2025",
    team: [
      "5 PMs",
      "6 Managers",
      "7 Engineers",
      "3 Technical Writers",
      "2 Marketing Coordinators",
    ],
    tags: ["Cloud infrastructure", "0 → 1"],
    metrics: [
      { value: 34, label: "Customers onboarded in first month" },
      { value: 90, suffix: "%", label: "Customer satisfaction rate" },
      { value: 194, suffix: "%", label: "Month-over-month growth in 2 months" },
    ],
    sections: [
      {
        id: "problem",
        navLabel: "01 Problem",
        heading: "01 Problem.",
        content: {
          lead: "Two personas, four separate consoles, and hours of context-switching revealed the need for a unified data access experience.",
          subsections: [
            { label: "Who", text: "Storage Admins managing infrastructure across S3, FSx, EFS, and on-prem systems, and Developers struggling with cumbersome multi-service data access and repetitive task execution." },
            { label: "Why", text: "Each service had its own console, permission model, and workflow. That meant hours of context-switching, duplicated configuration, and integration failures." },
            { label: "What", text: "A single console that unifies data access management across all storage services, letting customers configure, monitor, and troubleshoot from one place instead of four." },
          ],
        },
      },
      {
        id: "design-iteration",
        navLabel: "02 Design Iteration",
        heading: "02 Design Iteration.",
        content: {
          lead: "Internal testing exposed that 40% of multi-step configurations failed midway, driving a fundamental rethink of the flow.",
          subsections: [
            { label: "Challenge", text: "Sequential API calls caused loss of customer input and partial failures. When a multi-step configuration failed midway, customers lost all their progress with no way to recover." },
            { label: "Iteration", text: "We implemented a pattern displaying all required steps upfront. The new flow showed customers the full scope of configuration before they started and preserved their input if any step failed." },
            { label: "Decision", text: "Replaced sequential API calls with upfront step display. All required configuration visible before starting, input preserved on failure." },
          ],
        },
      },
      {
        id: "outcome",
        navLabel: "03 Outcome",
        heading: "03 Outcome",
        summary: "Launched to GA with 34 customers in the first month, 90% satisfaction, and 194% month-over-month growth validating the unified approach",
        content: {
          summary: "The unified console launched to GA, onboarding 34 customers in the first month with a 90% satisfaction rate. Month-over-month growth hit 194% within two months, validating the bet on unified data access management.",
          reflection: "This project taught me that the biggest design wins often come from simplifying the system model, not the UI. The interface was straightforward — the hard part was convincing stakeholders that four separate experiences should become one.",
        },
        productVisuals: [
          { alt: "Unified console dashboard", placeholder: true },
          { alt: "Multi-step configuration flow", placeholder: true },
        ],
      },
    ],
    nextProject: "s3-tables",
  },

  "s3-tables": {
    slug: "s3-tables",
    heroImage: "/img/s3tables/s3table-heroimg.jpg",
    title: "Designing AWS S3 Tables that eliminates complex infrastructure for AI/ML workload",
    cardTitle: { main: "AWS S3 Tables", sub: "0→1 in 8 weeks" },
    navTitle: "AWS S3 Tables: 0 → 1 in 8 weeks",
    heroProblem: "Customers were wasting millions building and maintaining complex infrastructure for AI/ML workloads. I led a 20-person team to design S3 Tables — a new product to eliminate that complexity — from concept to launch in 8 weeks.",
    heroSolution: "S3 Tables, featured in {link:the 2024 AWS CEO keynote} {img:/img/s3tables/customers-inline-img/hero-text/000.jpg,/img/s3tables/customers-inline-img/hero-text/101.jpg,/img/s3tables/customers-inline-img/hero-text/102.jpg}, handles your infrastructure automatically, providing a seamless console experience that lets teams turn big data into insights in seconds.",
    impact: { hero: "A seamless console experience", card: "A seamless console experience that turns big data into insights in seconds" },
    type: "AWS",
    year: "2024",
    role: "UX Lead",
    timeline: "Aug 2024 - Nov 2024",
    team: [
      "20+ people team",
    ],
    tags: ["0 → 1", "Cloud infrastructure", "AI", "re:Invent keynote launch"],
    externalLink: {
      label: "[->]",
      url: "https://www.youtube.com/watch?v=eztA5VYH2nM",
    },
    metrics: [
      { value: 8, suffix: "weeks", label: "From concept to launch" },
      { value: 500, suffix: "+ TB", label: "Data stored in 6 months" },
      { value: 20, suffix: "%", label: "Adoption rate WoW growth" },
      { value: 97, suffix: "%", label: "Integration opt-in rate" },
      { value: 85, suffix: "%", label: "Console CSAT" },
    ],
    sections: [
      {
        id: "problem",
        navLabel: "01  Who and why",
        heading: "01  Who and why.",
        content: {
          lead: "Customers {img:/img/s3tables/customers-inline-img/Rectangle 101.jpg,/img/s3tables/customers-inline-img/Rectangle 102.jpg,/img/s3tables/customers-inline-img/Rectangle 104.jpg} don't want to burn millions storing tabular data in unstructured storage while spending months maintaining custom infrastructure. They need a solution to streamline basic operations so the team can focus on data querying.",
          subsections: [
            { label: "Research", text: "20+ customer interviews, 3 sales conversations, and 30+ survey responses across enterprise storage customers." },
            { label: "Target personas", text: "Data pros managing petabyte-scale pipelines and strategic leads evaluating infrastructure costs at billion-dollar companies." },
            { label: "Pain points", text: "Millions wasted on custom infrastructure for tabular data, manual maintenance of query engine integrations, and no native way to keep data up-to-date." },
          ],
          sectionImage: { src: "/img/s3tables/painpoint-graph.jpg", alt: "Customer pain point analysis" },
        },
      },
      {
        id: "scoping",
        navLabel: "02 Product scoping",
        heading: "02 Product scoping.",
        content: {
          lead: "To help the team focus on building the right thing within 8 weeks, I adapted a JTBD framework {img} that categorized every user action into six groups (Create, List, View, Manage, Delete, Audit), each mapped to console steps, preconditions, and API dependencies. It gave a 20-person team a shared language for making scope trade-offs under time pressure.",
          subsections: [
            { label: "Framework", text: "Each user action mapped to console steps, preconditions, and API dependencies across six groups: Create, List, View, Manage, Delete, and Audit." },
            { label: "Output", text: "A prioritized action plan with defined APIs, known limitations, and console impact, turning an ambiguous product space into a concrete roadmap for launch." },
          ],
        },
      },
      {
        id: "design-iteration",
        navLabel: "03 Design Iteration",
        heading: "03 Design Iteration.",
        content: {
          lead: "S3 Tables is a storage product, but the value for customers is querying their data. That requires connecting four services {img}: S3 for storage, Lake Formation for permissions, Glue Catalog for integration, and Athena for querying. The question was how to make four services feel like one.",
          subsections: [
            { label: "Exploration", text: "Three approaches with different trade-offs between customer effort and flexibility. The team aligned on a default-on option within the create flow, preserving choice while removing friction." },
            { label: "System extension", text: "Pushed back on the standard full-page pattern for namespace creation, proposing a multi-step modal and extending the design system to support it." },
            { label: "Result", text: "Reduced a multi-service integration to a single checkbox {img}, eliminating the infrastructure complexity that drove this project from the start." },
          ],
        },
      },
      {
        id: "outcome",
        navLabel: "04 Outcome",
        heading: "04 Outcome",
        headingAlign: "center",
        summary: "Launched at AWS re:Invent 2024 as the top announcement in the CEO keynote, with 500+ TB stored and 97% integration opt-in within 6 months",
        content: [
          {
            subheading: "Overall Summary",
            text: "S3 Tables launched at AWS re:Invent 2024, featured as the top announcement in CEO Matt Garman's keynote. It introduced native table capabilities to S3, enabling customers to store, manage, and query structured data for analytics and AI/ML workloads without custom infrastructure.",
            productVisuals: [
              { alt: "S3 Tables console overview", placeholder: true },
            ],
          },
          {
            subheading: "Seamless Integration",
            text: "What previously required custom-built infrastructure is now handled automatically. And the integration that originally required customers to configure across multiple AWS services is reduced to a single click during table bucket creation.",
            productVisuals: [
              { alt: "Integration flow with single-click setup", placeholder: true },
            ],
          },
          {
            subheading: "View and Manage Tabular Data",
            text: "Once created, customers manage their tables from a single console. Table bucket details, permission controls, and storage settings are all accessible without switching between services.",
            productVisuals: [
              { alt: "Table management console", placeholder: true },
            ],
          },
        ],
      },
      {
        id: "whats-next",
        navLabel: "05 What's Next",
        heading: "05 What's Next",
        summary: "The JTBD framework became the highest-leverage contribution, giving a 50-person team a shared language for trade-offs under time pressure",
        content: {
          reflection: "The biggest lesson was that the hardest design problem wasn't any single screen, it was creating the framework that let a 50-person team move fast on a brand new product category. The JTBD framework turned out to be my highest-leverage contribution: it didn't just define what we'd build, it gave everyone a shared language for making trade-offs under extreme time pressure.",
          futureImprovements: [
            {
              title: "Further streamline integration",
              description: "Based on customer feedback, we simplified the multi-service integration flow even further, reducing configuration steps and improving the default setup experience.",
              status: "launched",
            },
            {
              title: "redacted",
              description: "redacted",
              status: "launching-reinvent-2025",
              redacted: true,
            },
          ],
        },
      },
    ],
    nextProject: "agent-opportunities",
  },

  "agent-opportunities": {
    slug: "agent-opportunities",
    heroImage: "/img/s3tables/heroimg-1.JPEG",
    title: "",
    cardTitle: { main: "AWS agentic experience", sub: "Defining next phase" },
    navTitle: "AWS agentic experience",
    heroProblem: "",
    heroSolution: "",
    impact: { hero: "", card: "Impact statement placeholder" },
    type: "AWS",
    year: "2025 - present",
    role: "Lead UX Designer",
    timeline: "",
    team: [],
    tags: ["AI", "Featured"],
    metrics: [],
    sections: [
      {
        id: "problem",
        navLabel: "01 Problem",
        heading: "01 Problem",
        summary: "",
        content: { who: "", why: "", what: "" },
        research: { stats: [] },
      },
      {
        id: "design-iteration",
        navLabel: "02 Design Iteration",
        heading: "02 Design Iteration",
        summary: "",
        content: { challenge: "", iteration: "", decisions: [] },
      },
      {
        id: "outcome",
        navLabel: "03 Outcome",
        heading: "03 Outcome",
        summary: "",
        content: { summary: "", reflection: "" },
        productVisuals: [],
      },
    ],
    nextProject: "simplifying-data-access",
  },
};

export const projectOrder = [
  "s3-tables",
  "agent-opportunities",
];

export function getProject(slug) {
  return projects[slug] || null;
}

export function getAllSlugs() {
  return Object.keys(projects);
}
