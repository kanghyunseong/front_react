import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { UserDetailContainer } from "../styles/Styles";
import {
  Label,
  UserDatailBox,
  Input,
  ChangePwdButton,
} from "./UserDetail.styles";

const UserChangePwd = () => {
  const [userPwd, setUserPwd] = useState("");
  const [changePwd, setchangePwd] = useState("");

  return (
    <>
      <SideBar></SideBar>
      <UserDetailContainer>
        <h2 style={{ marginTop: "100px" }}>Change PassWord</h2>
        <UserDatailBox style={{ gridTemplateColumns: "none", width: "700px" }}>
          <div>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              placeholder="Current password"
              onChange={(e) => setUserPwd(e.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <Label>변경하는 비밀번호</Label>
            <Input
              type="password"
              placeholder="Change password"
              onChange={(e) => setchangePwd(e.target.value)}
              required
            />
          </div>
          <br />
          <ChangePwdButton>비밀번호 수정</ChangePwdButton>
        </UserDatailBox>
      </UserDetailContainer>
    </>
  );
};

export default UserChangePwd;
