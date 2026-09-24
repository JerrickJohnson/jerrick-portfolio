import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './components/Hero/Hero';
import { EngineeringSnapshot } from './components/EngineeringSnapshot/EngineeringSnapshot';
import { Experience } from './components/Experience/Experience';
import { TechEvolution } from './components/TechEvolution/TechEvolution';
import { FullStack } from './components/FullStack/FullStack';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { Philosophy } from './components/Philosophy/Philosophy';
import { AIWorkflow } from './components/AIWorkflow/AIWorkflow';
import { ResumeCTA } from './components/ResumeCTA/ResumeCTA';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { useInitialHashScroll } from './hooks/useInitialHashScroll';

export default function App() {
  useInitialHashScroll();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <EngineeringSnapshot />
        <Experience />
        <TechEvolution />
        <FullStack />
        <Projects />
        <Skills />
        <Philosophy />
        <AIWorkflow />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
