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
  size: 'featured' | 'wide' | 'pair' | 'compact';
}

export interface FeaturedProject extends Project {
  problem: string;
  features: string[];
  myRole: string[];
  architecture: { label: string; items: string[] }[];
  screenshots: { src: string; alt: string }[];
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
