export const snapshot = {
  paragraphs: [
    'My software engineering career began inside enterprise systems, where applications have to run reliably, data has to be handled carefully, and business rules are not optional.',
    'As a Software Engineer II, I build and support insurance applications on IBM i with RPGLE, CL/CLLE, and SQL. That work includes scheduled reporting, production troubleshooting, application and file changes as the business evolves, and the print workflows that turn application data into the documents insureds receive.',
    'I expanded that foundation into modern full-stack development with JavaScript, React, Node.js, Express, GraphQL, MongoDB, and MySQL. Today I bring both perspectives to the work: the discipline of production enterprise software and the tools of the modern web. I also use AI tools like Claude to plan, build, and verify software, including Datebook, a tool I built for my own testing work.',
  ],
  facts: [
    { label: 'Role', value: 'Software Engineer II · Sept 2021 – Present' },
    { label: 'Platform', value: 'IBM i · RPGLE · CL/CLLE · SQL' },
    { label: 'Modern stack', value: 'SMU Full Stack Web Development' },
  ],
};

export const fullStack = {
  school: 'Southern Methodist University',
  program: 'Full Stack Web Development Certificate Program',
  body: [
    'I already knew how business software works from the inside. The SMU program extended that into the modern web: building complete applications from the interface to the database, with the tools most teams ship with today.',
    'It added a second toolset to an existing engineering foundation, not a first one.',
  ],
  groups: [
    { title: 'Front end', items: ['JavaScript', 'HTML', 'CSS', 'React'] },
    { title: 'Back end', items: ['Node.js', 'Express', 'GraphQL', 'API integration', 'Authentication'] },
    { title: 'Data', items: ['MySQL', 'MongoDB', 'Mongoose'] },
    { title: 'Practice', items: ['Git / GitHub', 'Full-stack architecture'] },
  ],
};

export const philosophy = {
  statement:
    "Whether I'm working inside an IBM i application or building a modern web application, the fundamentals stay the same.",
  principles: [
    { title: 'Understand the problem', body: 'Know the business need before writing the code.' },
    { title: 'Understand the data', body: 'Most bugs, and most answers, live in the data.' },
    { title: 'Respect the existing system', body: 'Learn how it works before changing how it works.' },
    { title: 'Write maintainable code', body: 'Someone will read it later, and it may be you.' },
    { title: 'Troubleshoot carefully', body: 'Trace the flow, confirm the cause, then fix it.' },
  ],
};

export const aiWorkflow = {
  intro:
    'AI is part of how I build software now. It helps me move faster, and I stay responsible for the requirements, the review, and the testing.',
  steps: [
    { title: 'Define', body: 'Start from the real need: requirements, constraints, and edge cases.' },
    { title: 'Plan', body: 'Work through the approach with AI, then decide what gets built.' },
    { title: 'Build', body: 'Use AI as a pair programmer to implement, iterate, and debug.' },
    { title: 'Verify', body: 'Review the code and test it against real cases before trusting it.' },
    { title: 'Ship', body: 'Package and document it, and credit the AI assistance openly.' },
  ],
  examples: [
    {
      title: 'Datebook',
      kind: 'Desktop app · Electron',
      body: 'A date calculator for my own testing work. I defined the features, reviewed the code, tested it against real date cycles, and built the Windows installer.',
      href: '#datebook',
      linkLabel: 'See Datebook',
    },
    {
      title: 'This portfolio',
      kind: 'Web app · React + TypeScript',
      body: 'Built with Claude Code. I wrote the brief, supplied and checked every fact, and approved the design, spec, and plan. It shipped with automated tests, an independent AI code review, and fixes found by checking it in the browser.',
      href: 'https://github.com/JerrickJohnson/jerrick-portfolio',
      linkLabel: 'View the source and history',
    },
  ] as { title: string; kind: string; body: string; href?: string; linkLabel?: string }[],
  alsoFor: ['Research', 'Learning new technologies', 'Debugging', 'Code exploration', 'Problem solving'],
};
