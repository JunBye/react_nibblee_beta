

import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const SettingContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const BackIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #333;
  cursor: pointer;
`;

const LogoImage = styled.div`
  width: calc(100% - 1px); // 로고 이미지의 실제 크기에 맞게 조정해주세요
  height: 100px; // 로고 이미지의 실제 크기에 맞게 조정해주세요
  background-image: url('/img/니블리 공식 로고.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;


const Logo = styled.div`
  color: #9240B5;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
`;

const SectionContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 20px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 0;
`;

const H2 = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background-color: #9240B5;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 10px;
`;

const EditButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #9240B5;
  cursor: pointer;
`;

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  p:first-child {
    color: #888;
  }
`;

const ReadingOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SubText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #9240B5;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }
`;

const Clickable = styled.div`
  cursor: pointer;
`;

export default function Setting() {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id == id);
  const location = useLocation();
  const navigate = useNavigate();

  const goToPrev = ()=>{
    navigate(`/account/${id}`);
  }
  if (!user) {
    return <div>User Not Found</div>;
  }

  return (
    <SettingContainer>
      <Header>
        <BackIcon icon={faChevronLeft} onClick = {goToPrev}/>
        <LogoImage/>
      </Header>

      <SectionContainer>
        <Section>
          <H2>Profile</H2>
          <ProfileInfo>
            <ProfileImage>
              {user.nickname.substring(0, 2).toUpperCase()}
            </ProfileImage>
            <span>{user.nickname}</span>
            <EditButton>Edit</EditButton>
          </ProfileInfo>
        </Section>
      </SectionContainer>

      <SectionContainer>
        <Section>
          <H2>Account</H2>
          <AccountInfo>
            <p>Username</p>
            <p>@{user.id}</p>
          </AccountInfo>
          <AccountInfo>
            <p>Email</p>
            <p>{user.email}</p>
          </AccountInfo>
          <AccountInfo>
            <p>Password</p>
            <p>••••••••••</p>
            <EditButton>Edit</EditButton>
          </AccountInfo>
        </Section>
      </SectionContainer>

      <SectionContainer>
        <Section>
          <H2>Reading</H2>
          <ReadingOption>
            <div>
              <p>Automatically unlock episodes</p>
              <SubText>
                You won't need to confirm to unlock if you have enough credits
                whenever opening a new paid episode.
              </SubText>
            </div>
            <Switch>
              <input type="checkbox" />
              <Slider />
            </Switch>
          </ReadingOption>
          <Clickable>
            <p>Submit a wishlist</p>
          </Clickable>
        </Section>
      </SectionContainer>

      <SectionContainer>
        <Section>
          <H2>Legal</H2>
          <Clickable>
            <p>Terms & Conditions</p>
          </Clickable>
        </Section>
      </SectionContainer>
    </SettingContainer>
  );
}