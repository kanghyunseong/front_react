import styled from "styled-components";

export const SideBarContainer = styled.div`
  width: 250px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
`;

export const LogoArea = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  color: #82ca9d; /* 로고 색상 예시 */
`;

export const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 10px;

  background-color: ${(props) => (props.$active ? "#E0E7FF" : "transparent")};
  color: ${(props) => (props.$active ? "#4F46E5" : "#555")};

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SubMenu = styled.ul`
  list-style: none;
  padding-left: 40px;
  margin-bottom: 10px;

  li {
    padding: 8px 0;
    color: #777;
    cursor: pointer;
    &:hover {
      color: #4f46e5;
    }
  }
`;
export const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #555;
  border-radius: 5px;
  margin: 10px 15px 20px 15px;
  color: white;

  .user-details {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .user-name {
    font-weight: bold;
    font-size: 14px;
  }

  .user-role {
    font-size: 12px;
    color: #ccc;
  }
`;

export const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin-top: auto;
  cursor: pointer;
  color: #fff;
  background-color: #e64c6b;
  border-top: 1px solid #777;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cc405b;
  }

  span {
    margin-left: 10px;
    font-weight: bold;
  }
`;
