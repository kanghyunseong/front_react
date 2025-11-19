import { useContext, useState } from "react";
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
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {
  const navi = useNavigate();
  const [memberId, setUserId] = useState("");
  const [memberPwd, setUserPwd] = useState("");
  const [msg, setMsg] = useState("");
  const { login } = useContext(AuthContext);

  const kakaoLogin = () => {
    axios.get("http://localhost:8081/members/kakao").then((result) => {
      console.log(result);
    });
  };
  const naverLogin = () => {
    axios
      .get("http://localhost:8081/members/naver")
      .then((result) => {
        const naverLoginUrl = result.data;

        // 네이버 로그인 페이지로 이동 (axios가 아니라 window.location 사용)
        window.location.href = naverLoginUrl;
      })
      .catch((err) => console.error(err));
  };
  // 서버에 요청
  const handleLogin = (e) => {
    e.preventDefault();

    const regexpPwd = /^[a-zA-Z0-9]*$/;

    if (!regexpPwd.test(memberId)) {
      setMsg("아이디나 비밀번호는 영문이거나 숫자만 사용가능합니다.");
      return;
    } else if (!regexpPwd.test(memberPwd)) {
      setMsg("아이디나 비밀번호는 영문이거나 숫자만 사용가능합니다.");
      return;
    } else {
      setMsg("");
    }

    axios
      .post("http://localhost:8081/members/login", {
        memberId,
        memberPwd,
      })
      .then((result) => {
        console.log(result);
        const {
          userNo,
          userName,
          userId,
          role,
          phone,
          email,
          birthDay,
          refreshToken,
          accessToken,
        } = result.data;

        login(
          accessToken,
          refreshToken,
          userNo,
          userName,
          userId,
          role,
          phone,
          email,
          birthDay
        );
        alert("로그인에 성공하셨습니다.");
        navi("/");
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data["error-message"]);
      });
  };
  return (
    <Container>
      <LogoBox>
        <a onClick={() => navi("/")}>
          <LogoImage src={logo} alt="logo" />
        </a>
        <SignUpText>Sign Up</SignUpText>
      </LogoBox>

      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="ID"
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
          {msg}
        </label>
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

        <Button type="submit">Login</Button>
        <KakaoButton onClick={kakaoLogin} type="button"></KakaoButton>
        <NaverButton onClick={naverLogin} type="button"></NaverButton>
      </Form>
    </Container>
  );
};

export default Login;
