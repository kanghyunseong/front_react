// Footer.styles.js
import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: linear-gradient(180deg, #f5f7fb, #4092cd, #1f1f13);
  padding: 50px 40px 30px;
  color: white;
  position: relative;
`;

export const FooterContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const BrandSection = styled.div`
  flex: 1;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CarIcon = styled.div`
  width: 220px;
  height: 140px;
`;

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BrandName = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
`;

export const Description = styled.p`
  font-size: 17px;
  line-height: 1.8;
  margin: 0;
  opacity: 0.95;
`;

export const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 15px;
  opacity: 0.85;
`;
