import { useState } from "react";
import {
  Button,
  Container,
  FileInput,
  FileLabel,
  Form,
  Input,
  KakaoButton,
  LogoBox,
  LogoImage,
  NaverButton,
  SignUpText,
} from "../styles/Styles";
import logo from "../../../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navi = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  // 서버에 요청

  return (
    <Container>
      <LogoBox>
        <a onClick={() => navi("/")}>
          <LogoImage src={logo} alt="logo" />
        </a>
        <SignUpText>Sign Up</SignUpText>
      </LogoBox>

      <Form>
        <Input
          type="text"
          placeholder="ID"
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserPwd(e.target.value);
          }}
          maxLength={"15"}
          minLength={"4"}
          required
        />

        <Button>Login</Button>
        <KakaoButton></KakaoButton>
        <NaverButton></NaverButton>
      </Form>
    </Container>
  );
};

export default Login;
