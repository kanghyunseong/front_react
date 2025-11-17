import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { UserDetailContainer } from "../styles/Styles";
import {
  DriverLicenseImg,
  Label,
  UserDatailBox,
  Input,
  UpdateUserButton,
} from "./UserDetail.styles";

const UserDetail = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <SideBar></SideBar>
      <UserDetailContainer>
        <h2 style={{ marginTop: "100px" }}>PROFILE</h2>
        <DriverLicenseImg
          src="https://blog.kakaocdn.net/dna/b48sqJ/btsD0I89OOR/AAAAAAAAAAAAAAAAAAAAALWWxrJBN4MWC72RUyyuGCpa_KFxJvm8rz6zUsmtnLnk/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1764514799&allow_ip=&allow_referer=&signature=OglTHGm4b%2BrEM%2FhFNHnCu%2BpNg0I%3D"
          alt=""
        />

        <UserDatailBox>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </UserDatailBox>
      </UserDetailContainer>
    </>
  );
};

export default UserDetail;
