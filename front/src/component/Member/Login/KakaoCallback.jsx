import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // navi hook 추가
import { AuthContext } from "../../../context/AuthContext"; // AuthContext import

const KakaoLoginCallback = () => {
  const { login } = useContext(AuthContext); // 로그인 함수 가져오기
  const navi = useNavigate(); // navigate hook 사용
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  useEffect(() => {
    // URL의 쿼리 파라미터에서 code와 state 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("code:", code);
    if (code) {
      // 백엔드로 code와 state를 전달하는 요청
      axios
        .get(`${apiUrl}/api/members/kakao/callback`, {
          params: { code },
        })
        .then((response) => {
          // 로그인 성공 후, AuthContext에 로그인 정보 저장
          const data = response.data;
          if (data.message === "회원가입 필요") {
            alert("회원가입 부터 해주세요");
            const { provider, accessToken, refreshToken, userId } = data;

            navi("/members/KakaoJoin", {
              state: { userId, refreshToken, accessToken, provider },
            });
          } else {
            // 로그인 성공 처리
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
              licenseUrl,
              provider,
            } = response.data;

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
              licenseUrl,
              provider
            );

            alert("로그인 성공!");
            navi("/");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("로그인 처리 중 오류 발생");
        });
    }
  }, []);

  return <div></div>;
};

export default KakaoLoginCallback;
