// import React from 'react';
// import '.././styles/Card.css';

// function Card({ novel, navigate }) {
//   return (
//     <div className="card-wrapper" onClick={() => navigate(`/detail/${novel.id}`)}>
//       <div className="image-wrapper">
//         <img src={process.env.PUBLIC_URL + novel.img} alt={novel.title} />
//       </div>
//       <div className='card-content'>
//         <h4>{novel.title}</h4>
//         <p>{novel.author}</p>
//         <p>{novel.keyword.map((a, i) => `#${a} `)}</p>
//       </div>
//     </div>
//   );
// }

// export default Card;


import React from 'react';
import stylesSearch from '.././styles/Search.module.css';
import stylesCard from '.././styles/Card.module.css';

function Card({ novel, navigate, isSearchPage = false }) {
  const styles = isSearchPage ? stylesSearch : stylesCard;

  return (
    <div 
      className={isSearchPage ? styles.searchCardWrapper : styles.cardWrapper} 
      onClick={() => navigate(`/detail/${novel.id}`)}
    >
      <div className={isSearchPage ? styles.searchCard : ''}>
        <div className={styles.imageWrapper}>
          <img src={process.env.PUBLIC_URL + novel.img} alt={novel.title} />
        </div>
        <div className={styles.cardContent}>
          <h4>{novel.title}</h4>
          <p>{novel.author}</p>
          {isSearchPage && <p>{novel.status} ({novel.chapters})</p>}
          <p>
            {novel.keyword.map((keyword, i) => (
              <span key={i}>#{keyword} </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;