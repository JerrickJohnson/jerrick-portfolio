import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Enterprise Engineering',
    tone: 'amber',
    items: ['IBM i', 'RPGLE / RPG', 'CL / CLLE', 'DDS', 'SQL', 'Enterprise Applications', 'Production Support'],
  },
  {
    title: 'Data & Business Systems',
    tone: 'amber',
    items: ['IBM i Files', 'SQL', 'Insurance Systems', 'Reporting', 'Data Investigation', 'Business Logic'],
  },
  {
    title: 'Document Processing',
    tone: 'amber',
    items: ['O-specs', 'Printer Files', 'Spooled Files', 'ALP Print', 'DocPath'],
  },
  {
    title: 'Modern Web',
    tone: 'cyan',
    items: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express', 'GraphQL', 'Apollo', 'Handlebars'],
  },
  {
    title: 'Databases',
    tone: 'cyan',
    items: ['MySQL', 'MongoDB', 'Mongoose', 'Sequelize'],
  },
  {
    title: 'Development Workflow',
    tone: 'blend',
    items: ['Git', 'GitHub', 'VS Code', 'API Integration', 'AI-Assisted Development'],
  },
];
