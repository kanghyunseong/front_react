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
import { AuthContext } from "../../../context/AuthContext";
import { axiosPublic } from "../../../api/reqService";

const Login = () => {
  const CLIENT_API = window.ENV?.CLIENT_URL || "http://localhost:5173";
  const NAVER_REDIRECT_URI = `${CLIENT_API}/members/naver/callback`;
  const navi = useNavigate();
  const [memberId, setUserId] = useState("");
  const [memberPwd, setUserPwd] = useState("");
  const [msg, setMsg] = useState("");
  const { login } = useContext(AuthContext);

  const kakaoLogin = () => {
    location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=9ab6eed4ca0b2e40761693da623540b9&redirect_uri=${CLIENT_API}/members/kakao/callback`;
  };
  const naverLogin = () => {
    location.href =
      "https://nid.naver.com/oauth2.0/authorize" +
      "?response_type=code" +
      "&client_id=Kki4fyVYcYf_zkU2HAq8" +
      "&redirect_uri=" +
      encodeURIComponent(NAVER_REDIRECT_URI) +
      "&state=state_1763619065972_14825";

    //const barabam = await axios.get("http://localhost:8081/members/naver");
    /*
      .then((result) => {
        const naverLoginUrl = result.data;

        var abc = window.open(naverLoginUrl, "_blank", "width=500,height=600");
        console.log(abc);

      })
      .catch((err) => console.error(err));
      */
    //const naverLoginUrl = barabam.data;

    //window.open(naverLoginUrl, "_blank", "width=500,height=600");
  };

  // 서버에 요청
  const handleLogin = (e) => {
    e.preventDefault();

    const regexpPwd = /^[a-zA-Z0-9]*$/;

    if (!regexpPwd.test(memberId)) {
      setMsg("아이디나 비밀번호를 확인해주세요");
      return;
    } else if (!regexpPwd.test(memberPwd)) {
      setMsg("아이디나 비밀번호를 확인해주세요");
      return;
    } else {
      setMsg("");
    }

    // axios
    //   .post("http://localhost:8081/members/login", {
    //     memberId,
    //     memberPwd,
    //   })
    axiosPublic
      .post("/api/members/login", {
        memberId: memberId,
        memberPwd: memberPwd,
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
          licenseUrl,
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
          birthDay,
          licenseUrl
        );
        alert(result.message);
        navi("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
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
