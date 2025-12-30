import React, { useState, useEffect, useContext } from "react";
import {
  FaUserCircle,
  FaHistory,
  FaHourglassHalf,
  FaTrophy,
  FaMedal,
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
        const response = await axiosAuth.getActual(`/api/admin/ranking/users`);

        const data = Array.isArray(response) ? response : response?.data || [];

        console.log("📊 API Response Data:", data);

        setUsers(data);
      } catch (err) {
        console.error("❌ Ranking fetch error:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [auth]);

  if (loading) {
    return (
      <S.StateWrapper>
        <div className="loader" />
        <p>랭킹 데이터를 분석하고 있습니다...</p>
      </S.StateWrapper>
    );
  }

  const rawTopThree = users.slice(0, 3);
  const displayTopThree =
    rawTopThree.length === 3
      ? [rawTopThree[1], rawTopThree[0], rawTopThree[2]]
      : rawTopThree;

  return (
    <S.Container>
      <S.TitleArea>
        <h2>사용자 활동 랭킹</h2>
        <p>전체 사용자의 예약 및 활동 데이터를 기반으로 산정되었습니다.</p>
      </S.TitleArea>

      {users.length > 0 && (
        <S.TopCardsSection>
          {displayTopThree.map((user, idx) => {
            const actualRank =
              users.findIndex((u) => u.userId === user.userId) + 1;
            return (
              <S.RankingCard key={user.userId || idx} $rank={actualRank}>
                <div className="rank-badge">
                  {actualRank === 1 && <FaTrophy color="#fbbf24" />}
                  {actualRank === 2 && <FaMedal color="#94a3b8" />}
                  {actualRank === 3 && <FaMedal color="#92400e" />}
                </div>
                <S.UserAvatar $isTop={actualRank === 1}>
                  <FaUserCircle />
                </S.UserAvatar>
                <div className="user-info">
                  <div className="name">{user.name}</div>
                  <div className="count">{user.reservationCount}회 이용</div>
                </div>
              </S.RankingCard>
            );
          })}
        </S.TopCardsSection>
      )}

      <S.MainContent>
        <S.ListHeader>
          <div className="col rank">순위</div>
          <div className="col user">사용자 정보</div>
          <div className="col data">예약 총합</div>
          <div className="col data">누적 시간</div>
          <div className="col rate">반납 신뢰도</div>
        </S.ListHeader>

        {users.length === 0 ? (
          <S.StateWrapper>조회된 데이터가 없습니다.</S.StateWrapper>
        ) : (
          users.map((user, idx) => {
            console.log(`👤 ${user.name} 신뢰도 값:`, {
              value: user.onTimeReturnRate,
              type: typeof user.onTimeReturnRate,
            });

            return (
              <S.ListRow key={user.userId || idx}>
                <div className="col rank">
                  <S.RankNumber $rank={idx + 1}>{idx + 1}</S.RankNumber>
                </div>

                <div className="col user">
                  <S.SmallAvatar>
                    <FaUserCircle />
                  </S.SmallAvatar>
                  <S.UserMeta>
                    <span className="name">{user.name}</span>
                    <span className="label">ID: {user.userId || "N/A"}</span>
                  </S.UserMeta>
                </div>

                <div className="col data">
                  <FaHistory className="icon" />
                  {user.reservationCount?.toLocaleString()}회
                </div>

                <div className="col data">
                  <FaHourglassHalf className="icon" />
                  {user.totalUsageHours?.toFixed(1)}h
                </div>

                <div className="col rate">
                  <S.ScoreBox>
                    <div className="score-text">
                      {(user.onTimeReturnRate || 0).toFixed(1)}%
                    </div>
                    <S.ScoreTrack>
                      <S.ScoreBar $width={user.onTimeReturnRate || 0} />
                    </S.ScoreTrack>
                  </S.ScoreBox>
                </div>
              </S.ListRow>
            );
          })
        )}
      </S.MainContent>
    </S.Container>
  );
};

export default UserRanking;
