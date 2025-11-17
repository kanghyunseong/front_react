import styled from "styled-components";

export const DriverLicenseImg = styled.img`
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  width: 500px;
  height: 300px;
  border: 2px dashed;
`;

export const UserDatailBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 */
  gap: 20px 40px; /* 행, 열 간격 */
  margin-top: 20px;
  border: 1px solid #ccc;
  height: 500px;
  padding: 30px;
  border-radius: 15px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
`;

export const Input = styled.input`
  width: 300px;
  height: 25px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #e9e9e9ff;
  font-size: 14px;
  border-radius: 15px;
  &:focus {
    outline: none;
    border-color: #76a79a;
  }
`;

export const ChangePwdButton = styled.button`
  margin: 20px 0px 0px auto; // 위 20px, 오른쪽 0, 아래 20px, 왼쪽 auto
  background: rgba(154, 160, 255, 0.8);
  width: 200px;
  height: 50px;
  border: 0px solid white;
  box-shadow: 0 0 10px rgba(155, 160, 238, 0.8);
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background: rgba(154, 161, 255, 0.49);
  }
`;

export const DeleteUserButton = styled.button`
  margin: 20px 0px 0px auto; // 위 20px, 오른쪽 0, 아래 20px, 왼쪽 auto
  background: rgba(248, 65, 33, 0.8);
  width: 200px;
  height: 50px;
  border: 0px solid white;
  box-shadow: 0 0 10px rgba(241, 36, 36, 1);
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 138, 117, 0.8);
  }
`;

export const UpdateUserButton = styled.button`
  margin: 150px 0px 0px auto; // 위 20px, 오른쪽 0, 아래 20px, 왼쪽 auto
  background: rgba(113, 255, 31, 1);
  width: 200px;
  height: 50px;
  border: 0px solid white;
  box-shadow: 0 0 10px rgba(104, 221, 36, 1);
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background: rgba(134, 233, 121, 1);
  }
`;
