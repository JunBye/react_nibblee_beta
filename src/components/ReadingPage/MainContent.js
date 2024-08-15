import { current } from '@reduxjs/toolkit';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  max-width: ${props => props.mode === "Scroll" ? '1000px' : '800px'};
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.backgroundColor === 'black' ? 'white' : 'black'};
  height: calc(100vh - 120px); // 헤더와 Progress Bar 높이를 고려
  overflow: hidden;
  display : flex;
  flex-direction : column;
  hyphen : auto;
  justify-content : center;
  align-items : center;
`;

const PageContent = styled.div`
  flex: 1;
  overflow: ${props => props.mode === "Scroll" ? 'auto' : 'hidden'};
  font-size: ${props => props.fontSize}px;
  font-family: ${props => props.fontType}, sans-serif;
  line-height: ${props => props.lineHeight};
  p {
    margin-bottom: 0;
  }
`;

const NavigationButton = styled.button`
  position: fixed;
  top: 50%;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

const MainContent = ({ settings, content, currentPageFromProgressBar, onPageChange }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const contentRef = useRef(null);
  const prevSettingsRef = useRef(settings);

  useEffect(() => {
    const processContent = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const paragraphs = doc.body.getElementsByTagName('p');

      if (settings.mode === "Scroll") {
        // 스크롤 모드일 때는 전체 내용을 하나의 페이지로 처리
        return [Array.from(paragraphs).map(p => p.outerHTML).join('')];
      }

      // 기존의 페이지 나누기 로직
      let currentPageContent = '';
      let newPages = [];

      const testDiv = document.createElement('div');
      testDiv.style.cssText = `
        position: absolute;
        visibility : hidden;
        height : auto;
        width : ${contentRef.current.offsetWidth}px;
        font-size : ${settings.fontSize}px;
        font-family : ${settings.fontType}, sans-serif;
        line-height : ${settings.lineHeight};
        padding : 20px;
        box-sizing : border-box;
      `;
      document.body.appendChild(testDiv);

      const maxHeight = contentRef.current.offsetHeight;

      Array.from(paragraphs).forEach((p) => {
        const tempContent = currentPageContent + p.outerHTML;
        testDiv.innerHTML = tempContent;
        
        if (testDiv.offsetHeight > maxHeight) {
          if (currentPageContent) {
            newPages.push(currentPageContent);
            currentPageContent = p.outerHTML;
          } else {
            // 단일 문단이 페이지 높이를 초과하는 경우
            const words = p.innerHTML.split(' ');
            let partialContent = '';
            for (let word of words) {
              const newPartialContent = partialContent + word + ' ';
              testDiv.innerHTML = `<p>${newPartialContent}</p>`;
              if (testDiv.offsetHeight <= maxHeight) {
                partialContent = newPartialContent;
              } else {
                if (partialContent) {
                  newPages.push(`<p>${partialContent}</p>`);
                  partialContent = word + ' ';
                } else {
                  // 단어가 너무 길어 한 줄에 들어가지 않는 경우
                  newPages.push(`<p>${word}</p>`);
                  partialContent = '';
                }
              }
            }
            currentPageContent = `<p>${partialContent}</p>`;
          }
        } else {
          currentPageContent = tempContent;
        }
      });

      if (currentPageContent) {
        newPages.push(currentPageContent);
      }

      document.body.removeChild(testDiv);
      return newPages;
    };

    if (contentRef.current) {
      const newPages = processContent();
      
      // 설정 변경 후 현재 페이지 재조정
      if (JSON.stringify(settings) !== JSON.stringify(prevSettingsRef.current)) {
        const currentContent = pages[currentPage];
        const newPageIndex = newPages.findIndex(page => page.includes(currentContent));
        if (newPageIndex !== -1) {
          setCurrentPage(newPageIndex);
        } else {
          setCurrentPage(Math.min(currentPage, newPages.length - 1));
        }
      }
      
      setPages(newPages);
      prevSettingsRef.current = settings;
        // 페이지수 변경을 부모 컴포넌트에게 알림
      onPageChange(currentPage, newPages.length);  
    }


  }, [content, settings, currentPage]);

  useEffect(() => {
    // currentPage가 변경될 때마다 스크롤 위치 조정
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  useEffect(()=>{
    // progressBar 정보 받으면, 갱신시키기
    setCurrentPage(currentPageFromProgressBar);

  }, [currentPageFromProgressBar]);

  const handlePrevPage = () => {
    const newPage = Math.max(0, currentPage - 1);
    setCurrentPage(newPage);
    onPageChange(newPage, pages.length);
  };

  const handleNextPage = () => {
    const newPage = Math.min(pages.length - 1, currentPage + 1);
    setCurrentPage(newPage);
    onPageChange(newPage, pages.length);
  };

  return (
    <ContentContainer ref={contentRef} backgroundColor={settings.backgroundColor} mode ={settings.mode}>
      <PageContent 
        dangerouslySetInnerHTML={{ __html: settings.mode === "Scroll" ? pages.join('') : (pages[currentPage] || '') }}
        fontSize={settings.fontSize}
        fontType={settings.fontType}
        lineHeight={settings.lineHeight}
        mode ={settings.mode}
      />
      {settings.mode !== "Scroll" && currentPage > 0 && (
        <NavigationButton className="prev" onClick={handlePrevPage}>
          &lt;
        </NavigationButton>
      )}
      {settings.mode !== "Scroll" && currentPage < pages.length - 1 && (
        <NavigationButton className="next" onClick={handleNextPage}>
          &gt;
        </NavigationButton>
      )}
    </ContentContainer>
  );
};

export default MainContent;