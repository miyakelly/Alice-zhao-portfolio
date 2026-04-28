export const projects = {
  "simplifying-data-access": {
    slug: "simplifying-data-access",
    title: "I designed a unified console that cut multi-service data access from hours to minutes for AWS storage customers",
    cardTitle: "Simplifying\nData Access",
    description: "A unified console for managing cloud infrastructure and data access across S3, FSx, EFS, and on-premises storage systems.",
    cardDescription: "Designed a unified console that cut multi-service data access from hours to minutes for AWS storage customers.",
    gridClass: "cell-lab1",
    year: "2025",
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
        heading: "Who, Why, and What",
        content: {
          who: "Two key personas: **Storage Admins** managing infrastructure connecting storage services across S3, FSx, EFS, and on-prem systems — facing high costs and operational complexity when integrating third-party applications. **Developers** struggling with cumbersome multi-service data access and repetitive task execution.",
          why: "Customers had no unified way to manage data access across AWS storage services. Each service had its own console, its own permission model, its own workflow. This meant hours of context-switching, duplicated configuration, and integration failures — especially when connecting on-premises systems.",
          what: "A single console that unifies data access management across all storage services — letting customers configure, monitor, and troubleshoot from one place instead of four.",
        },
        aiCallout: {
          icon: "claude",
          text: "Synthesized 30+ survey responses and 6 customer interviews → surfaced 4 key pain points and 2 core personas in hours",
        },
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
        heading: "Challenges and Iteration",
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
        aiCallout: {
          icon: "kiro",
          text: "Built 3 interactive prototypes in 2 days → tested multi-step flows with real interactions instead of Figma clickthroughs",
        },
      },
      {
        id: "outcome",
        navLabel: "03 Outcome",
        heading: "Shipped Product and Results",
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
    title: "Designing S3 Tables that eliminates complex infrastructure for AI/ML workload",
    cardTitle: "S3 Tables:\n0 → 1 in 8 Weeks",
    description: "Amazon S3 Tables: a purpose-built storage type for analytics workloads that automatically optimizes tabular data in Apache Iceberg format, eliminating the need for customers to build and maintain their own table management infrastructure.",
    cardDescription: "Led UX from scratch on a completely new S3 resource type, defining the full product experience on an aggressive timeline.",
    gridClass: "cell-s3",
    year: "2024",
    role: "Lead UX Designer",
    timeline: "Aug 2024 - Nov 2024",
    team: [
      "2 UX Designers",
      "4 PMs",
      "3 UX Writers",
      "1 Marketing Manager",
      "~40 Engineers and SDMs",
    ],
    tags: ["0 → 1", "Cloud infrastructure", "AI"],
    metrics: [
      { value: 12, suffix: ".7k", label: "Table buckets created in 6 months" },
      { value: 48, suffix: ".5k", label: "Tables created (8.1% WoW growth)" },
      { value: 411, suffix: " TB", label: "Data stored" },
    ],
    sections: [
      {
        id: "problem",
        navLabel: "01 Problem",
        heading: "Who, Why, and What",
        content: {
          who: "Data engineers and platform teams at companies ranging from startups to enterprises running analytics on petabytes of data stored in Amazon S3. These teams were spending significant engineering resources just to keep their data lake infrastructure healthy — building custom compaction pipelines, managing snapshots, cleaning up orphaned files — instead of focusing on insights.",
          why: "S3 stores exabytes of tabular data across over one million data lakes. Customers using Apache Iceberg for analytics had to build and maintain multiple external systems for basic table operations: compaction clusters to keep queries fast, snapshot management for data recovery, orphan file cleanup to control costs, and fragmented permission models cobbled together from bucket policies and third-party tools. Interviews with 20+ enterprise customers revealed the same pain points: operational complexity that required dedicated engineering teams, 503 throttling errors from hot partitions at scale, and no unified way to manage table-level access control. One customer said it plainly: 'We don't want to care about catalog and table maintenance.'",
          what: "A new S3 resource type — Table Buckets — purpose-built for analytics. Customers create tables directly in S3 with automatic compaction, snapshot management, and orphan file removal. Integrated with AWS Glue Data Catalog and Lake Formation for fine-grained permissions. One console, one permission model, zero infrastructure to manage.",
        },
        aiCallout: {
          icon: "claude",
          text: "Used AI tools to synthesize pain points from 20+ customer interviews, competitive analysis, and community forums → identified 6 core pain point clusters that shaped the product direction",
        },
        research: {
          stats: [
            { value: "20+", label: "Enterprise customer interviews" },
            { value: "47", label: "Days from kickoff to launch-ready" },
            { value: "~50", label: "Cross-functional team members" },
          ],
        },
      },
      {
        id: "design-iteration",
        navLabel: "02 Design Iteration",
        heading: "Challenges and Iteration",
        content: {
          challenge: "This was a 0-to-1 product with no existing UX to reference. The first challenge was foundational: with a brand new resource type, dozens of possible user actions, and a 47-day timeline to re:Invent launch, we needed a way to define scope that the entire 50-person team could align on. The second challenge was integration — S3 Tables is the storage layer, but customers need to query data and process it for ML/AI workloads, which means integrating with other AWS services. The question of which services, why those services, and how the integration should work in the console was the most debated topic on the team.",
          iteration: "I created a Jobs-to-Be-Done framework that categorized every user action into six groups: Create, List, View, Manage, Delete, and Audit. For each action, I mapped the console steps, preconditions, API dependencies, limitations, and acceptance criteria. This became the contract between design, PM, and engineering — every team member could look at the framework and know exactly what was in scope for launch vs. post-launch. I worked with two product directors to align on priorities and we locked in the P0 set for re:Invent. For the integration challenge, I researched which tools customers most commonly use for data processing, then proposed Glue Data Catalog for discoverability and Lake Formation for permission control — directly addressing the fragmented permissions pain point from customer interviews. I designed the integration to be opted-in by default during table bucket creation, with graceful failure handling: if permissions fail, the console shows exactly which permissions are missing and lets customers opt out to unblock themselves, then integrate independently later.",
          decisions: [
            {
              before: "No framework — open-ended product scope with dozens of possible features and a 47-day deadline",
              after: "JTBD framework with 6 categories, every action prioritized P0/P1, aligned with product directors — became the shared contract for the 50-person team",
              why: "Without a shared source of truth, engineering, PM, and design were having separate conversations about scope. The framework made priorities visible and debatable in one place.",
            },
            {
              before: "Unclear which AWS services to integrate with and how — multiple options, strong opinions across the team",
              after: "Glue Data Catalog + Lake Formation, integrated by default in the create flow with opt-out escape hatch for permission failures",
              why: "Customer interviews showed permissions fragmentation as a top pain point. Lake Formation's fine-grained access control addressed this directly, and the opt-in-by-default pattern reduced friction while the escape hatch prevented IAM permission issues from blocking table bucket creation entirely.",
            },
          ],
        },
        aiCallout: {
          icon: "claude",
          text: "Used AI tools to map competitive landscape and gather customer pain points from forums and social media → accelerated the discovery phase that informed the JTBD framework",
        },
      },
      {
        id: "outcome",
        navLabel: "03 Outcome",
        heading: "Shipped Product and Results",
        content: {
          summary: "S3 Tables launched at AWS re:Invent 2024, featured as the top announcement in CEO Matt Garman's keynote. In the first 6 months: 12.7k table buckets created containing 48.5k tables with 4.5% week-over-week usage growth, 411 TB of data stored, and 1.3 billion weekly requests. The product established AWS as the first cloud provider with native table capabilities built into object storage — no competitor offers an equivalent.",
          reflection: "The biggest lesson was that the hardest design problem wasn't any single screen — it was creating the framework that let a 50-person team move fast on a brand new product category. The JTBD framework turned out to be my highest-leverage contribution: it didn't just define what we'd build, it gave everyone a shared language for making trade-offs under extreme time pressure.",
        },
        productVisuals: [
          { alt: "Table bucket creation flow with GDC integration", placeholder: true },
          { alt: "Table management console with compaction settings", placeholder: true },
        ],
      },
    ],
    nextProject: "agent-opportunities",
  },

  "agent-opportunities": {
    slug: "agent-opportunities",
    title: "",
    cardTitle: "Agent Opportunities\nAcross AWS Ecosystem",
    description: "",
    cardDescription: "Using AI tools to discover and design agent experiences that dramatically streamline how customers interact with AWS services.",
    gridClass: "cell-agent",
    year: "2026",
    role: "Lead UX Designer",
    timeline: "",
    team: [],
    tags: ["AI", "Featured"],
    metrics: [],
    sections: [
      {
        id: "problem",
        navLabel: "01 Problem",
        heading: "Who, Why, and What",
        content: { who: "", why: "", what: "" },
        aiCallout: null,
        research: { stats: [] },
      },
      {
        id: "design-iteration",
        navLabel: "02 Design Iteration",
        heading: "Challenges and Iteration",
        content: { challenge: "", iteration: "", decisions: [] },
        aiCallout: null,
      },
      {
        id: "outcome",
        navLabel: "03 Outcome",
        heading: "Shipped Product and Results",
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
