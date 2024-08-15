

import React from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { Settings } from 'lucide-react';
import NovelCarousel from "../components/NovelCarousel.js";
import ".././styles/Account.css";
import Setting from "../components/Setting.js"


function Account(){
  const { id } = useParams();
  const novels = useSelector((state) => state.novels);
  const users = useSelector((state) => state.users);
  const user = users.find((x)=> x.id === id);
  const navigate = useNavigate();
  const location = useLocation();

  const goToSetting = () => {
    navigate(`${location.pathname}/setting`);
  };
if (!user) return <div>User not found</div>;

  const collectionNovels = novels.filter(x=> user.collection.novel_id.includes(x.id));
  const favoriteNovels = novels.filter(x=>user.like.includes(x.id));
  const recentlyViewedNovels = novels.filter(x=>user.recently_view.includes(x.id));
  
  return (
    <Container className="account-container">
      <section className="profile">
        <div className="profile-row">
          <div className="profile-image-container">
            <img src=".././img/Profile.png" alt="Profile" className="profile-image" />
          </div>
          <div className="profile-info">
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
            <p>남은 캐시: {user.left_cash}</p>
            <Button variant="outline-secondary" className="settings-button" onClick = {goToSetting}>
              <Settings size={16} /> Setting & Request
            </Button>
            <br></br>
            <Button variant="primary" className="payment-button">
              캐시 충전하실?
            </Button>
          </div>
        </div>
      </section>

      <section className="소장목록">
        <NovelCarousel novels={collectionNovels} title="소장 목록(작품+소장회차)" />
      </section>

      <section className="작품 즐겨찾기 목록">
        <NovelCarousel novels={favoriteNovels} title="작품 즐겨찾기 목록" />
      </section>

      <section className="최근 본 작품 목록">
        <NovelCarousel novels={recentlyViewedNovels} title="들러본 작품 목록" />
      </section>
    </Container>
  );
};

export default Account;