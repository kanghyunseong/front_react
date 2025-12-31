import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import {
  FileInput,
  Form,
  ProfileFileLabel,
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
import Nophoto from "../../../assets/Nophoto.png";
import { axiosAuth } from "../../../api/reqService";
const UserUpdate = () => {
  const { auth, login } = useContext(AuthContext);
  const navi = useNavigate();

  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  );
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");
  const [file, setFile] = useState(null);
  const [fileImg, setFileImg] = useState(() => {
    const img = localStorage.getItem("licenseUrl");
    return img && img !== "null" ? img : null;
  });
  const [loading, setLoading] = useState(true);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  // ✔ 로그인 여부 확인 및 초기값 세팅
  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      setLoading(false);

      if (!auth.isAuthenticated) {
        alert("로그인이 필요한 서비스입니다.");
        navi("/");
        return;
      }

      setUserName(auth.userName || "");
      setEmail(auth.email || "");
      setPhone(auth.phone || "");
      setFileImg(
        auth.licenseUrl && auth.licenseUrl !== "null"
          ? encodeURI(auth.licenseUrl)
          : null
      );
    }
  }, [auth, navi]);

  // ✔ 파일 이미지 미리보기
  const handleFileChange = (e) => {
    const upload = e.target.files[0];
    if (upload) {
      setFile(upload);
      setFileImg(URL.createObjectURL(upload));
    }
  };

  // ✔ 유저 정보 업데이트 요청
  const handleUpdateUser = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("memberName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    if (file) formData.append("licenseImg", file);

    axiosAuth
      .put(`/api/members/updateUser`, formData)
      .then((res) => {
        const data = res.data;
        //console.log(data);
        // Context와 localStorage 동시에 업데이트
        login(
          auth.accessToken,
          auth.refreshToken,
          auth.userNo,
          data.memberName || auth.userName,
          auth.userId,
          auth.role,
          data.phone || auth.phone,
          data.email || auth.email,
          auth.birthDay,
          data.licenseUrl || auth.licenseImg,
          auth.provider
        );

        // 화면도 즉시 반영
        setUserName(data.memberName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setFileImg(data.licenseUrl || defaultImg);

        alert(res.message);
        navi("/members/detail");
      })
      .catch((err) => {
        //console.log(err.response.data.message);
        const msg =
          err?.response?.data.message ||
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
          <ProfileFileLabel htmlFor="inputFile" fileImg={fileImg || Nophoto} />

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
                disabled={auth.provider} // provider가 있으면 비활성화
                required
              />
              {auth.provider && (
                <p
                  style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}
                >
                  소셜 로그인 계정은 이메일을 변경할 수 없습니다.
                </p>
              )}
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
