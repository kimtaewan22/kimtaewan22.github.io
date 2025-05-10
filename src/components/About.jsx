import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './About.module.css';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'about', 'profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProfile(docSnap.data());
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const about = document.getElementById('about');
      if (about && window.scrollY + window.innerHeight > about.offsetTop + 100) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!profile) return null;

  return (
    <section className={`${styles.aboutSection} ${visible ? styles.visible : ''}`} id="about">
      <h1 className={styles.name}>{profile.name}</h1>
      <p className={styles.intro}>{profile.intro}</p>
      <div className={styles.infoBlocks}>
        {profile.education && profile.education.length > 0 && (
          <div className={styles.infoBlock}>
            <div className={styles.blockTitle}>EDUCATION</div>
            <div className={styles.blockContent}>
              {profile.education.map((edu, i) => (
                <div key={i}>
                  {edu.school}<br />
                  {edu.major}<br />
                  <span className={styles.period}>{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {profile.current && profile.current.length > 0 && (
          <div className={styles.infoBlock}>
            <div className={styles.blockTitle}>IN PROGRESS</div>
            <div className={styles.blockContent}>
              {profile.current.map((cur, i) => (
                <div key={i}>
                  {cur.title}<br />
                  <span className={styles.period}>{cur.period}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {profile.awards && profile.awards.length > 0 && (
          <div className={styles.infoBlock}>
            <div className={styles.blockTitle}>AWARD</div>
            <div className={styles.blockContent}>
              {profile.awards.map((award, i) => (
                <div key={i}>
                  <b>{award.title}</b>
                  <span className={styles.period}>({award.org}, {award.date})</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {profile.licenses && profile.licenses.length > 0 && (
          <div className={styles.infoBlock}>
            <div className={styles.blockTitle}>LICENSES</div>
            <div className={styles.blockContent}>
              {profile.licenses.map((lic, i) => (
                <div key={i}>{lic.name} <span className={styles.period}>{lic.date}</span></div>
              ))}
            </div>
          </div>
        )}
        {profile.papers && profile.papers.length > 0 && (
          <div className={styles.infoBlock}>
            <div className={styles.blockTitle}>PAPER</div>
            <div className={styles.blockContent}>
              {profile.papers.map((paper, i) => (
                <div key={i}>
                  <span className={styles.paperType}>[{paper.type}]</span>
                  {paper.title} ({paper.journal}) ({paper.date}) {paper.index && `(${paper.index})`}
                  {paper.url && <a href={paper.url} className={styles.link}>링크</a>}
                </div>
              ))}
            </div>
          </div>
        )}
        {profile.softwares && profile.softwares.length > 0 && (
          <div className={styles.infoBlock}>
            <div className={styles.blockTitle}>SOFTWARE</div>
            <div className={styles.blockContent}>
              {profile.softwares.map((sw, i) => (
                <div key={i}>
                  <b>{sw.name}</b><br />
                  <span className={styles.softwareDesc}>{sw.desc}{sw.storeUrl && <a href={sw.storeUrl} className={styles.link}>스토어</a>}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About; 