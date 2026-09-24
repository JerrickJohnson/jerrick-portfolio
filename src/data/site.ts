export type SectionId = 'home' | 'experience' | 'engineering' | 'projects' | 'resume' | 'contact';

export const site = {
  name: 'Jerrick Johnson',
  title: 'Software Engineer II',
  positioning: ['Enterprise Software Engineer', 'IBM i', 'RPGLE', 'SQL', 'Full-Stack Development', 'AI-Assisted Development'],
  headline: 'From enterprise systems to modern applications.',
  summary:
    'Experienced software engineer specializing in IBM i, RPGLE, CL, SQL, enterprise application development, and document processing — with modern full-stack development experience across JavaScript, React, Node.js, GraphQL, MySQL, and MongoDB.',
  email: 'jerrickjohnson88@gmail.com',
  github: 'https://github.com/JerrickJohnson',
  linkedin: 'https://www.linkedin.com/in/jerrick-johnson-6bbbba182/',
  sourceRepo: 'https://github.com/JerrickJohnson/jerrick-portfolio',
  resumeUrl: `${import.meta.env.BASE_URL}Jerrick_Johnson_Resume.pdf`,
};

export const navItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];
