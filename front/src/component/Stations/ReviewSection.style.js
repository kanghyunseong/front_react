import styled from "styled-components";

// 전체 컨테이너 (Station.style.js의 ReviewWrapper 내부에서 사용)
export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
`;

// 리뷰 헤더 (조회 버튼 등)
export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #f1f3f5;
  padding-bottom: 10px;

  h3 {
    font-size: 16px;
    color: #333;
    margin: 0;
  }
`;

// 리뷰 리스트 영역
export const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

// 리뷰 개별 아이템
export const ReviewItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #f8f9fa;
  transition: background 0.2s;

  &:hover {
    background-color: #fcfcfc;
  }
`;

// 추천 배지
export const RecommendBadge = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.type === "Y" ? "#20c997" : "#ff6b6b")};
  white-space: nowrap;
`;

// 리뷰 텍스트 및 날짜
export const ReviewContent = styled.div`
  flex: 1;
  .content {
    font-size: 14px;
    color: #495057;
    margin-bottom: 5px;
    line-height: 1.4;
  }
  .date {
    font-size: 12px;
    color: #adb5bd;
  }
`;

// 리뷰 작성 폼 영역
export const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
  margin-top: 15px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// 추천/비추천 토글 버튼
export const VoteButton = styled.button`
  flex: 1;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &.active-up {
    background: #e6fcf5;
    border-color: #20c997;
    color: #087f5b;
  }
  &.active-down {
    background: #fff5f5;
    border-color: #ff6b6b;
    color: #c92a2a;
  }
`;

// 입력창
export const CommentInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #4dabf7;
  }
`;

// 등록 버튼
export const SubmitButton = styled.button`
  padding: 0 20px;
  height: 40px;
  background: #4dabf7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #339af0;
  }

  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
  }
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #fa5252;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: #c92a2a;
  }
`;
