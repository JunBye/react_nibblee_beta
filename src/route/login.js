import React, {useState,useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"

function Login({isLogin, setIsLogin}) {

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit= (e) => {
    e.preventDefault();

    setIsSubmit(true);
  }

  useEffect(()=>{

    if(isLogin){ // 이미 로그인 되어있는 채로 이 창에오면?
      navigate(-1);
    }

    else if(isSubmit && !isLogin){ // 방금 로그인 버튼을 누르고, 로그인 안된 상태라면

      sessionStorage.setItem('isLogin', 'true');
      sessionStorage.setItem('user_info', JSON.stringify({email, password}));
      setIsLogin(true);
      setIsSubmit(false); //초기화
      navigate(-1, {state : {justLoggedIn : true}});
    }

  }, [isSubmit, isLogin, email, password, navigate]);
  
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <p className="text-center">카테고리 분류한거임 BL과 로판 작품은 절대 한페이지에 같이 나올 수 없다!</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="email" placeholder="이메일 주소"
              value ={email} onChange={(e)=>setEmail(e.target.value)}
              required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="비밀번호" 
              value ={password} onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              로그인
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Button variant="link">회원가입</Button>
            <Button variant="link">비밀번호 찾기</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;