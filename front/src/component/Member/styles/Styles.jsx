import styled from "styled-components";

import fileImg from "../../../assets/LoginFileImg.png";
import kakaoImg from "../../../assets/KakaoButton2.png";
import naverImg from "../../../assets/NaverButton.png";
export const Input = styled.input`
  background: transparent;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 4px;
  width: 400px;
  color: #000000;
  &:focus {
    outline: none;
    border-color: lightpink;
  }

  &::placeholder {
    color: #fafafa;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 100%;
  height: 1350px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgb(94, 151, 76),
    rgb(76, 157, 126),
    rgb(52, 166, 197)
  );
  box-shadow: 0 0 10px rgba(255, 172, 172, 0.6);
`;

export const SignUp = styled.h2`
  font-size: 20px;
  color: white;
`;

export const LogoBox = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
`;

export const SignUpText = styled.div`
  position: absolute;
  margin-top: 270px;
  font-size: 50px;
  font-weight: 400;
  color: white;
  margin-bottom: 30px;
  letter-spacing: 0.2em;
  font-style: oblique;
`;

export const FileLabel = styled.label`
  background: ${(props) =>
    props.fileImg
      ? `url(${props.fileImg}) no-repeat center center`
      : "transparent"};
  background-size: contain;
  border: 2px dashed rgba(255, 255, 255, 1);
  border-radius: 4px;
  width: 300px;
  height: 200px;
  color: gray;
  margin: 30px auto 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border-color: lightpink;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const Button = styled.button`
  margin: 20px auto;
  width: 300px;
  height: 50px;
  border: 0px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;
`;

export const KakaoButton = styled.button`
  width: 300px;
  height: 50px;
  background: url(${kakaoImg}) no-repeat center center;
  background-size: cover; /* 버튼 전체를 이미지로 채움 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
  padding: 0; /* 텍스트 없으니까 패딩 제거 */
`;

export const NaverButton = styled.button`
  width: 300px;
  height: 50px;
  background: url(${naverImg}) no-repeat center center;
  background-size: cover;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
  padding: 0;
`;

export const UserDetailContainer = styled.div`
  width: 100%;
  height: 1350px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 33px;
  color: #33333;
  margin-bottom: 70px;
`;

export const ProfileFileLabel = styled.label`
  width: 500px;
  height: 300px;
  margin: 0 auto;
  background-image: url(${(props) => props.fileImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
  position: relative;
  transition: 0.3s ease;

  &:hover {
    filter: brightness(0.7);

    &::after {
      content: "";

      inset: 0;
      background: rgba(255, 255, 255, 0.25);
    }
  }
`;
