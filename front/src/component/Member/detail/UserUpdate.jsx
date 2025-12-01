import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import {
  FileInput,
  FileLabel,
  Form,
  UserDetailContainer,
} from "../styles/Styles";
import {
  Label,
  UserDatailBox,
  Input,
  UpdateUserButton,
} from "./UserDetail.styles";
import { AuthContext } from "../../../context/AuthContext";
import defaultImg from "../../../assets/LoginFileImg.png";
import axios from "axios";

const UserUpdate = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  // localStorage에서 초기값 가져오기
  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  );
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");

  // 파일
  const [file, setFile] = useState(null);
  const [fileImg, setFileImg] = useState(() => {
    const img = localStorage.getItem("licenseImg");
    return img && img !== "null" ? img : null;
  });

  const [loading, setLoading] = useState(true);

  // ✔ 로그인 여부 확인
  useEffect(() => {
    // auth 정보가 로드될 때까지 대기
    if (auth && auth.isAuthenticated !== undefined) {
      setLoading(false);

      if (!auth.isAuthenticated) {
        alert("로그인이 필요한 서비스입니다.");
        navi("/");
        return;
      }

      // AuthContext에서 최신 정보로 업데이트
      setUserName(auth.userName || "");
      setEmail(auth.email || "");
      setPhone(auth.phone || "");

      // 프로필 이미지
      if (auth.licenseImg && auth.licenseImg !== "null") {
        setFileImg(auth.licenseImg);
      }
    }
  }, [auth, navi]);

  // ✔ 파일 이미지 미리보기
  const handleFileChange = (e) => {
    const upload = e.target.files[0];
    if (upload) {
      setFile(upload);
      setFileImg(URL.createObjectURL(upload)); // 미리보기
    }
  };

  // ✔ 유저 정보 업데이트 요청
  const handleUpdateUser = (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(email);
    console.log(phone);
    console.log(file);

    const formData = new FormData();
    formData.append("memberName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    if (file) formData.append("licenseImg", file);

    axios
      .put("http://localhost:8081/members/updateUser", formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("회원 정보가 수정되었습니다.");

        // localStorage 업데이트
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
      })
      .catch((err) => {
        const msg =
          err?.response?.data["error-message"] ||
          "회원 정보 수정 중 문제가 발생했습니다.";
        alert(msg);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SideBar />
      <UserDetailContainer>
        <h2 style={{ marginTop: "100px" }}>Edit Profile</h2>
        <Form onSubmit={handleUpdateUser}>
          <FileLabel htmlFor="inputFile" fileImg={fileImg || defaultImg} />
          <FileInput
            type="file"
            accept="image/*"
            id="inputFile"
            onChange={handleFileChange}
          />

          <UserDatailBox>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <UpdateUserButton>회원 수정</UpdateUserButton>
          </UserDatailBox>
        </Form>
      </UserDetailContainer>
    </>
  );
};

export default UserUpdate;
