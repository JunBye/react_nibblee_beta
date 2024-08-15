import React, { useState, useEffect } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import debounce from 'lodash/debounce';
import styles from '.././styles/Search.module.css';


function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const novels = useSelector(state => state.novels);

  const performSearch = debounce((term) => {
    if (!term.trim()) {
      setSearchResults(novels);
      return;
    }
  
    const searchTerms = term.toLowerCase().split(' ');
    const keywordTerms = searchTerms.filter(t => t.startsWith('#')).map(t => t.slice(1));
    const normalTerms = searchTerms.filter(t => !t.startsWith('#'));
  
    const results = novels.filter(novel => {
      // 일반 검색 (제목, 작가, 장르)
      const normalMatch = normalTerms.length === 0 || normalTerms.some(term => 
        novel.title?.toLowerCase().includes(term) ||
        novel.author?.toLowerCase().includes(term) ||
        novel.genre?.toLowerCase() === term
      );
  
      // 키워드 검색
      const keywordMatch = keywordTerms.length === 0 || (
        novel.keyword && 
        keywordTerms.every(term => 
          novel.keyword.some(k => k.toLowerCase() === term)
        )
      );
  
      return normalMatch && keywordMatch;
    });
  
    setSearchResults(results);
  }, 300);

  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setSearchResults(novels);
  }, [novels]);

  return (
    <div className={styles.search}>
      <Container>
        <div className={styles.searchWrapper}>
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" onClick={() => navigate('/')}>
              <FaArrowLeft />
            </Button>
            <Form.Control
              type="text"
              placeholder="Search for filter with #tag"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </div>
        
        <div className={styles.searchResults}>
          {searchResults.map(novel => (
            <div className={styles.searchCardWrapper} key={novel.id}>
              <Card novel={novel} navigate={navigate} isSearchPage={true} className={styles.searchCard}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Search;