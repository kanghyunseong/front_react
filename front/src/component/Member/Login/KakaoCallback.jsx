import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { axiosPublic } from "../../../api/reqService";

const KakaoLoginCallback = () => {
  const { login } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    axiosPublic
      .getList(`/api/members/kakao/callback?code=${code}`)
      .then((res) => {
        //  회원가입 필요

        if (res.message === "회원가입 필요") {
          alert("회원가입부터 해주세요");

          const { provider, accessToken, refreshToken, userId } = data;

          navi("/members/KakaoJoin", {
            state: { userId, accessToken, refreshToken, provider },
          });
          return;
        }

        //  로그인 성공
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
        } = res.data;

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

        alert("로그인 성공");
        navi("/");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data.message);
      });
  }, []);

  return <div />;
};

export default KakaoLoginCallback;
