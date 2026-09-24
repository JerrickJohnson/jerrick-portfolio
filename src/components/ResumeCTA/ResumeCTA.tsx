import { site } from '../../data/site';
import { ArrowIcon, Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import styles from './ResumeCTA.module.css';

const resumeSections = ['Professional Summary', 'Technical Skills', 'Professional Experience', 'Selected Projects', 'Education'];

export function ResumeCTA() {
  return (
    <section id="resume" className={styles.section} aria-labelledby="resume-title">
      <div className={styles.container}>
        <Reveal className={styles.card}>
          <div className={styles.copy}>
            <SectionLabel index="09">Resume</SectionLabel>
            <h2 id="resume-title" className={styles.title}>
              Want the full picture?
            </h2>
            <p className={styles.text}>Explore my professional experience, technical background, and project work.</p>
            <div className={styles.actions}>
              <Button href={site.resumeUrl} download="Jerrick_Johnson_Resume.pdf">
                Download Resume <ArrowIcon direction="down" />
              </Button>
              <Button href={site.resumeUrl} variant="ghost" external>
                Open in browser
              </Button>
            </div>
            <div className={styles.links}>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className={styles.doc} aria-hidden="true">
            <div className={styles.docHead}>
              <span className={styles.docFile}>Jerrick_Johnson_Resume.pdf</span>
              <span className={styles.docType}>PDF</span>
            </div>
            <p className={styles.docName}>{site.name}</p>
            <p className={styles.docRole}>{site.title} · IBM i · RPGLE · CL/CLLE · SQL · Full-Stack</p>
            <ul className={styles.docSections}>
              {resumeSections.map((s) => (
                <li key={s}>
                  <span>{s}</span>
                  <span className={styles.docLines}>
                    <i />
                    <i />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
