import type { Stage } from './types';

export const stages: Stage[] = [
  {
    id: 'foundation',
    title: 'Enterprise Foundation',
    caption:
      'Where I learned what production software demands: programs that run on schedule, data that has to be right, and code other engineers will maintain after you.',
    tags: ['IBM i', 'RPGLE', 'CL / CLLE', 'DDS', 'SQL', 'Enterprise Applications'],
    tone: 'amber',
  },
  {
    id: 'business',
    title: 'Business Systems',
    caption:
      'Software in service of a business: insurance rules, scheduled reporting, production troubleshooting, and the pipeline that turns data into documents.',
    tags: ['Insurance', 'Data', 'Reporting', 'Production Support', 'Document Processing', 'ALP Print', 'DocPath'],
    tone: 'amber',
  },
  {
    id: 'modern-dev',
    title: 'Modern Development',
    caption:
      'Extending into the web stack: component-based interfaces, server-side JavaScript, and APIs that connect the client to the data.',
    tags: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express', 'GraphQL', 'Electron'],
    tone: 'blend',
  },
  {
    id: 'modern-data',
    title: 'Modern Data',
    caption:
      'Relational and document data models. Familiar ground coming from IBM i files and SQL, with new tools for modeling it.',
    tags: ['MySQL', 'MongoDB', 'Mongoose', 'Sequelize'],
    tone: 'cyan',
  },
  {
    id: 'workflow',
    title: "Today's Workflow",
    caption:
      'Version control, pull-request collaboration, and AI tools like Claude used deliberately to plan, build, and verify real applications.',
    tags: ['Git', 'GitHub', 'VS Code', 'AI-Assisted Development', 'Claude Code'],
    tone: 'cyan',
  },
];
