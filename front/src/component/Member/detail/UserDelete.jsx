import { useState, useContext, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import { UserDetailContainer } from "../styles/Styles";
import {
  Label,
  UserDatailBox,
  Input,
  DeleteUserButton,
} from "./UserDetail.styles";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../../api/reqService";

const UserDelete = () => {
  const [userPwd, setUserPwd] = useState("");
  const [agree, setAgree] = useState("");
  const { auth, logout } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      if (!auth.isAuthenticated) {
        alert("로그인부터 해주세요");
        navi("/");
      }
    }
  }, [auth, navi]);
  const handleDelete = () => {
    if (agree !== "동의합니다") {
      alert("회원탈퇴를 원하신다면 동의합니다를 정확히 적어주세요.");
      return;
    }
    axiosAuth
      .deleteUser(`/api/members`, { userPwd })
      .then((result) => {
        console.log(result);
        alert(result.message);
        logout();
        navi("/");
      })
      .catch((err) => {
        if (err.status === 403) {
          alert("잘못된 유저입니다.");
        } else {
          alert(err.response.data.message);
        }
      });
  };

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
          <DeleteUserButton onClick={handleDelete}>회원 탈퇴</DeleteUserButton>
        </UserDatailBox>
      </UserDetailContainer>
    </>
  );
};

export default UserDelete;
