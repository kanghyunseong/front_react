import styled from "styled-components";

export const StyledSidebar = styled.aside`
  width: 16rem;
  background-color: rgb(217, 217, 217);
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
  position: fixed;
  margin: 20px;
  margin-left: 20px;
  z-index: 999;
`;

export const StyledSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  flex-direction: column;
`;

export const StyledSideHeaderButton = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: none;
  border: none;
  background-color: #f3f4f6;
`;

export const StyledSidebarLogoBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgb(22, 163, 74);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export const StyledSidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
`;

export const StyledSidebarButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #f3f4f6;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f3f4f6;
  }
`;
