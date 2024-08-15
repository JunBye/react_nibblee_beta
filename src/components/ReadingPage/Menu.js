import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
`;
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding : 0;
  color: ${props => props.theme.textColor};
`;

const MenuTitle = styled.h2`
  margin : 0;
  font-size:24px;
  color: ${props => props.theme.textColor};
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 15px 0;
  font-size: 18px;
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.textColor};
  &:hover {
    color: #007bff;
  }
`;

const Menu = ({ isOpen, onClose, isLogin, setIsLogin }) => {
  const { id } = useParams();
  const novels = useSelector(state => state.novels);
  const currentNovel = novels.find(novel => novel.id === parseInt(id));
  const navigate = useNavigate();
  const goToPrev = () => { navigate(`/detail/${id}`)};
  
  const handleLoginClick = ()=>{ navigate('/login')};

  const handleLogoutClick = ()=>{
    setIsLogin(false);
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('user_info');
    navigate('/', {state: {justLoggedOut : true}})
  };

  return (
    <MenuSidebar isOpen={isOpen}>
      <TitleBar>
        {currentNovel && <MenuTitle onClick ={goToPrev}>{currentNovel.title}</MenuTitle>}
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </TitleBar>
      
      <MenuList>
        <MenuItem>
          <MenuLink href="#toc">Table of Contents</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#reviews">Reviews</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#author">About the Author</MenuLink>
        </MenuItem>
        
        {isLogin ? ( // 로그인 되어있을때 
          <>
          <MenuItem><MenuLink>My Profile</MenuLink></MenuItem>
          <MenuItem><MenuLink onClick ={handleLogoutClick}>Log Out</MenuLink></MenuItem>
          
          </>
        ) : ( // 로그인 안되어있을때 
          <>
            <MenuItem><MenuLink onClick ={handleLoginClick}>Log In</MenuLink></MenuItem>
          </>
        )}
          
        
      </MenuList>
    </MenuSidebar>
  );
};

export default Menu;