import { useState, forwardRef } from "react";
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
} from "../styles/Styles";
import logo from "../../../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultImg from "../../../assets/LoginFileImg.png";

const Join = () => {
  const navi = useNavigate();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // 날짜용
  const [birthday, setBirthday] = useState("");
  const today = new Date();
  // 파일용
  const [file, setFile] = useState(null); // 서버 전송용 File 객체
  const [fileImg, setFileImg] = useState(null); // 미리보기 URL

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

  // 파일 이미지용

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
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
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("userPwd", userPwd);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    if (file) {
      formData.append("file", file);
      console.log(file);
    }
  };

  return (
    <Container>
      <LogoBox>
        <a onClick={() => navi("/")}>
          <LogoImage src={logo} alt="logo" />
        </a>
        <SignUpText>Sign Up</SignUpText>
      </LogoBox>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ID"
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserPwd(e.target.value);
          }}
          maxLength={"15"}
          minLength={"4"}
          required
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPwd(e.target.value);
          }}
          maxLength={"15"}
          minLength={"4"}
          required
        />

        <Input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <Input
          type="text"
          placeholder="email"
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <Input
          type="text"
          placeholder="Phone Number 01012345678"
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

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

        <FileLabel htmlFor="inputFile" fileImg={fileImg || defaultImg} />
        <FileInput
          type="file"
          accept="image/*"
          id="inputFile"
          onChange={handleFileChange}
        />
        <Button>Create Account</Button>
      </Form>
    </Container>
  );
};

export default Join;
