// src/components/Contact.jsx
import React from 'react';
import styles from './Contact.module.css';

const Contact = () => (
  <section className={styles.contactSection} id="contact">
    <div className={styles.contactContent}>
      <h2 className={styles.title}>Contact</h2>
      {/* 링크들 */}
      <div className={styles.linksRow}>
        <a href="https://your-lab-url.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/googleclassroom" alt="Lab" />
          <span>Lab</span>
        </a>
        <a href="https://pf.kakao.com/_yourchannel" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/kakaotalk" alt="Kakao Channel" />
          <span>Channel</span>
        </a>
        <a href="https://github.com/kimtaewan22" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/github" alt="GitHub" />
          <span>GitHub</span>
        </a>
        <a href="mailto:taewangim05@gmail.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.simpleicons.org/gmail" alt="Email" />
          <span>Gmail</span>
        </a>
        
      </div>
    </div>
    {/* 지도 */}
    <div className={styles.mapWrap}>
      {/* iframe 소스 유효한지 확인 필요 */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.234234234!2d127.456789!3d36.628123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356527b2b2b2b2b2%3A0x123456789abcdef!2z7ISc7Jq47Yq567OE7IucIOyEnOyauO2KuOq4sO2VnOq4sCBlOC0x!5e0!3m2!1sko!2skr!4v1680000000000!5m2!1sko!2skr" // 유효한 지도 소스 URL로 변경 필요
        width="100%"
        height="320"
        style={{ border: 0, borderRadius: '18px' }}
        allowFullScreen="true"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="충북대학교 공과대학 E8-1 위치"
      ></iframe>
    </div>
  </section>
);

export default Contact;