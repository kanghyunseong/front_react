import { useState, useContext, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import { Form, UserDetailContainer } from "../styles/Styles";
import {
  Label,
  UserDatailBox,
  Input,
  ChangePwdButton,
} from "./UserDetail.styles";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../../api/reqService";
const UserChangePwd = () => {
  const [userPwd, setUserPwd] = useState("");
  const [changePwd, setchangePwd] = useState("");
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      if (!auth.isAuthenticated) {
        alert("로그인부터 해주세요");
        navi("/");
      }
    }
  }, [auth, navi]);
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // console.log("현재 비밀번호:", userPwd);
    // console.log("변경 비밀번호:", changePwd);

    const regexpPwd = /^[a-zA-Z0-9]{5,20}$/;

    if (!regexpPwd.test(userPwd)) {
      alert("비밀번호는 영어/숫자로 5~20자로 입력해주세요.");
      return;
    }

    if (!regexpPwd.test(changePwd)) {
      alert("비밀번호는 영어/숫자로 5~20자로 입력해주세요.");
      return;
    }
    if (userPwd === changePwd) {
      alert("바꾸실려는 비밀번호와 현재 비밀번호가 동일합니다.");
      return;
    }

    // axios
    //   .put(
    //     `${apiUrl}/members`,
    //     {
    //       userPwd,
    //       changePwd,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth.accessToken}`,
    //       },
    //     }
    //   )
    axiosAuth
      .put(`/api/members`, { userPwd, changePwd })
      .then((result) => {
        // console.log(result);
        if (result.success === "요청 성공") {
          alert(result.message);
          navi("/members/detail");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response.data.message || "비밀번호 변경 중 문제 발생";
        alert(errorMessage);
      });
  };

  return (
    <>
      <SideBar></SideBar>
      <UserDetailContainer>
        <h2 style={{ marginTop: "100px" }}>Change PassWord</h2>
        <Form onSubmit={handleUpdatePassword}>
          <UserDatailBox
            style={{ gridTemplateColumns: "none", width: "700px" }}
          >
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
        </Form>
      </UserDetailContainer>
    </>
  );
};

export default UserChangePwd;
