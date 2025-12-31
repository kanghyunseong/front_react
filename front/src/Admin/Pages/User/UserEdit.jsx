import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../../../context/AuthContext";
import {
  ApproveButton,
  ButtonGroup,
  Container,
  FormGroup,
  LicenseSection,
} from "./UserEdit.styles";

const UserEdit = () => {
  const { userNo } = useParams(); // URL에서 userNo 가져오기
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  const [user, setUser] = useState({
    userNo: "",
    userName: "",
    email: "",
    phone: "",
    licenseImg: "",
    licenseStatus: "N", // 기본값
  });
  const [loading, setLoading] = useState(true);

  // 1. 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/admin/api/users/${userNo}`,
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error("유저 정보 조회 실패:", err);
        alert("유저 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userNo, auth.accessToken]);

  // 2. 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 3. 면허 승인 (N -> Y) 핸들러
  const handleApprove = () => {
    if (window.confirm("면허증을 확인하였으며, 승인하시겠습니까?")) {
      setUser({ ...user, licenseStatus: "Y" });
    }
  };

  // 4. 저장 (수정 요청)
  const handleSubmit = async () => {
    try {
      await axios.put(`${apiUrl}/admin/api/users`, user, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      alert("수정되었습니다.");
      navigate("/admin/user/userOverview"); // 목록으로 복귀
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>User Edit / Approval</h2>

      <FormGroup>
        <label>이름</label>
        <input name="userName" value={user.userName} onChange={handleChange} />
      </FormGroup>

      <FormGroup>
        <label>이메일</label>
        <input name="email" value={user.email} onChange={handleChange} />
      </FormGroup>

      <LicenseSection>
        <h3>운전면허증 확인</h3>
        <div className="img-box">
          {user.licenseImg ? (
            <img src={user.licenseImg} alt="면허증" />
          ) : (
            <div className="no-img">등록된 면허증이 없습니다.</div>
          )}
        </div>

        <div className="status-box">
          <span>
            현재 상태: <strong>{user.licenseStatus}</strong>
          </span>

          {user.licenseStatus === "N" && (
            <ApproveButton onClick={handleApprove}>
              승인하기 (Y로 변경)
            </ApproveButton>
          )}
          {user.licenseStatus === "Y" && (
            <span style={{ color: "green", marginLeft: "10px" }}>
              ✅ 승인 완료됨
            </span>
          )}
        </div>
      </LicenseSection>

      <ButtonGroup>
        <button onClick={() => navigate(-1)}>취소</button>
        <button className="save" onClick={handleSubmit}>
          저장
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default UserEdit;
