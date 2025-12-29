import {
  Review,
  Recomend,
  Comment,
  Registration,
  Elision,
} from "./ReviewSection.style";
import { DetailButton } from "../Cars/CarsSearchList.style";
import axios from "axios";

/**
 * ReviewSection - 리뷰 컴포넌트 (오른쪽 하단)
 *
 * Props:
 * - stationId: 선택된 충전소 ID (number)
 * - refresh: 리뷰 목록 배열 (array)
 * - comment: 리뷰 입력값 (string)
 * - isRecomend: 추천/비추천 선택값 ("Y" or "N")
 * - auth: 인증 정보 객체 {accessToken, userNo}
 * - setRefresh: 리뷰 목록 업데이트 함수
 * - setComment: 리뷰 입력값 업데이트 함수
 * - setIsRecomend: 추천/비추천 업데이트 함수
 */
const ReviewSection = ({
  stationId, // Props: 선택된 충전소 ID
  refresh, // Props: 리뷰 목록 배열
  comment, // Props: 리뷰 입력값
  isRecomend, // Props: 추천/비추천 선택값
  auth, // Props: 인증 정보
  setRefresh, // Props: 리뷰 목록 업데이트 함수
  setComment, // Props: 리뷰 입력값 업데이트 함수
  setIsRecomend, // Props: 추천/비추천 업데이트 함수
}) => {
  // ===========================
  // Local State
  // ===========================
  const currentUserNo = auth?.userNo; // Local: 현재 로그인한 사용자 번호

  // ===========================
  // 리뷰 등록 함수
  // ===========================
  const register = () => {
    axios
      .post(
        "http://localhost:8081/station/insert",
        {
          stationId: stationId,
          commentContent: comment,
          recommend: isRecomend,
        },
        { headers: { Authorization: `Bearer ${auth?.accessToken}` } }
      )
      .then((response) => {
        const result = response.data;
        console.log(result);
        findAll();
        setIsRecomend(null);
        setComment("");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            alert("추천,비추천 먼저 선텍해주세요!");
          } else if (
            error.response.data &&
            error.response.data["error-message"]
          ) {
            alert(error.response.data["error-message"]);
          } else {
            alert("오류가 발생했습니다.");
          }
        } else if (error.request) {
          alert("서버가 응답하지 않습니다.");
        } else {
          alert("오류: " + error.message);
        }
      });
  };

  // ===========================
  // 리뷰 삭제 함수
  // ===========================
  const elision = (reviewIdParam) => {
    axios
      .delete("http://localhost:8081/station", {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
        data: { reviewId: reviewIdParam },
      })
      .then((response) => {
        alert(response.data);
        findAll();
      })
      .catch((error) => {
        const msg =
          error?.response?.data?.["error-message"] ||
          "삭제 중 오류가 발생했습니다.";
        alert(msg);
      });
  };

  // ===========================
  // 리뷰 전체 조회 함수
  // ===========================
  const findAll = () => {
    axios
      .get(`http://localhost:8081/station/findAll`, {
        params: { stationId: stationId },
      })
      .then((response) => {
        setRefresh(response.data || []);
      })
      .catch((err) => {
        console.error("리뷰 조회 실패:", err);
      });
  };

  // ===========================
  // 렌더링
  // ===========================
  return (
    <>
      {/* 리뷰 조회 버튼 */}
      <DetailButton onClick={findAll} style={{ marginTop: "5%", width: "10%" }}>
        조회하기
      </DetailButton>

      {/* 리뷰 목록 */}
      {refresh.map((e) => (
        <li
          key={e.reviewId}
          style={{
            display: "flex",
            gap: "20px",
            listStylePosition: "inside",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          {/* 추천/비추천 표시 */}
          <div style={{ flex: "0.5", textAlign: "center" }}>
            <p
              style={{
                background:
                  e.recommend === "추천" || e.recommend === "Y"
                    ? "#1abfb1"
                    : "#992b2b",
                color: "#fff",
                padding: "6px 8px",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              {e.recommend === "Y"
                ? "추천"
                : e.recommend === "N"
                ? "비추천"
                : e.recommend}
            </p>
          </div>

          {/* 리뷰 내용 */}
          <div style={{ flex: "4" }}>
            <p> {e.commentContent}</p>
          </div>

          {/* 작성일 */}
          <div style={{ flex: "4" }}>
            <p> 작성일:{e.createdAt}</p>
          </div>

          {/* 삭제 버튼 (본인 리뷰만) */}
          <div style={{ flex: "3" }}>
            {currentUserNo && String(e.userNo) === String(currentUserNo) ? (
              <Elision
                onClick={() => elision(e.reviewId)}
                style={{ marginTop: "0px" }}
              >
                삭제
              </Elision>
            ) : null}
          </div>
        </li>
      ))}

      {/* 리뷰 작성 영역 */}
      <Review
        style={{
          marginTop: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* 추천 버튼 */}
        <Recomend
          onClick={() => setIsRecomend("Y")}
          className={isRecomend === "Y" ? "active" : ""}
          style={{ cursor: "pointer" }}
        >
          추천
        </Recomend>

        {/* 비추천 버튼 */}
        <Recomend
          onClick={() => setIsRecomend("N")}
          className={isRecomend === "N" ? "dislike" : ""}
          style={{ cursor: "pointer" }}
        >
          비추천
        </Recomend>

        {/* 리뷰 입력 */}
        <Comment
          value={comment}
          placeholder="    남기고 싶은 리뷰를 입력하세요."
          maxLength={80}
          onChange={(e) => setComment(e.target.value)}
          style={{ flex: 1 }}
        />

        {/* 등록 버튼 */}
        <Registration onClick={register} style={{ marginLeft: "8px" }}>
          등록
        </Registration>
      </Review>
    </>
  );
};

export default ReviewSection;
