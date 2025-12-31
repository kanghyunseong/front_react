import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // navi hook 추가
import { AuthContext } from "../../../context/AuthContext"; // AuthContext import
import { axiosPublic } from "../../../api/reqService";
const NaverLoginCallback = () => {
  const [msg, setMsg] = useState("");
  const { login } = useContext(AuthContext); // 로그인 함수 가져오기
  const navi = useNavigate(); // navigate hook 사용

  useEffect(() => {
    // URL의 쿼리 파라미터에서 code와 state 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code && state) {
      // 백엔드로 code와 state를 전달하는 요청
      axiosPublic
        .getList(`/api/members/naver/callback?code=${code}&state=${state}`)
        .then((response) => {
          // 로그인 성공 후, AuthContext에 로그인 정보 저장
          const {
            accessToken,
            refreshToken,
            userNo,
            userName,
            userId,
            role,
            phone,
            email,
            birthDay,
            provider,
            licenseImg,
          } = response.data;

          // 로그인 함수 호출
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
            licenseImg,
            provider
          );
          alert("로그인 성공!");
          navi("/"); // 로그인 후 홈으로 이동
        })
        .catch((error) => {
          // 실패한 경우
          setMsg("로그인 실패! 다시 시도해주세요.");
          alert(err.response.data.message);
          console.error(error);
          navi("/"); // 실패해도 홈으로 이동
        });
    }
  }, []); // 첫 렌더링 시 한 번만 실행

  return <div>{msg}</div>; // 로그인 실패 메시지 표시
};

export default NaverLoginCallback;
