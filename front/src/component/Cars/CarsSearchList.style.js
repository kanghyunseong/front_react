import styled from "styled-components";

export const MainContainer = styled.div`
  width: 1062px;
  margin: 20px auto;
  background: #F5F7FB;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (max-width: 1400px) {
    margin-left: auto;
    margin-right: auto;
    width: 95%;
  }
`;

export const TopSection = styled.div`
  display: flex;
  gap: 20px;
  height: 485px;
`;

export const ProfileCard = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileImageArea = styled.div`
  width: 400px;
  height: 250px;
  background: #e8ecef;
  border-radius: 12px;
`;

export const ProfileSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  line-height: 1.5;
`;

export const StatsCard = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  background: white;
  border-radius: 16px;
  padding: 30px;
  justify-content: center;
  gap: 30px;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const StatLabel = styled.span`
  font-size: 16px;
  color: #666666ff;
`;

export const StatValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const BottomSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  min-height: 1089px;
`;

export const SectionTitle = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const CarCard = styled.div`
  background: white;
  border: 1px solid #e8ecef;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CarImageArea = styled.div`
  width: 100%;
  height: 180px;
  background: #e8ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #999;
`;

export const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CarName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const CarDetail = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const CarBattery = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BatteryLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

export const BatteryValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #4092cd;
`;

export const DetailButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #4092cd;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #357ab8;
  }
`;
export const LoadMoreButton = styled.button`
  width: 150px;
  padding: 12px 0;
  background: #4092cd;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 auto; 
  display: block;
  transition: background 0.2s;

  &:hover {
    background: #357ab8;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;