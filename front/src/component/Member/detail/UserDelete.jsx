import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { UserDetailContainer } from "../styles/Styles";
import {
  Label,
  UserDatailBox,
  Input,
  DeleteUserButton,
} from "./UserDetail.styles";

const UserDelete = () => {
  const [userPwd, setUserPwd] = useState("");
  const [agree, setAgree] = useState("");

  return (
    <>
      <SideBar></SideBar>
      <UserDetailContainer>
        <h2 style={{ marginTop: "100px" }}>Change PassWord</h2>
        <UserDatailBox style={{ gridTemplateColumns: "none", width: "700px" }}>
          <div>
            <Label>Current Password</Label>
            <Input
              type="password"
              placeholder="Current password"
              onChange={(e) => setUserPwd(e.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <Label>회원탈퇴에 동의합니까 동의하신다면 똑같이 적어주세요</Label>
            <Input
              type="text"
              placeholder="동의합니다"
              onChange={(e) => setAgree(e.target.value)}
              required
            />
          </div>
          <br />
          <DeleteUserButton>회원 탈퇴</DeleteUserButton>
        </UserDatailBox>
      </UserDetailContainer>
    </>
  );
};

export default UserDelete;
