import React, { useState } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from "./Card.js"; // 같은 폴더내에서는 그냥 ./파일명
import '.././styles/Carousel.css';

function NovelCarousel({ novels, title }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const groupNovels = (novels) => {
    const grouped = [];
    for (let i = 0; i < novels.length; i += 4) {
      grouped.push(novels.slice(i, i + 4));
    }
    return grouped;
  };

  const groupedNovels = groupNovels(novels);

  return (
    <>
      <Row>
        <Col className="main-container-title"><h3>{title}</h3></Col>
      </Row>
      <div className="carousel-wrapper">
        <Carousel
          activeIndex={index} onSelect={handleSelect}
          indicators={false} interval={null} prevIcon={null} prevLabel=""
          nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}>
          {groupedNovels.map((group, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <Row>
                {group.map((novel) => (
                  <Col key={novel.id} md={3}>
                    <Card novel={novel} navigate={navigate} />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}



export default NovelCarousel;