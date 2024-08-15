import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import NovelCarousel from '../components/NovelCarousel';

function Home({ novels }) {
  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem('watched')) || []
  );

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  const clearWatched = () => {
    setWatched([]);
    localStorage.setItem('watched', JSON.stringify([]));
  };

  const getWatchedNovels = () => {
    return watched.map((id) => novels.find((novel) => novel.id == id)).filter(Boolean);
  };

  return (
    <>
      {watched.length > 0 && (
        <section className="recently-viewed">
          <NovelCarousel novels={getWatchedNovels()} title="Recently Viewed" />
          <Button variant="primary" size="lg" onClick={clearWatched}>
            Clear Recently Viewed
          </Button>
        </section>
      )}
      <section className="all-items">
        <NovelCarousel novels={novels} title="All Items" />
      </section>
    </>
  );
}

export default Home;