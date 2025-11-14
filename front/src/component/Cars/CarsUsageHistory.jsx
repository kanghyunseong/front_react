// CarsUsageHistory.jsx
import { useState } from "react";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  PageTitle,
  HistoryCard,
  Section,
  SectionTitle,
  StatsGrid,
  StatItem,
  StatLabel,
  StatValue,
  DateInfo,
  DateLabel,
  RecordList,
  RecordItem,
  RecordInfo,
  RecordDate,
  RecordDetail,
  RecordStatus,
  LoadMoreButton,
} from "../Cars/CarsUsageHistory.style";

const CarsUsageHistory = () => {
  const [visibleCount, setVisibleCount] = useState(5); // 처음에 5개만 보여줌

  const usageStats = {
    totalDistance: "1,240 km",
    tripCount: "8 회",
    co2Reduction: "76 kg",
    period: "2025-10-01 ~ 2025-11-10",
    lastUsed: "2025-11-08",
  };


  const allRecords = [
    { id: 1, date: "2025-11-08", car: "EV-X 2024", distance: "120km", co2: "7.4kg", status: "완료" },
    { id: 2, date: "2025-11-08", car: "EV-X 2024", distance: "120km", status: "예약취소", cancelled: true },
    { id: 3, date: "2025-11-05", car: "EV-X 2024", distance: "95km", co2: "5.8kg", status: "완료" },
    { id: 4, date: "2025-11-03", car: "EV-X 2024", distance: "150km", co2: "9.2kg", status: "완료" },
    { id: 5, date: "2025-11-01", car: "EV-X 2024", distance: "180km", co2: "11.0kg", status: "완료" },
    { id: 6, date: "2025-10-28", car: "EV-X 2024", distance: "210km", co2: "12.9kg", status: "완료" },
    { id: 7, date: "2025-10-25", car: "EV-X 2024", distance: "140km", co2: "8.6kg", status: "완료" },
    { id: 8, date: "2025-10-20", car: "EV-X 2024", distance: "165km", co2: "10.1kg", status: "완료" },
    { id: 9, date: "2025-10-15", car: "EV-X 2024", distance: "90km", co2: "5.5kg", status: "완료" },
    { id: 10, date: "2025-10-10", car: "EV-X 2024", distance: "110km", co2: "6.7kg", status: "완료" },
  ];


  const visibleRecords = allRecords.slice(0, visibleCount);
  const hasMore = visibleCount < allRecords.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); 
  };

  return (
    <>
      <SideBar />
      <MainContainer>
        <PageTitle>차량 이용 기록 내역</PageTitle>

        <HistoryCard>
          <Section>
            <SectionTitle>차량 이용 기록</SectionTitle>
            
            <StatsGrid>
              <StatItem>
                <StatLabel>총 주행거리</StatLabel>
                <StatValue>{usageStats.totalDistance}</StatValue>
              </StatItem>
              
              <StatItem>
                <StatLabel>이용 횟수</StatLabel>
                <StatValue>{usageStats.tripCount}</StatValue>
              </StatItem>
              
              <StatItem>
                <StatLabel>절감된 이산화탄소</StatLabel>
                <StatValue>{usageStats.co2Reduction}</StatValue>
              </StatItem>
            </StatsGrid>

            <StatsGrid>
              <DateInfo>
                <DateLabel>기간 : {usageStats.period}</DateLabel>
              </DateInfo>
              
              <DateInfo>
                <DateLabel>최근 이용: {usageStats.lastUsed}</DateLabel>
              </DateInfo>
              
              <DateInfo>
                <DateLabel>신뢰 점수 기준</DateLabel>
              </DateInfo>
            </StatsGrid>
          </Section>

          <Section>
            <SectionTitle>지난 이용 목록</SectionTitle>
            
            <RecordList>
              {visibleRecords.map((record) => (
                <RecordItem key={record.id}>
                  <RecordInfo>
                    <RecordDate>{record.date} - {record.car}</RecordDate>
                    <RecordDetail>
                      {record.distance}
                      {record.co2 && ` · 절감 CO₂: ${record.co2}`}
                    </RecordDetail>
                  </RecordInfo>
                  <RecordStatus $cancelled={record.cancelled}>
                    {record.status}
                  </RecordStatus>
                </RecordItem>
              ))}
            </RecordList>

            {hasMore && (
              <LoadMoreButton onClick={handleLoadMore}>
                더보기 ({visibleCount} / {allRecords.length})
              </LoadMoreButton>
            )}
          </Section>
        </HistoryCard>
      </MainContainer>
    </>
  );
};

export default CarsUsageHistory;