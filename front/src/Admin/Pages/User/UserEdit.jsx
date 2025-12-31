import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./UserEdit.styles";
import { axiosAuth } from "../../../api/reqService";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const UserEdit = () => {
  const { userNo } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  const [user, setUser] = useState({
    userNo: "",
    userName: "",
    email: "",
    phone: "",
    licenseImg: "",
    licenseStatus: "N",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axiosAuth.getList(`/api/admin/users/${userNo}`);
        setUser(response.data);
      } catch (err) {
        console.error("유저 정보 조회 실패:", err);
        alert("유저 정보를 불러오는데 실패했습니다.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userNo, auth.accessToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleApprove = () => {
    if (window.confirm("면허증 정보를 확인했으며, 승인하시겠습니까?")) {
      setUser({ ...user, licenseStatus: "Y" });
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosAuth.put(`/api/admin/users`, user);
      alert("정보가 성공적으로 수정되었습니다.");
      navigate("/admin/user/userOverview");
    } catch (err) {
      console.error("수정 실패:", err);
      alert("정보 수정에 실패했습니다.");
    }
  };

  if (loading)
    return (
      <S.LoadingWrapper>사용자 데이터를 불러오는 중입니다...</S.LoadingWrapper>
    );

  return (
    <S.PageWrapper>
      <S.TitleSection>
        <div className="back-nav" onClick={() => navigate(-1)}>
          <FaArrowLeft /> 돌아가기
        </div>
        <h2>
          User Management <span>Edit & Approval</span>
        </h2>
        <p>
          사용자의 개인정보 수정 및 면허증 진위 여부를 확인하여 가입을
          승인합니다.
        </p>
      </S.TitleSection>

      <S.Container>
        <S.MainGrid>
          {/* 왼쪽: 기본 정보 수정 섹션 */}
          <S.FormSection>
            <S.SectionHeader>
              <FaUser /> 기본 정보
            </S.SectionHeader>
            <S.FormGroup>
              <label>이름</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  name="userName"
                  value={user.userName}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                />
              </div>
            </S.FormGroup>

            <S.FormGroup>
              <label>이메일 계정</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>
            </S.FormGroup>

            <S.FormGroup>
              <label>연락처</label>
              <input
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                placeholder="010-0000-0000"
              />
            </S.FormGroup>
          </S.FormSection>

          {/* 오른쪽: 면허 승인 섹션 */}
          <S.LicenseSection>
            <S.SectionHeader>
              <FaIdCard /> 면허증 확인 및 승인
            </S.SectionHeader>
            <S.ImageContainer>
              {user.licenseImg ? (
                <img src={user.licenseImg} alt="Driver License" />
              ) : (
                <div className="no-img">
                  <FaIdCard size={40} />
                  <p>등록된 면허증 이미지가 없습니다.</p>
                </div>
              )}
            </S.ImageContainer>

            <S.StatusBox $isApproved={user.licenseStatus === "Y"}>
              <div className="status-info">
                <span className="label">현재 승인 상태</span>
                <span className="value">
                  {user.licenseStatus === "Y" ? "승인 완료" : "승인 대기"}
                </span>
              </div>

              {user.licenseStatus === "N" ? (
                <S.ApproveButton onClick={handleApprove}>
                  면허 승인 처리
                </S.ApproveButton>
              ) : (
                <div className="approved-badge">
                  <FaCheckCircle /> 승인됨
                </div>
              )}
            </S.StatusBox>
          </S.LicenseSection>
        </S.MainGrid>

        <S.ButtonGroup>
          <button className="cancel" onClick={() => navigate(-1)}>
            취소
          </button>
          <button className="save" onClick={handleSubmit}>
            변경사항 저장하기
          </button>
        </S.ButtonGroup>
      </S.Container>
    </S.PageWrapper>
  );
};

export default UserEdit;
