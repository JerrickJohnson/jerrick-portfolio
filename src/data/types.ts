export type Tone = 'amber' | 'blend' | 'cyan';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  whatItIs: string;
  builtWith: string[];
  demonstrates: string[];
  repo: string;
  live?: string;
  team?: string;
  size: 'featured' | 'spotlight' | 'wide' | 'pair' | 'compact';
  /** Built with an AI assistant; credited on the card. */
  aiAssisted?: boolean;
  /** Why it exists: the real problem it was built for. */
  origin?: string;
  /** What Jerrick personally did, as confirmed by him. */
  howBuilt?: string[];
  screenshot?: Screenshot;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface FeaturedProject extends Project {
  problem: string;
  features: string[];
  myRole: string[];
  architecture: { label: string; items: string[] }[];
  screenshots: Screenshot[];
}

export interface Stage {
  id: string;
  title: string;
  caption: string;
  tags: string[];
  tone: Tone;
}

export interface SkillGroup {
  title: string;
  tone: Tone;
  items: string[];
}

export interface WorkGroup {
  title: string;
  points: string[];
}

export interface PipelineStep {
  label: string;
  detail: string;
}
