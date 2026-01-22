import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  PageTitle,
  HistoryCard,
  Section,
  SectionTitle,
  RecordList,
  RecordItem,
  RecordInfo,
  RecordDate,
  RecordDetail,
  RecordStatus,
  LoadMoreButton,
} from "../Cars/CarsUsageHistory.style";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { axiosAuth } from "../../api/reqService";

const CarsUsageHistory = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservation, setReservation] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosAuth.getList("/api/reserve/history")
      .then((result) => {
        console.log(result.data);
        setReservation(result.data);
      })
      .catch((err) => {
        console.error("에러:", err);
        if (err.response?.status === 401) {
          alert("로그인이 만료되었습니다.");
          navigate("/members/login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [auth?.accessToken, navigate]);

  // 표시할 데이터
  const visibleRecords = reservation.slice(0, visibleCount);
  const hasMore = visibleCount < reservation.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // 상태 표시 텍스트 변환
  const getStatusText = (reservationStatus, returnStatus) => {
    if (returnStatus === "Y") return "반납완료";
    if (reservationStatus === "Y") return "이용중";
    if (reservationStatus === "N") return "예약취소";
    return "알 수 없음";
  };

  // 상태별 스타일 반환
  const getStatusStyle = (reservationStatus, returnStatus) => {
    if (returnStatus === "Y") {
      // 반납완료 - 초록색
      return {
        color: "#27ae60",
        backgroundColor: "#d4edda",
        padding: "6px 12px",
        borderRadius: "8px",
        fontWeight: "600",
      };
    }
    if (reservationStatus === "Y") {
      // 이용중 - 파란색
      return {
        color: "#3498db",
        backgroundColor: "#d1ecf1",
        padding: "6px 12px",
        borderRadius: "8px",
        fontWeight: "600",
      };
    }
    if (reservationStatus === "N") {
      // 예약취소 - 빨간색
      return {
        color: "#e74c3c",
        backgroundColor: "#f8d7da",
        padding: "6px 12px",
        borderRadius: "8px",
        fontWeight: "600",
      };
    }
    // 기본
    return {
      color: "#1f1f13",
      backgroundColor: "#e9ecef",
      padding: "6px 12px",
      borderRadius: "8px",
      fontWeight: "600",
    };
  };

  // 로딩중
  if (loading) {
    return (
      <>
        <SideBar />
        <MainContainer>
          <PageTitle>차량 이용 기록 내역</PageTitle>
          <div style={{ textAlign: "center", padding: "50px" }}>로딩중...</div>
        </MainContainer>
      </>
    );
  }

  return (
    <>
      <SideBar />
      <MainContainer>
        <PageTitle>차량 이용 기록 내역</PageTitle>

        <HistoryCard>
          <Section>
            <SectionTitle>지난 이용 목록 ({reservation.length}건)</SectionTitle>

            {reservation.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: "50px", color: "#666" }}
              >
                이용 기록이 없습니다.
              </div>
            ) : (
              <>
                <RecordList>
                  {visibleRecords.map((record) => (
                    <RecordItem key={record.reservation.reservationNo}>
                      <RecordInfo>
                        <RecordDate>
                          {record.reservation.startTime} ~{" "}
                          {record.reservation.endTime}
                        </RecordDate>
                        <RecordDetail>
                          차량: {record.car.carName} ({record.car.carSize}) ·
                          목적지: {record.reservation.destination}
                        </RecordDetail>
                        <RecordDetail
                          style={{ fontSize: "0.9em", color: "#888" }}
                        >
                          주행거리: {record.car.carDriving}km · 배터리:{" "}
                          {record.car.battery}kWh · 효율:{" "}
                          {record.car.carEfficiency}km/kWh
                        </RecordDetail>
                      </RecordInfo>
                      <RecordStatus
                        style={getStatusStyle(
                          record.reservation.reservationStatus,
                          record.reservation.returnStatus
                        )}
                      >
                        {getStatusText(
                          record.reservation.reservationStatus,
                          record.reservation.returnStatus
                        )}
                      </RecordStatus>
                    </RecordItem>
                  ))}
                </RecordList>

                {hasMore && (
                  <LoadMoreButton onClick={handleLoadMore}>
                    더보기 ({visibleCount} / {reservation.length})
                  </LoadMoreButton>
                )}
              </>
            )}
          </Section>
        </HistoryCard>
      </MainContainer>
    </>
  );
};

export default CarsUsageHistory;
