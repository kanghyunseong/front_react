import { useState, forwardRef } from "react";
import {
  Container,
  FileInput,
  FileLabel,
  Form,
  Input,
  LogoBox,
  LogoImage,
  SignUpText,
} from "./Join.style";
import logo from "../../../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
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

  const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <Input
      onClick={onClick}
      value={value}
      placeholder={placeholder}
      readOnly
      ref={ref}
    />
  ));

  return (
    <Container>
      <LogoBox>
        <a onClick={() => navi("/")}>
          <LogoImage src={logo} alt="logo" />
        </a>
        <SignUpText>Sign Up</SignUpText>
      </LogoBox>

      <Form>
        <Input
          type="text"
          placeholder="ID *"
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password *"
          onChange={(e) => {
            setUserPwd(e.target.value);
          }}
          maxLength={"15"}
          minLength={"4"}
          required
        />

        <Input
          type="password"
          placeholder="Confirm Password *"
          onChange={(e) => {
            setConfirmPwd(e.target.value);
          }}
          maxLength={"15"}
          minLength={"4"}
          required
        />

        <Input
          type="text"
          placeholder="Full Name *"
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
          placeholder="Phone Number"
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
          minDate={minDate}
          maxDate={maxDate}
          showYearDropdown
          scrollableYearDropdown
          customInput={<CustomInput />}
        />

        <FileLabel className="inputFileCustom" htmlFor="inputFile" />
        <FileInput type="file" accept="image/*" id="inputFile" />
      </Form>
    </Container>
  );
};

export default Join;
