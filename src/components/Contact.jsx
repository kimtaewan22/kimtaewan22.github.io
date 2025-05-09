import React from 'react';
import styles from './Contact.module.css';

const Contact = () => (
  <section className={styles.contactSection} id="contact">
    <div className={styles.contactContent}>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.linksRow}>
        <a href="https://your-lab-url.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/googleclassroom" alt="Lab" />
          <span>Lab Link</span>
        </a>
        <a href="https://pf.kakao.com/_yourchannel" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/kakaotalk" alt="Kakao Channel" />
          <span>Kakao Channel</span>
        </a>
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/github" alt="GitHub" />
          <span>GitHub</span>
        </a>
      </div>
      <div className={styles.emailRow}>
        <img src="https://cdn.simpleicons.org/gmail" alt="Email" />
        <span>taewangim05@gmail.com</span>
      </div>
    </div>
    <div className={styles.mapWrap}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.234234234!2d127.456789!3d36.628123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356527b2b2b2b2b2%3A0x123456789abcdef!2z7ISc7Jq47Yq567OE7IucIOyEnOyauO2KuOq4sO2VnOq4sCBlOC0x!5e0!3m2!1sko!2skr!4v1680000000000!5m2!1sko!2skr"
        width="100%"
        height="320"
        style={{ border: 0, borderRadius: '18px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="충북대학교 공과대학 E8-1 위치"
      ></iframe>
    </div>
  </section>
);

export default Contact; 