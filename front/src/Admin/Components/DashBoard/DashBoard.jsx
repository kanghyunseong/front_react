import React from "react";
import UserChart from "./UserChart";

import * as S from "./DashBoard.styles";
import CarsStatsBarChart from "./CarsStatsBarChart";
import UserStatsBarChart from "./UserStatsBarChart";

const DashBoard = () => {
  return (
    <S.DashboardContainer>
      <S.SectionTitle>Dashboard</S.SectionTitle>

      <S.ChartRow>
        <S.MainCardWrapper>
          <h3>Active Main Dashboard</h3>
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <UserChart />
          </div>
        </S.MainCardWrapper>

        <UserStatsBarChart title="Inflow" color="#8b5cf6" dataType="inflow" />
      </S.ChartRow>

      <S.ChartRow>
        <CarsStatsBarChart
          title="Cars Inflow"
          color="#8b5cf6"
          dataType="cars"
        />
      </S.ChartRow>
    </S.DashboardContainer>
  );
};

export default DashBoard;
