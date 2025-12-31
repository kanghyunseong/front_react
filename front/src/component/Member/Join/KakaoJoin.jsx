import { useState, forwardRef, useEffect } from "react";
import {
  Button,
  Container,
  FileInput,
  FileLabel,
  Form,
  Input,
  LogoBox,
  LogoImage,
  SignUpText,
  Title,
} from "../styles/Styles";
import logo from "../../../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultImg from "../../../assets/LoginFileImg.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { axiosPublic } from "../../../api/reqService";
const KakaoJoin = () => {
  const location = useLocation();

  const { userId, refreshToken, accessToken, provider } = location.state || {};
  console.log(
    "카카오 회원가입 데이터:",
    userId,
    refreshToken,
    accessToken,
    provider
  );
  const navi = useNavigate();
  const [loading, isLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // 날짜용
  const [birthday, setBirthday] = useState("");
  const today = new Date();
  // 파일용
  const [file, setFile] = useState(null); // 서버 전송용 File 객체
  const [fileImg, setFileImg] = useState(null); // 미리보기 URL
  // 에러용
  const [errors, setErrors] = useState({
    userName: "",
    birthday: "",
    email: "",
    phone: "",
  });
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  useEffect(() => {
    if (userId === undefined) {
      // 비정상 접근 → 홈으로 이동
      alert("비정상적인 접근입니다.");
      navi("/");
    }
  }, [userId, navi]);

  // 날짜용 const

  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );

  const formatDate = (date) => {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const allowTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 1024 * 1024 * 10;
    if (selectedFile && !allowTypes.includes(selectedFile.type)) {
      alert("이미지만 올려주세요 확장자는 jpg등등 이런거만 가능합니다.");
      return;
    }
    if (selectedFile && selectedFile.size > maxSize) {
      alert("너무 용량이 커요 힘듭니다 서버가");
      return;
    }

    if (selectedFile) {
      setFile(selectedFile); // 실제 서버 전송용
      setFileImg(URL.createObjectURL(selectedFile)); // Label 배경용 미리보기
    }
  };

  const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <Input
      onClick={onClick}
      value={value}
      placeholder={placeholder}
      readOnly
      ref={ref}
    />
  ));

  // 서버에 요청
  const handleSubmit = (e) => {
    // 카카오

    e.preventDefault();
    isLoading(true);
    let newErrors = {};
    const regexpName = /^[가-힣]{2,5}$/;
    const regexpbirth =
      /^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regexpEmail = /^[^@\s]+@[^@\s]+$/;
    const regexpPhone = /^010-\d{4}-\d{4}$/;

    if (!regexpName.test(userName)) {
      newErrors.userName = "이름은 한글로 2~5글자여야 합니다.";
    } else if (!regexpbirth.test(formatDate(birthday))) {
      newErrors.birthday = "생년월일 형식이 올바르지 않습니다.";
    } else if (!regexpEmail.test(email)) {
      newErrors.email = "이메일 형식이 아닙니다.";
    } else if (!regexpPhone.test(phone)) {
      newErrors.phone = "전화번호 형식이 올바르지 않습니다.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      isLoading(false); //
      return;
    }

    const formData = new FormData();
    formData.append("memberId", userId);
    formData.append("provider", provider);
    formData.append("memberName", userName);
    formData.append("birthDay", formatDate(birthday));
    formData.append("email", email);
    formData.append("phone", phone);
    if (file) {
      formData.append("licenseImg", file);
      console.log(file);
    }

    // axios
    //   .post(`${apiUrl}/members/kakao`, formData)
    axiosPublic
      .post(`/api/members/kakao`, formData)

      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          alert("소셜 로그인  회원 가입 성공");
          setTimeout(() => {
            navi("/");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data["error-message"]);
        isLoading(false);
      });
  };

  return (
    <Container>
      <LogoBox>
        <a onClick={() => navi("/")}>
          <LogoImage src={logo} alt="logo" />
        </a>
        <SignUpText style={{ color: "#FEE500" }}>Kakao Sign Up</SignUpText>
      </LogoBox>
      {loading ? (
        <Title>회원가입 시도중 ... </Title>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.userName}
          </label>
          <Input
            type="text"
            placeholder="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.email}
          </label>
          <Input
            type="text"
            placeholder="Phone Number 010-1234-5678"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.phone}
          </label>
          <DatePicker
            selected={birthday}
            onChange={(date) => setBirthday(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Birthday YYYY-MM-DD"
            maxDate={today}
            minDate={minDate}
            showYearDropdown
            scrollableYearDropdown
            customInput={<CustomInput />}
          />
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.birthday}
          </label>
          <FileLabel htmlFor="inputFile" fileImg={fileImg || defaultImg} />
          <FileInput
            type="file"
            accept="image/*"
            id="inputFile"
            onChange={handleFileChange}
          />
          <Button>Create Account</Button>
        </Form>
      )}
    </Container>
  );
};

export default KakaoJoin;
