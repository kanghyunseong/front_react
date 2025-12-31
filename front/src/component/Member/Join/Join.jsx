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
import { axiosPublic } from "../../../api/reqService";

const Join = () => {
  const navi = useNavigate();
  const [loading, isLoading] = useState(false);
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
  // 에러용
  const [errors, setErrors] = useState({
    userId: "",
    userPwd: "",
    userName: "",
    birthday: "",
    email: "",
    phone: "",
    confirmPwd: "",
  });

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
    e.preventDefault();
    isLoading(true);
    let newErrors = {};
    const regexpId = /^[a-zA-Z][a-zA-Z0-9_]{4,20}$/;
    const regexpPwd = /^[a-zA-Z0-9]{5,20}$/;
    const regexpName = /^[가-힣]{2,5}$/;
    const regexpbirth =
      /^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regexpEmail = /^[^@\s]+@[^@\s]+$/;
    const regexpPhone = /^010-\d{4}-\d{4}$/;

    if (!regexpId.test(userId)) {
      newErrors.userId = "아이디 값은 5글자 이상 20자 이하만 가능합니다.";
    } else if (!regexpPwd.test(userPwd)) {
      newErrors.userPwd = "비밀번호는 문자+숫자만 가능합니다.";
    } else if (userPwd !== confirmPwd) {
      newErrors.confirmPwd = "비밀번호가 일치하지 않습니다.";
    } else if (!regexpName.test(userName)) {
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
    formData.append("memberPwd", userPwd);
    formData.append("memberName", userName);
    formData.append("birthDay", formatDate(birthday));
    formData.append("email", email);
    formData.append("phone", phone);
    if (file) {
      formData.append("licenseImg", file);
      console.log(file);
    }

    // axios
    //   .post(`${apiUrl}/members`, formData)
    //   .then((result) => {
    //     console.log(result);
    //     if (result.status === 201) {
    //       alert("회원 가입 성공");
    //       setTimeout(() => {
    //         navi("/members/login");
    //       }, 1000);
    //     }
    //   })
    axiosPublic
      .post(`/api/members`, formData)
      .then((res) => {
        console.log(res);
        if (res.message) {
          alert(res.message);

          setTimeout(() => {
            navi("/members/login");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Network Error") {
          alert("서버네트워크의 문제가 생겼습니다.");
        }
        alert(error.response.data.message);
        isLoading(false);
      });
  };

  return (
    <Container>
      <LogoBox>
        <a onClick={() => navi("/")}>
          <LogoImage src={logo} alt="logo" />
        </a>
        <SignUpText>Sign Up</SignUpText>
      </LogoBox>
      {loading ? (
        <Title>회원가입 시도중 ... </Title>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="ID"
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.userId}
          </label>
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
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.userPwd}
          </label>

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
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {errors.confirmPwd}
          </label>
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

export default Join;
