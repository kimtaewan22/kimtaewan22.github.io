import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollToTopButton from './components/ScrollToTopButton'; 
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const sectionIds = ['about', 'skills', 'projects', 'contact'];

  // 스크롤 방향 감지 및 네비게이션 바 표시/숨김 관련 상태 (기존 로직에서 사용)
  const [prevScrollY, setPrevScrollY] = useState(0);
  // 네비게이션 바의 가시성 상태 (스크롤 방향 로직에서 사용)
  const [isNavVisible, setIsNavVisible] = useState(false);

  // '맨 위로' 버튼의 가시성 상태 (새로운 상태, 초기값은 false로 숨김)
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false); // 상태 이름 변경

  // --- Effect: isNavVisible 상태에 따라 body에 'show-navbar' 클래스 추가/제거 (메인 네비게이션 제어) ---
  useEffect(() => {
    if (isNavVisible) {
      document.body.classList.add('show-navbar');
    } else {
      document.body.classList.remove('show-navbar');
    }
  }, [isNavVisible]); // isNavVisible 상태가 변경될 때마다 실행

  // --- 스크롤 이벤트 리스너: 활성 섹션 하이라이팅 및 '맨 위로' 버튼 가시성 제어 ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = document.querySelector('.navbar');
      const navHeight = nav ? nav.offsetHeight : 0;

      // --- 활성 섹션 하이라이팅 로직 (기존 로직 유지 및 개선) ---
      // 네비게이션 바 높이를 고려한 감지 기준점
      const detectionOffset = navHeight + window.innerHeight * 0.3; // 필요에 따라 조정

      let current = 'intro'; // 기본적으로 'intro'로 설정

      // Intro 섹션 끝 임계값 (about 섹션이 시작되는 대략적인 위치)
      const aboutSection = document.getElementById('about');
      const introThreshold = aboutSection ? aboutSection.offsetTop - navHeight : window.innerHeight; // about 섹션 시작 위치 또는 뷰포트 높이

      // 스크롤이 Intro 섹션 임계값 이내에 있을 경우 'intro' 상태 유지
      if (currentScrollY < introThreshold) {
           current = 'intro';
      } else {
           // Intro 섹션을 벗어났을 경우 나머지 섹션 감지 로직 실행
           current = sectionIds[0]; // 'about'부터 시작하여 감지

           for (const id of sectionIds.slice(0)) { // sectionIds 전체를 순회
             const el = document.getElementById(id);
             if (el) {
                // 현재 스크롤 위치 + 감지 오프셋이 섹션 시작 위치를 넘어섰는지 확인
                if (currentScrollY + detectionOffset >= el.offsetTop) {
                    current = id; // 해당 섹션이 현재 뷰포트에 들어왔거나 막 지나간 섹션
                }
             }
           }
      }
      setActiveSection(current);
      // --- 활성 섹션 하이라이팅 로직 끝 ---

      // --- '맨 위로' 버튼 가시성 제어 로직 ---
      // 스크롤 위치가 일정 임계값 (예: 200px)을 넘어가면 버튼을 표시
      // 임계값 200px 아래에서는 버튼 숨김
      const scrollThresholdForButton = 200; // 버튼 나타날 스크롤 위치 (px) 조정 가능

      if (currentScrollY > scrollThresholdForButton) {
        setIsScrollButtonVisible(true); // 버튼 표시 상태로 변경
      } else {
        setIsScrollButtonVisible(false); // 버튼 숨김 상태로 변경
      }
      // --- '맨 위로' 버튼 가시성 제어 로직 끝 ---


      // --- 네비게이션 바 표시/숨김 (스크롤 방향) 로직 (기존 로직) ---
      // 이 로직은 isNavVisible 상태를 업데이트하고, 이는 다시 위 첫 번째 useEffect를 트리거하여
      // body 클래스를 변경함으로써 네비게이션 바의 보임/숨김을 제어합니다.
      const scrollThresholdForNavHiding = window.innerHeight * 0.5; // 네비게이션 바 숨김/표시 판단 스크롤 위치 임계값

      // isNavVisible이 true일 때 (네비게이션 바가 보이고 스크롤 방향으로 제어될 때)만 로직 실행
      // 그리고 페이지 상단 근처에서는 네비게이션 바를 숨기지 않도록 조건 추가
      if (isNavVisible && currentScrollY > scrollThresholdForNavHiding) {
         if (currentScrollY > prevScrollY) {
           // 스크롤 다운 시 네비게이션 바 숨김
           setIsNavVisible(false);
         } else if (currentScrollY < prevScrollY) {
           // 스크롤 업 시 네비게이션 바 표시
           setIsNavVisible(true);
         }
      } else if (currentScrollY <= scrollThresholdForNavHiding) {
          // 페이지 맨 위 근처로 스크롤했을 때는 네비게이션 바를 항상 표시
          setIsNavVisible(true);
      }
      setPrevScrollY(currentScrollY); // 이전 스크롤 위치 업데이트
      // --- 네비게이션 바 표시/숨김 (스크롤 방향) 로직 끝 ---

    };

    // 컴포넌트 마운트 시 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 로딩 시 스크롤 위치에 따라 상태 및 버튼 가시성 설정
    handleScroll();

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll);

  }, [isNavVisible, prevScrollY]); // isNavVisible, prevScrollY 상태 변경 시 useEffect 재실행

  // --- About 섹션 애니메이션 트리거 Effect (기존 로직 유지) ---
  useEffect(() => {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      if (activeSection === 'about') {
        aboutElement.classList.add('visible');
      } else {
        aboutElement.classList.remove('visible');
      }
    }
  }, [activeSection]); // activeSection 상태 변경 시 실행


  // --- handleLearnMoreClick 함수 (기존 로직 유지) ---
  // Intro 컴포넌트의 "더 알아보기" 버튼 클릭 시 실행됩니다.
  const handleLearnMoreClick = () => {
     // 네비게이션 바를 표시 상태로 변경하고 스크롤 방향 로직 활성화
     setIsNavVisible(true);
     // activeSection은 스크롤 후 스크롤 리스너에 의해 업데이트될 것입니다.
     // setActiveSection('about'); // 여기서는 직접 activeSection을 설정하지 않아도 스크롤 리스너가 처리

     // 레이아웃이 안정될 시간을 위해 setTimeout 사용
     setTimeout(() => {
       const aboutSection = document.getElementById('about');
       if (aboutSection) {
         const nav = document.querySelector('.navbar');
         const navHeight = nav ? nav.offsetHeight : 0;

         // 계산된 padding-top 값 가져오기
         const computedStyle = window.getComputedStyle(aboutSection);
         const paddingTop = parseFloat(computedStyle.paddingTop);

         // 최종 스크롤 목표 위치 계산: 섹션 상단 + padding-top - 네비게이션 바 높이
         const sectionTopInDocument = aboutSection.getBoundingClientRect().top + window.scrollY;
         const targetScrollTop = sectionTopInDocument + paddingTop - navHeight;

         // 부드럽게 스크롤
         window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
       }
     }, 100); // 지연 시간
   };


  return (
    <div className="App">
      {/* 네비게이션 바는 항상 렌더링되며, isNavVisible 상태에 따라 CSS 클래스로 가시성 제어 */}
      <nav className="navbar">
      <a
          href={"https://velog.io/@wani24/posts"} // 링크 주소
          target="_blank" // 새 탭에서 열기
          rel="noopener noreferrer" // 보안을 위한 속성
          className="navbar-velog-link" // 스타일링을 위한 클래스 이름
        >
          Velog {/* 링크 텍스트 */}
        </a>

        <span className="navbar-logo">Taewan</span>
        <div className="navbar-menu">
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </div>
      </nav>

      <div className="sections">
        <section id="intro" className="snap-section"><Intro onLearnMoreClick={handleLearnMoreClick} /></section>
        <section id="about" className="snap-section"><About /></section>
        <section id="skills" className="snap-section"><Skills /></section>
        <section id="projects" className="snap-section"><Projects /></section>
        <section id="contact" className="snap-section"><Contact /></section>
      </div>

      {/* ScrollToTopButton 컴포넌트를 렌더링 */}
      {/* isScrollButtonVisible 상태에 따라 visible 클래스를 전달하여 가시성 제어 */}
      <ScrollToTopButton isVisible={isScrollButtonVisible} /> {/* isVisible prop 전달 */}
    </div>
  );
}

export default App;