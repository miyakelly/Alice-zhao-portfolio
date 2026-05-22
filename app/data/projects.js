export const projects = {
  "simplifying-data-access": {
    slug: "simplifying-data-access",
    heroImage: "/img/sda/sda-hero.jpg",
    projectTitle: { main: "Simplifying data access", sub: "Unifying 3 endpoint products into 1" },
    navTitle: "Simplifying data access: Unifying 3 endpoint products into 1",
    heroProblem: "Customers were spending significant operational effort managing multiple storage services and endpoint products, with no unified way to set up infrastructure or access data. I led a 10-person cross-functional team to design one console that brought all services together.",
    heroSolution: "The new console experience launched at {link:AWS re:Invent 2025}. It streamlines infrastructure setup and data access across 3 storage services, allowing customers to scale access for large datasets in seconds.",
    externalLink: {
      label: "[->]",
      url: "https://www.youtube.com/watch?v=NVZV0gfV-jA",
    },
    impact: "A unified console experience for infrastructure setup and data access across 3 storage services",
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
        navLabel: "01  Who and why",
        heading: "01  Who and why.",
        content: {
          lead: "Two personas, three separate consoles, and constant context-switching revealed the need for a unified data access experience.",
          subsections: [
            { label: "Research", text: "Based on the insights from 6 customer calls, 3 sales calls, and 30+ offline survey responses, I led the team to identify 2 personas and their user journey, as well as the challenges they are facing." },
            { label: "Target personas", text: "Storage admins spend too much on third-party integrations and duplicate data just to connect services. Developers repeat identical tasks across consoles because there is no unified way to access data." },
            { label: "Pain points", text: "No unified view of access points across storage services, no easy way to create access points connecting to FSx from the console, and constant jumping between pages to view and manage them." },
          ],
          sectionImages: [
            { src: "/img/sda/sda-placeholder.jpg", alt: "Prioritized user stories" },
          ],
        },
      },
      {
        id: "scoping",
        navLabel: "02 Product scoping",
        heading: "02 Product scoping.",
        content: {
          lead: "Using the user journey as a starting point, I collaborated with the product team to assemble a prioritized list of user stories that gave the team a holistic understanding of project scope and focused the initial launch on the most critical flows.",
          subsections: [
            { label: "User stories", text: "I worked with the product team to map every user story from the journey. This gave us a shared view of the full scope and let us prioritize what mattered most for launch." },
            { label: "User flows", text: "I created detailed user flows showing the steps to complete each task and how each flow fits into the overall experience." },
          ],
          sectionImages: [
            { src: "/img/sda/sda-placeholder.jpg", alt: "Prioritized user stories" },
            { src: "/img/sda/sda-placeholder.jpg", alt: "Detailed user flows" },
          ],
        },
      },
      {
        id: "design-iteration",
        navLabel: "03 Design Iteration",
        heading: "03 Design Iteration.",
        content: {
          lead: "Internal testing revealed that stringing together multiple APIs caused partial failures and left customers confused about how to recover. I pushed for a UX pattern that surfaces all required steps during creation, resolving both the usability and durability issues. Follow-up testing confirmed the pattern was clear and robust.",
          subsections: [
            { label: "Exploration", text: "Internal testing sessions on the creation flow exposed that chaining multiple API calls caused loss of customer input and partial successes. Customers didn't know what actions to take to fix failed operations." },
            { label: "Trade-offs", text: "The original sequential flow was simpler to build but fragile. Surfacing all steps upfront added complexity to the UI, but gave customers a clear picture of what was required and let the service call one API at a time." },
            { label: "Decision", text: "I pushed for a pattern that displays the full list of required steps during creation. Each API call runs independently, so a single failure doesn't cascade. Follow-up testing proved the pattern was clear and robust." },
          ],
        },
      },
      {
        id: "outcome",
        navLabel: "04 Outcome",
        heading: "04 Outcome",
        headingAlign: "center",
        summary: "A unified console to set up and manage your cloud infrastructure.",
        content: [
          {
            subheading: "Streamlined infrastructure setup",
            text: "Storage admins can now set up their infrastructure directly within the AWS console. No more third-party applications needed.",
            images: [
              { src: "/img/sda/sda-placeholder.jpg", alt: "Infrastructure setup console" },
              { src: "/img/sda/sda-placeholder.jpg", alt: "Storage service configuration" },
            ],
          },
          {
            subheading: "Unified data operations",
            text: "Developers can now view and manage all the data operations and security-related tasks in a single console. No more switching among storage services.",
            images: [
              { src: "/img/sda/sda-placeholder.jpg", alt: "Data operations dashboard" },
              { src: "/img/sda/sda-placeholder.jpg", alt: "Security management console" },
            ],
          },
        ],
      },
    ],
    nextProject: "s3-tables",
  },

  "s3-tables": {
    slug: "s3-tables",
    heroImage: "/img/s3tables/s3table-heroimg.jpg",
    projectTitle: { main: "AWS S3 Tables", sub: "0→1 in 8 weeks" },
    navTitle: "AWS S3 Tables: 0 → 1 in 8 weeks",
    heroProblem: "Customers were spending millions building and maintaining complex infrastructure for AI/ML workloads. I led a 20-person team to design S3 Tables, a new product to eliminate that complexity, from concept to launch in 8 weeks.",
    heroSolution: "S3 Tables, featured in {link:the 2024 AWS CEO keynote} {img:/img/s3tables/customers-inline-img/hero-text/000.jpg,/img/s3tables/customers-inline-img/hero-text/101.jpg,/img/s3tables/customers-inline-img/hero-text/102.jpg}, handles infrastructure automatically, providing a seamless console experience that lets teams turn big data into insights in seconds.",
    impact: "A seamless console experience that turns big data into insights in seconds",
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
          lead: "Customers {img:/img/s3tables/customers-inline-img/Rectangle 101.jpg,/img/s3tables/customers-inline-img/Rectangle 102.jpg,/img/s3tables/customers-inline-img/Rectangle 104.jpg} don't want to store structured data in unstructured storage while maintaining custom infrastructure. They need a solution to streamline storage operations so teams can focus on data querying.",
          subsections: [
            { label: "Research", text: "I used internal AI tools to synthesize transcripts from 20+ enterprise customer interviews. The synthesis surfaced two target personas and their core pain points." },
            { label: "Target personas", text: "Data engineers maintain storage systems daily. Strategic leads evaluate infrastructure costs and reliability." },
            { label: "Pain points", text: "Millions wasted on custom infrastructure, manual maintenance of query engine integrations, and no native way to keep structured data up-to-date." },
          ],
          sectionImage: { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "Customer pain point analysis" },
        },
      },
      {
        id: "scoping",
        navLabel: "02 Product scoping",
        heading: "02 Product scoping.",
        content: {
          lead: "I adapted the AWS JTBD framework to give the team a shared language for strategic scope trade-offs. We categorized every user action and API details into 6 workflows and aligned on a launch plan in one week.",
          subsections: [
            { label: "JTBD Framework", text: "Each user action mapped to console steps, preconditions, and API dependencies across six groups: Create, List, View, Manage, Audit, and Delete." },
            { label: "Action plan", text: "A prioritized action plan with defined APIs, known limitations, and console impact, turning an ambiguous product space into a concrete roadmap for launch." },
          ],
          sectionImage: { src: "/img/s3tables/scoping/scoping-graph.jpg", alt: "Product scoping" },
        },
      },
      {
        id: "design-iteration",
        navLabel: "03 Design Iteration",
        heading: "03 Design Iteration.",
        content: {
          lead: "Integration across multiple services needs to be seamless. After testing three options, I persuaded the team to combine integration with table bucket creation as a default-on setting. 97% of customers never turned it off.",
          subsections: [
            { label: "Exploration", text: "I tested three integration models: a multi-step wizard that walked through each service, a fragmented approach with separate configuration pages, and a single-page create flow with integration built in." },
            { label: "Trade-offs", text: "The wizard added friction to what should feel instant. The fragmented model scattered a single decision across multiple pages. Customer research showed most users' end goal was querying, so bundling integration into table bucket creation matched their mental model." },
            { label: "Decision", text: "I proposed combining integration into the create flow as a default-on checkbox. One click replaces what used to require configuring multiple services independently. The team aligned quickly once the customer data backed it up." },
          ],
        },
      },
      {
        id: "outcome",
        navLabel: "04 Outcome",
        heading: "04 Outcome",
        headingAlign: "center",
        summary: "S3 Tables, launched as the top announcement at AWS re:Invent 2024, gives customers structured data storage with built-in query support, eliminating the custom infrastructure that used to cost millions to build and maintain.",
        content: [
          {
            subheading: "Unified data storage for AI/ML workloads",
            text: "The S3 Tables console enables customers to create, manage, and query structured data for analytics and AI/ML workloads in a few clicks, drastically simplifies the way customers manage their storage.",
            images: [
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "S3 Tables console overview" },
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "Table bucket creation flow" },
            ],
          },
          {
            subheading: "Seamless Integration",
            text: "What previously required custom-built infrastructure is now handled automatically. Integration across multiple AWS services is reduced to a single click during table bucket creation.",
            images: [
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "Integration configuration" },
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "Single-click integration" },
            ],
          },
          {
            subheading: "One click from data to insights",
            text: "Once created, customers manage their tables from a single console. Table bucket details, permission controls, and storage settings are all accessible without switching between services.",
            images: [
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "Table management console" },
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "Query results view" },
            ],
          },
          {
            subheading: "Biggest launch for S3",
            text: "S3 Tables launched at AWS re:Invent 2024, featured as the top announcement in AWS CEO's keynote.",
            images: [
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "re:Invent 2024 keynote" },
              { src: "/img/s3tables/problem/painpoint-graph.jpg", alt: "S3 Tables announcement" },
            ],
          },
        ],
      },
    ],
    nextProject: "simplifying-data-access",
  },

  "agent-opportunities": {
    slug: "agent-opportunities",
    heroImage: "/img/s3tables/heroimg-1.JPEG",
    projectTitle: { main: "AWS agentic experience", sub: "Defining next phase" },
    navTitle: "AWS agentic experience",
    heroProblem: "",
    heroSolution: "",
    impact: "Impact statement placeholder",
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
