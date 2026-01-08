import {
  Review,
  Recomend,
  Comment,
  Registration,
  Elision,
} from "./ReviewSection.style";
import { DetailButton } from "../Cars/CarsSearchList.style";
import { axiosAuth, axiosPublic } from "../../api/reqService";

const ReviewSection = ({
  stationId,
  refresh,
  comment,
  isRecomend,
  auth,
  setRefresh,
  setComment,
  setIsRecomend,
}) => {
  const currentUserNo = auth?.userNo;
  const register = () => {
    axiosAuth
      .createJson("/api/station/insert", {
        stationId: stationId,
        commentContent: comment,
        recommend: isRecomend,
      })
      .then((res) => {
        res.data;
        findAll();
        setComment("");
        setIsRecomend(null);
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

  const elision = (reviewId) => {
    axiosAuth
      .deleteReview("/api/station", { data: { reviewId } })
      .then((res) => {
        if (res.status === 204) alert("삭제성공");
        findAll();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const findAll = () => {
    axiosPublic
      .getList(`/api/station/findAll?stationId=${stationId}`)
      .then((res) => {
        setRefresh(res.data);
      })
      .catch((err) => {
        setRefresh([]);
        alert(err.response.data.message);
      });
  };

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
