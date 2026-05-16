export const projects = {
  "simplifying-data-access": {
    slug: "simplifying-data-access",
    heroImage: "/img/s3tables/heroimg-1.JPEG",
    title: "I designed a unified console that cut multi-service data access from hours to minutes for AWS storage customers",
    cardTitle: "Streamlining data access",
    navTitle: "Streamlining data access",
    heroProblem: "Customers had no unified way to manage data access across AWS storage services. Each service had its own console, its own permission model, its own workflow.",
    heroSolution: "A single console that unifies data access management across all storage services, letting customers configure, monitor, and troubleshoot from one place instead of four.",
    impact: "Impact statement placeholder",
    description: "A unified console for managing cloud infrastructure and data access across S3, FSx, EFS, and on-premises storage systems.",
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
        heading: "01 Problem",
        summary: "Two personas, four separate consoles, and hours of context-switching revealed the need for a unified data access experience",
        content: [
          { label: "Who", text: "Two key personas: **Storage Admins** managing infrastructure connecting storage services across S3, FSx, EFS, and on-prem systems — facing high costs and operational complexity when integrating third-party applications. **Developers** struggling with cumbersome multi-service data access and repetitive task execution." },
          { label: "Why", text: "Customers had no unified way to manage data access across AWS storage services. Each service had its own console, its own permission model, its own workflow. This meant hours of context-switching, duplicated configuration, and integration failures — especially when connecting on-premises systems." },
          { label: "What", text: "A single console that unifies data access management across all storage services — letting customers configure, monitor, and troubleshoot from one place instead of four." },
        ],
        research: {
          stats: [
            { value: "6", label: "Customer interviews" },
            { value: "3", label: "Sales conversations" },
            { value: "30+", label: "Survey responses" },
          ],
        },
      },
      {
        id: "design-iteration",
        navLabel: "02 Design Iteration",
        heading: "02 Design Iteration",
        summary: "Internal testing exposed that 40% of multi-step configurations failed midway, driving a fundamental rethink of the flow",
        content: {
          challenge: "Internal testing revealed that sequential API calls caused loss of customer input and partial failures. When a multi-step configuration failed midway, customers lost all their progress with no way to recover.",
          iteration: "We implemented a pattern displaying all required steps upfront, resolving durability issues. Instead of sequential calls that could fail silently, the new flow showed customers the full scope of configuration before they started — and preserved their input if any step failed.",
          decisions: [
            {
              before: "Sequential API calls — each step triggered independently, failures lost prior input",
              after: "Upfront step display — all required configuration visible before starting, input preserved on failure",
              why: "Internal testing showed 40% of multi-step configurations failed partway through, causing customer frustration and support tickets",
            },
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
    heroImage: "/img/s3tables/heroimg-1.JPEG",
    title: "Designing AWS S3 Tables that eliminates complex infrastructure for AI/ML workload",
    cardTitle: "AWS S3 Tables:\n0→1 in 8 weeks",
    navTitle: "AWS S3 Tables: 0 → 1 in 8 weeks",
    heroProblem: "Companies spend millions and months building and maintaining complex infrastructure for data analytics and AI/ML workloads.",
    heroSolution: "S3 Tables, {keynote}, handles your infrastructure automatically, providing a seamless console experience that lets teams turn big data into insights in seconds.",
    impact: "A seamless console experience that turns big data into insights in seconds",
    description: "Companies were spending millions building and maintaining custom infrastructure just to keep their data analytics running. S3 Tables handles that automatically, letting teams redirect engineering resources from maintenance to actual insights.",
    type: "AWS",
    year: "2024",
    role: "UX Lead",
    timeline: "Aug 2024 - Nov 2024",
    team: [
      "20+ people team",
    ],
    tags: ["0 → 1", "Cloud infrastructure", "AI", "re:Invent keynote launch"],
    keynote: {
      label: "featured in the 2024 AWS CEO keynote",
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
        navLabel: "01 The problem",
        heading: "01 The problem",
        summary: "The customers, their pain points, and what to build became clear after transcribing 20+ customer interviews with internal AI tools",
        content: [
          {
            label: "Customers",
            text: "Customers like the director of technology at a billion-dollar company are spending millions storing tabular data in an unstructured storage, while maintaining custom infrastructure just to keep that data ready for AI/ML workloads.",
            diagram: "imagine",
          },
          {
            label: "Problems",
            text: "Customers need a better way to improve basic operations like keeping data up-to-date, managing data access, and integrating with query engines, so they can allocate the resources and expertise for building products.",
            diagram: "problem",
          },
          {
            label: "What to build",
            text: "We decided to build S3 Tables, a new product that is designed for analytics and AI/ML workloads. It handles data maintenance and query engine integration automatically. The result is a streamlined experience where customers go from storing data to analyzing it without assembling anything in between.",
            diagram: "solution",
          },
        ],
      },
      {
        id: "design-iteration",
        navLabel: "02 Design Iteration",
        heading: "02 Design Iteration",
        summary: "Two core challenges shaped the product: scoping a new category in 8 weeks, and making four AWS services feel like one",
        content: [
          {
            label: "The First Challenge: Defining What to Build in 8 Weeks",
            text: "I faced two major challenges during this project. The first was scoping a brand new product for launch. We knew the shape at a high level, but with dozens of possible user actions and an 8-week timeline, the risk wasn't building the wrong thing, it was trying to build everything.",
            diagram: "scoping-chaos",
          },
          {
            label: "My Approach",
            text: "I adapted a JTBD framework I'd previously built to bring structure to a product with no existing UX precedent. The framework categorized every user action into six groups (Create, List, View, Manage, Delete, Audit), each mapped to console steps, preconditions, and API dependencies. More importantly, it gave a 50-person cross-functional team, including two directors, a shared language for making scope trade-offs under time pressure.",
            diagram: "scoping-organized",
          },
          {
            label: "Outcome",
            text: "The framework produced a prioritized list of user actions, each with defined APIs, known limitations, and console impact, turning an ambiguous product space into a concrete action plan for launch.",
            diagram: "scoping-prioritized",
          },
          {
            label: "The Next Challenge: Making Multi-Service Integration Effortless",
            text: "Once scope was locked, a second challenge emerged. S3 Tables is a storage product, but the value for customers is querying their data. That requires connecting four services: S3 for storage, Lake Formation for permissions, Glue Catalog for analytics service integration, and Athena for querying. The question wasn't whether to integrate, it was how to make four services feel like one.",
            diagram: "integration-challenge",
          },
          {
            label: "My Approach",
            text: "I explored three approaches, each with different trade-offs between customer effort and flexibility. The team aligned on a default-on option within the create flow, preserving choice while removing friction. I also pushed back on the standard full-page pattern for namespace creation, proposing a multi-step modal instead and extending the design system to support it.",
            diagram: "integration-options",
          },
          {
            label: "Outcome",
            text: "The final design reduced a multi-service integration to a single checkbox, further eliminating the infrastructure complexity that drove this project from the start. Customers create a table bucket and go straight to querying their data.",
            diagram: "integration-solution",
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "03 Outcome",
        heading: "03 Outcome",
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
        navLabel: "04 What's Next",
        heading: "04 What's Next",
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
    cardTitle: "Defining next phase of AWS agentic experience",
    navTitle: "AWS agentic experience",
    heroProblem: "",
    heroSolution: "",
    impact: "Impact statement placeholder",
    description: "",
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
  "simplifying-data-access",
  "s3-tables",
  "agent-opportunities",
];

export function getProject(slug) {
  return projects[slug] || null;
}

export function getAllSlugs() {
  return Object.keys(projects);
}
