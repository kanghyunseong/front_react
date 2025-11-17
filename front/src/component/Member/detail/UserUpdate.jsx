import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import {
  FileInput,
  FileLabel,
  Form,
  UserDetailContainer,
} from "../styles/Styles";
import {
  DriverLicenseImg,
  Label,
  UserDatailBox,
  Input,
  UpdateUserButton,
} from "./UserDetail.styles";
import defaultImg from "../../../assets/LoginFileImg.png";

const UserUpdate = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 파일용
  const [file, setFile] = useState(null); // 서버 전송용 File 객체
  const [fileImg, setFileImg] = useState(null); // 미리보기 URL
  return (
    <>
      <SideBar></SideBar>
      <UserDetailContainer>
        <Form>
          <FileLabel htmlFor="inputFile" fileImg={fileImg || defaultImg} />
          <FileInput type="file" accept="image/*" id="inputFile" />

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
              />
            </div>
            <div></div>
            <UpdateUserButton>회원 수정</UpdateUserButton>
          </UserDatailBox>
        </Form>
      </UserDetailContainer>
    </>
  );
};

export default UserUpdate;
