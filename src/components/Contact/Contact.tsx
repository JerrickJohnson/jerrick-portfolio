import { site } from '../../data/site';
import { ArrowIcon } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <Reveal>
          <SectionLabel index="10">Contact</SectionLabel>
          <h2 id="contact-title" className={styles.title}>
            Let's Build Something
          </h2>
          <p className={styles.text}>
            Interested in connecting about a software engineering opportunity, project, or collaboration?
          </p>
          <a href={`mailto:${site.email}`} className={styles.email}>
            {site.email}
          </a>
          <ul className={styles.channels}>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowIcon direction="up-right" />
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowIcon direction="up-right" />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
