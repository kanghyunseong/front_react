import React from "react";
import UserChar from "./UserChar";
import SmallBarChart from "./SmallBarChart";
import CarbonChart from "./CarbonChart";
import * as S from "./DashBoard.styles";

const DashBoard = () => {
  return (
    <S.DashboardContainer>
      <S.SectionTitle>Dashboard</S.SectionTitle>

      {/* 상단 Row */}
      <S.ChartRow>
        <S.MainCardWrapper>
          <h3>Active Main Dashboard</h3>
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            {/* 보라색 차트 + 텍스트 위젯 */}
            <UserChar />
          </div>
        </S.MainCardWrapper>

        {/* 우측 Inflow 차트 */}
        <SmallBarChart title="Inflow" color="#8b5cf6" />
      </S.ChartRow>

      {/* 하단 Row */}
      <S.ChartRow>
        {/* 꺾은선 차트 */}
        <CarbonChart />

        {/* 우측 Cars Inflow 차트 */}
        <SmallBarChart title="Cars Inflow" color="#8b5cf6" />
      </S.ChartRow>
    </S.DashboardContainer>
  );
};

export default DashBoard;
