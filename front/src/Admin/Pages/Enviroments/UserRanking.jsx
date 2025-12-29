import React, { useState, useEffect, useContext } from "react";
import {
  FaUserCircle,
  FaAward,
  FaHistory,
  FaPercentage,
  FaHourglassHalf,
} from "react-icons/fa";
import * as S from "./UserRanking.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";

const UserRanking = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      if (!auth?.accessToken) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axiosAuth.getActual("/api/admin/ranking/users");
        setUsers(Array.isArray(response) ? response : []);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [auth]);

  if (loading)
    return <S.StateWrapper>데이터를 분석 중입니다...</S.StateWrapper>;

  return (
    <S.Container>
      <S.TitleArea>
        <h2>사용자 활동 랭킹</h2>
        <S.HeaderStats>
          <div className="stat-item">
            <span className="label">분석 대상</span>
            <span className="value">{users.length}명</span>
          </div>
          <div className="stat-item">
            <span className="label">업데이트</span>
            <span className="value">실시간</span>
          </div>
        </S.HeaderStats>
      </S.TitleArea>

      <S.MainContent>
        {/* 리스트 헤더 */}
        <S.ListHeader>
          <div className="col rank">순위</div>
          <div className="col user">사용자 정보</div>
          <div className="col data">예약 총합</div>
          <div className="col data">누적 시간</div>
          <div className="col rate">반납 신뢰도</div>
        </S.ListHeader>

        {/* 랭킹 리스트 */}
        {users.map((user, idx) => (
          <S.ListRow key={idx} $isTop={idx < 3}>
            <div className="col rank">
              <S.RankNumber $rank={idx + 1}>{idx + 1}</S.RankNumber>
            </div>

            <div className="col user">
              <S.UserAvatar>
                <FaUserCircle />
              </S.UserAvatar>
              <div className="user-meta">
                <span className="name">{user.name}</span>
                {idx === 0 && <span className="top-badge">최우수</span>}
              </div>
            </div>

            <div className="col data">
              <S.DataValue>
                <FaHistory className="icon" />
                {user.reservationCount}회
              </S.DataValue>
            </div>

            <div className="col data">
              <S.DataValue>
                <FaHourglassHalf className="icon" />
                {user.totalUsageHours?.toFixed(1)}h
              </S.DataValue>
            </div>

            <div className="col rate">
              <S.ScoreBox $score={user.onTimeReturnRate}>
                <div className="score-header">
                  <FaPercentage className="icon" />
                  <span>{user.onTimeReturnRate?.toFixed(1)}%</span>
                </div>
                <S.ScoreTrack>
                  <S.ScoreBar $width={user.onTimeReturnRate} />
                </S.ScoreTrack>
              </S.ScoreBox>
            </div>
          </S.ListRow>
        ))}
      </S.MainContent>
    </S.Container>
  );
};

export default UserRanking;
