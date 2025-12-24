import { useContext, useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { UserDetailContainer } from "../styles/Styles";
import {
  DriverLicenseImg,
  Label,
  UserDatailBox,
  Input,
  UpdateUserButton,
} from "./UserDetail.styles";

import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Nophoto from "../../../assets/Nophoto.png";

const UserDetail = () => {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseImg, setlicenseImg] = useState("");
  const [loading, setLoading] = useState(true);
const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  // 로그인 체크 (한 번만)
  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      setLoading(false);
      if (!auth.isAuthenticated) {
        alert("로그인부터 해주세요");
        navi("/");
      }
    }
  }, [auth, navi]);

  // auth 값으로 기본 입력값 채우기
  useEffect(() => {
    if (auth && auth.isAuthenticated) {
      setUserId(auth.userId || "");
      setUserName(auth.userName || "");
      setBirthday(auth.birthDay || "");
      setEmail(auth.email || "");
      setPhone(auth.phone || "");
      const imgUrl = auth.licenseUrl;
      setlicenseImg(imgUrl !== "null" && imgUrl?.trim() !== "" ? imgUrl : "");
    }
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SideBar></SideBar>
      <UserDetailContainer>
        <h2 style={{ marginTop: "100px" }}>PROFILE</h2>
        <DriverLicenseImg src={licenseImg || Nophoto} alt="Driver License" />
        <UserDatailBox>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              readOnly
            />
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              readOnly
            />
          </div>

          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              readOnly
            />
          </div>
        </UserDatailBox>
      </UserDetailContainer>
    </>
  );
};

export default UserDetail;
