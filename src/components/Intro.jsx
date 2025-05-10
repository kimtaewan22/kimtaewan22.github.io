import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './Intro.module.css';

// Accepts onLearnMoreClick prop
const Intro = ({ onLearnMoreClick }) => { // Accept prop
  const [introData, setIntroData] = useState(null);

  useEffect(() => {
    const fetchIntro = async () => {
      const docRef = doc(db, 'intro', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setIntroData(docSnap.data());
    };
    fetchIntro();
  }, []);

  // Button click calls the prop function
  const handleButtonClick = () => {
    if (onLearnMoreClick) {
      onLearnMoreClick();
    }
  };

  if (!introData) return null;

  return (
    <section className={styles.introSection}>
      {introData.photoUrl && (
        <img src={introData.photoUrl} alt="intro" className={styles.introPhoto} />
      )}
      <div className={styles.introOverlay}>
        <h1 className={styles.introName}>{introData.name}</h1>
        <p className={styles.introDesc}>{introData.desc}</p>
        <button className={styles.moreBtn} onClick={handleButtonClick}> 
          더 알아보기 <span className={styles.arrow}>↓</span>
        </button>
      </div>
      <div className={styles.introGradient} />
    </section>
  );
};


export default Intro; 