import React from "react";
import {
  ReviewContainer,
  ReviewHeader,
  ReviewList,
  ReviewItem,
  RecommendBadge,
  ReviewContent,
  ReviewForm,
  FormRow,
  VoteButton,
  CommentInput,
  SubmitButton,
  DeleteButton,
} from "./ReviewSection.style";
import { DetailButton } from "../Cars/CarsSearchList.style"; // 기존 버튼 유지 혹은 ReviewHeader 내 버튼으로 대체 가능
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
    if (!stationId) {
      alert("충전소를 먼저 선택해주세요.");
      return;
    }
    axiosAuth
      .create(
        "/api/station/insert",
        {
          stationId: stationId,
          commentContent: comment,
          recommend: isRecomend,
        },
        null
      )
      .then(() => {
        findAll();
        setIsRecomend("");
        setComment("");
      })
      .catch((error) => {
        const msg =
          error.response?.data?.["error-message"] || "오류가 발생했습니다.";
        alert(
          error.response?.status === 400 ? "추천/비추천을 선택해주세요!" : msg
        );
      });
  };

  const elision = (reviewId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axiosAuth
      .deleteReview("/api/station", { data: { reviewId } })
      .then((res) => {
        alert(res.data);
        findAll();
      })
      .catch((error) => alert(error.response.data.message));
  };

  const findAll = () => {
    if (!stationId) return;
    axiosPublic
      .getList(`/api/station/findAll?stationId=${stationId}`)
      .then((res) => setRefresh(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <ReviewContainer>
      <ReviewHeader>
        <h3>이용자 리뷰 ({refresh.length})</h3>
        <DetailButton
          onClick={findAll}
          style={{ margin: 0, padding: "5px 15px" }}
        >
          새로고침
        </DetailButton>
      </ReviewHeader>

      <ReviewList>
        {refresh.length > 0 ? (
          refresh.map((e) => (
            <ReviewItem key={e.reviewId}>
              <RecommendBadge
                type={e.recommend === "Y" || e.recommend === "추천" ? "Y" : "N"}
              >
                {e.recommend === "Y" || e.recommend === "추천"
                  ? "추천"
                  : "비추천"}
              </RecommendBadge>

              <ReviewContent>
                <p className="content">{e.commentContent}</p>
                <p className="date">
                  {e.createdAt}
                  {currentUserNo &&
                    String(e.userNo) === String(currentUserNo) && (
                      <DeleteButton
                        onClick={() => elision(e.reviewId)}
                        style={{ marginLeft: "10px" }}
                      >
                        삭제
                      </DeleteButton>
                    )}
                </p>
              </ReviewContent>
            </ReviewItem>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#adb5bd",
              padding: "40px 0",
              fontSize: "14px",
            }}
          >
            등록된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </div>
        )}
      </ReviewList>

      {/* 리뷰 작성 폼 */}
      <ReviewForm>
        <FormRow>
          <VoteButton
            className={isRecomend === "Y" ? "active-up" : ""}
            onClick={() => setIsRecomend("Y")}
          >
            👍 추천해요
          </VoteButton>
          <VoteButton
            className={isRecomend === "N" ? "active-down" : ""}
            onClick={() => setIsRecomend("N")}
          >
            👎 아쉬워요
          </VoteButton>
        </FormRow>
        <FormRow>
          <CommentInput
            value={comment}
            placeholder={
              auth
                ? "리뷰 내용을 입력하세요 (최대 80자)"
                : "로그인 후 이용 가능합니다."
            }
            maxLength={80}
            disabled={!auth}
            onChange={(e) => setComment(e.target.value)}
          />
          <SubmitButton onClick={register} disabled={!auth || !comment.trim()}>
            등록
          </SubmitButton>
        </FormRow>
      </ReviewForm>
    </ReviewContainer>
  );
};

export default ReviewSection;
