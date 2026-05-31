export const bio = {
  heading: "I'm Alice (Liang) Zhao, a UX Designer at Amazon, where I work on agentic experiences for AWS S3. I enjoy turning complex products and technologies into intuitive and customer-focused experience.",
  personal: "Outside of work, I love to explore nature and capture everyday moments through photography.",
  image: "/img/aboutMe/alice-liang.jpg",
};

export const workExperience = [
  {
    time: "Sep 2020 — present",
    title: "UX Designer",
    company: "Amazon Web Services",
    description: "I design AI-native and agentic experiences for AWS S3, focusing on how users interact with data through intelligent workflows and large-scale systems. I’ve led end-to-end product design initiatives that transformed complex storage research into AI-powered experiences in just 10 weeks, contributing to a 10% week-over-week storage increase and over 500 TB of data stored. I’ve also partnered with researchers and ML engineers to deliver 29 AI-driven features and developed scalable AI design frameworks adopted across 15 AWS services, helping improve usability, trust, and consistency across emerging generative AI platforms.",
    selectedWork: [
      { name: "AWS S3 Tables", href: "#" },
      { name: "Simplifying Data Access", href: "#" },
      { name: "Agentic Experience", href: "#" },
    ],
  },
  {
    time: "Jan 2020 — Sep 2020",
    title: "Sr. UX Designer",
    company: "Morgan Stanley",
    description: "I led the design effort across 20+ large-scale wealth management projects, helping unify complex financial workflows into a more cohesive user experience. I managed large information architectures and scalable UX systems that contributed to a 14% increase in product adoption within three months. I also built and maintained design system documentation leveraged by 50+ designers across four global organizations, improving consistency and cross-functional collaboration.",
    selectedWork: [
      { name: "E*Trade integration", href: "https://www.morganstanley.com/press-releases/morgan-stanley-closes-acquisition-of-e-trade" },
      { name: "Wealth management tool kit", href: "https://www.morganstanley.com/press-releases/morgan-stanley-wealth-management-launches-racial-equity-investin" },
    ],
  },
  {
    time: "Feb 2017 — Dec 2019",
    title: "UX Designer",
    company: "Insperity",
    description: "I led the UX optimization of a 600+ page marketing ecosystem using data-informed insights and behavioral patterns to improve usability and engagement. My work contributed to a 253% increase in customer engagement while also driving the development of a unified design system that reduced cross-functional development effort by three months through modular component design.",
    selectedWork: [
      { name: "Selected work", href: "#" },
    ],
  },
  {
    time: "Aug 2016 — Jan 2017",
    title: "UX Designer",
    company: "Siemens",
    description: "I helped establish the design language for Active Workspace, creating centralized UX standards and scalable templates to improve cross-team alignment and product consistency. I focused on building structured design foundations for complex enterprise tools while supporting collaboration across multidisciplinary teams. My work helped streamline UX workflows and create a more unified experience across the platform.",
    selectedWork: [
      { name: "Selected work", href: "#" },
    ],
  },
  {
    time: "Sep 2014 — May 2016",
    title: "UX Designer",
    company: "Purdue University",
    description: "I collaborated with the National Science Foundation to develop a nationwide research portal, creating high-fidelity interactive prototypes to validate complex research workflows and user needs. My work focused on translating technical and academic requirements into intuitive digital experiences, helping researchers navigate and interact with large-scale information systems more effectively.",
    selectedWork: [
      { name: "Selected work", href: "#" },
    ],
  },
];

export const designPhilosophy = {
  heading: "My design philosophy is rooted in simplifying complexity into intuitive and meaningful experiences. With 12 years of experience in UX and product design, I follow an iterative and prototype-driven process that balances user needs, business goals, and technical constraints. Since 2024, I've fully integrated AI into my workflow to rapidly explore, prototype, test, and validate ideas with exceptional speed and efficiency.",
};

export const processSteps = [
  {
    id: "01",
    title: "Discover",
    description: "Gather competitive analysis and user feedback. Synthesize findings into a structured one-pager: problem, opportunity, success metrics.",
    ai: "Research agents collect and cross-reference data from multiple sources, cutting weeks of manual synthesis to hours.",
    tools: [
      { name: "Internal research agent", icon: "Bedrock" },
      { name: "AWS Quick Suite", icon: "Nova" },
      { name: "AWS Builder MCP", icon: "MCP" },
    ],
  },
  {
    id: "02",
    title: "Define",
    description: "Distill the problem, align stakeholders on scope, and lock success metrics. Build a shared understanding before any design work starts.",
    ai: "Claude surfaces patterns across feedback channels and drafts problem framings, so alignment conversations start from evidence, not assumptions.",
    tools: [
      { name: "AWS Quick Suite", icon: "Nova" },
      { name: "Figjam", icon: "Figma" },
    ],
  },
  {
    id: "03",
    title: "Prototype",
    description: "Build working, interactive prototypes. Explore multiple directions in parallel, test with real interactions, and converge on the strongest approach.",
    ai: "Claude Code generates functional prototypes from the one-pager. Impeccable refines spacing, typography, and polish across every variant.",
    tools: [
      { name: "Claude Code", icon: "Claude" },
      { name: "Kiro-cli", icon: "Kiro" },
      { name: "Impeccable", icon: "MCP" },
      { name: "Figma MCP", icon: "MCP" },
      { name: "Lobehub", icon: "LobeHub" },
    ],
  },
  {
    id: "04",
    title: "Test",
    description: "Run moderated and unmoderated usability sessions. Capture findings, tag severity, and feed insights directly back into the next iteration.",
    ai: "Agents generate test scripts from key flows and success criteria. Post-session, they synthesize notes across participants and flag patterns.",
    tools: [
      { name: "Testing agent", icon: "MCP" },
      { name: "Claude", icon: "MCP" },
    ],
  },
  {
    id: "05",
    title: "Ship",
    description: "Deliver production-ready code, or hand off with documented specs, edge cases, and decision rationale.",
    ai: "Code review agents catch bugs and accessibility issues before merge. Documentation is auto-generated from the working prototype.",
    tools: [
      { name: "Claude Code", icon: "MCP" },
      { name: "Kiro-cli", icon: "Kiro" },
      { name: "GitHub", icon: "Github" },
    ],
  },
];

export const toolsHeading = "My AI toolkit";

export const tools = [
  { name: "Claude Code", description: "I use Claude Code to build and iterate on production code, turning design decisions into working UI in real time." },
  { name: "Codex", description: "I use Codex to make targeted comments on the working prototype then fine tune the design details." },
  { name: "Github", description: "All my work lives in version-controlled repos. I use GitHub to manage branches, review code, and ship through CI/CD." },
  { name: "Adobe", description: "I use Illustrator and After Effect for visual asset creation, motion editing, and detailed illustration work." },
  { name: "Figma", description: "My primary design tool for user flows, wireframes, and design systems. Figjam is where most of my thinking starts." },
  { name: "OpenRouter", description: "A unified API I use to access multiple LLMs through one interface, making it easy to compare model outputs." },
  { name: "Bedrock", description: "I design for Bedrock-powered experiences at AWS, shaping how customers build and deploy generative AI applications." },
  { name: "ZenMux", description: "I don't use it, I just think the logo is cute, so why not put it here ;)" },
];
