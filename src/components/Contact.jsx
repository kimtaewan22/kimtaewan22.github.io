// src/components/Contact.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assuming firebaseConfig.js is in the parent directory
import styles from './Contact.module.css';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const docRef = doc(db, 'contact', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactInfo(docSnap.data());
      } else {
        // Handle case where the document doesn't exist
        console.log("No such document!");
      }
    };

    fetchContactInfo();
  }, []);

  Optional: Effect for scroll-based visibility
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact');
      if (contact && window.scrollY + window.innerHeight > contact.offsetTop + 100) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!contactInfo) {
    return null; // Or a loading spinner
  }

  return (
   
    <section className={styles.contactSection} id="contact">
      <div className={styles.contactContent}>
        <h2 className={styles.title}>Contact</h2>
        {}
        <div className={styles.linksRow}>
          {contactInfo.labUrl && (
            <a href={contactInfo.labUrl} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/googleclassroom" alt="Lab" /> {}
              <span>Lab</span>
            </a>
          )}
          {contactInfo.kakaoChannel && (
            <a href={contactInfo.kakaoChannel} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/kakaotalk" alt="Kakao Channel" />
              <span>Channel</span>
            </a>
          )}
          {contactInfo.github && (
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/github" alt="GitHub" />
              <span>GitHub</span>
            </a>
          )}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/gmail" alt="Email" />
              <span>Gmail</span>
            </a>
          )}
          {}
        </div>
      </div>
      {/* 지도 */}
      <div className={styles.mapWrap}>
        {}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.234234234!2d127.456789!3d36.628123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356527b2b2b2b2b2%3A0x123456789abcdef!2z7ISc7Jq47Yq567OE7IucIOyEnOyauO2KuOq4sO2VnOq4sCBlOC0x!5e0!3m2!1sko!2skr!4v1680000000000!5m2!1sko!2skr" // **Replace with your actual map embed URL**
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: '18px' }}
          allowFullScreen="true"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="충북대학교 공과대학 E8-1 위치" // Update title if needed
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
