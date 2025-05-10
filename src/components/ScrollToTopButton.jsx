// src/components/ScrollToTopButton.js
import React from 'react';
import styles from './ScrollToTopButton.module.css'; // 버튼 스타일을 위한 CSS Module

// isVisible prop을 받습니다.
const ScrollToTopButton = ({ isVisible }) => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    return (
      // isVisible prop이 true일 때 styles.visible 클래스를 추가합니다.
      <button
        className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : ''}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    );
};

export default ScrollToTopButton;