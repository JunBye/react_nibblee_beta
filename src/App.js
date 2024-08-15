import './App.css';
import {useEffect, useState} from "react";
import {Button,Row, Col, Container, Nav, Navbar, Carousel} from "react-bootstrap";
import {Routes, Route, Link, useNavigate, useLocation} from 'react-router-dom' // 라우트 주소 필요한 것
import { useSelector, useDispatch} from "react-redux"; // store.js State 가져오기.
import { createGlobalStyle } from 'styled-components'; // font 불러오기 (ReadingPage 용)
import DefaultLayout from './Defaultlayout.js';
import Login from "./route/login.js" // login page 연결
import NovelCarousel from './components/NovelCarousel.js'; // Carousel 분리
import Card from './components/Card.js'; // card 분리
import Detail from './route/Detail.js';
import Sidebar from './components/Sidebar.js'; // 새로 만들 Sidebar 컴포넌트
import Account from "./route/Account.js";
import Setting from "./components/Setting.js"
import ReadingPage from './route/ReadingPage.js';
import Home from './route/Home.js';
import Search from './route/Search.js'

function App() {
  let novels = useSelector((state) => state.novels);
  let [categorySelectNovels, setCategorySelectNovels] = useState(novels);
  let [category, setCategory] = useState("All");
  let [isLogin, setIsLogin] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  const handleCategory = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    // 로그인 여부에 따라 isLogin 셋팅 다르게.
    const checkLoginStatus = ()=>{
      let isLoggedIn = sessionStorage.getItem('isLogin') === 'true';
      setIsLogin(isLoggedIn);
    }

    checkLoginStatus();

    if(location.state){
      if(location.state.justLoggedIn || location.state.justLoggedOut){
        checkLoginStatus();
      navigate('/', {replace : true, state :{}});
      }
      
    }
  }, [location, navigate]);


  useEffect(()=>{
    let filteredNovels;
    if (category === "All") {
      filteredNovels = novels;
    } else {
      filteredNovels = novels.filter(novel => novel.category === category);
    }
    setCategorySelectNovels(filteredNovels);

    navigate("/");
  
  }, [category, setCategory]);


  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout isLogin ={isLogin} setIsLogin={setIsLogin} handleCategory={handleCategory} />}>
          <Route index element={<Home novels={categorySelectNovels} />} />
          <Route path="login" element={<Login isLogin ={isLogin} setIsLogin={setIsLogin} />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="account/:id" element={<Account />} />
          <Route path="account/:id/setting" element={<Setting />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/detail/:id/read" element={<ReadingPage isLogin ={isLogin} setIsLogin={setIsLogin} />} />
      </Routes>
    </>
  );
}

export default App;


