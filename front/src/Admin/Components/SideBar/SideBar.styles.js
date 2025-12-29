import styled from "styled-components";

export const SideBarContainer = styled.div`
  width: 280px;
  background-color: #ffffff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.03);
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const LogoArea = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 30px;

  h2 {
    font-size: 22px;
    font-weight: 900;
    color: #4f46e5;
    letter-spacing: -0.5px;
  }
`;

export const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f8faff;
  border-radius: 16px;
  margin-bottom: 30px;
  border: 1px solid #edf2ff;

  .user-details {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    overflow: hidden;
  }

  .user-name {
    font-weight: 700;
    font-size: 14px;
    color: #2d3436;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .user-role {
    font-size: 11px;
    font-weight: 600;
    color: #4f46e5;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.2s ease-in-out;

  background-color: ${(props) => (props.$active ? "#4F46E5" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#636e72")};
  font-weight: ${(props) => (props.$active ? "600" : "500")};

  .title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
  }

  svg {
    font-size: 18px;
  }

  &:hover {
    background-color: ${(props) => (props.$active ? "#4F46E5" : "#f1f2f6")};
    color: ${(props) => (props.$active ? "#ffffff" : "#2d3436")};
  }
`;

export const SubMenu = styled.ul`
  list-style: none;
  padding: 4px 0 12px 42px;

  li {
    padding: 8px 12px;
    font-size: 14px;
    color: #888;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s;
    position: relative;

    &:hover {
      color: #4f46e5;
      background-color: #f8faff;
    }

    &::before {
      content: "";
      position: absolute;
      left: -15px;
      top: 50%;
      width: 4px;
      height: 4px;
      background-color: #d1d5db;
      border-radius: 50%;
    }
  }
`;

export const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  margin-top: 20px;
  cursor: pointer;
  color: #ff6b6b;
  background-color: #fff1f1;
  border-radius: 12px;
  transition: all 0.2s;
  font-weight: 700;
  font-size: 14px;
  gap: 8px;

  &:hover {
    background-color: #ff6b6b;
    color: #ffffff;
  }
`;
