import styled from "styled-components";

/**
 * ReviewSection.jsx (리뷰 컴포넌트)에서 사용하는 스타일
 * - 리뷰 작성 영역
 * - 추천/비추천 버튼
 * - 리뷰 내용 입력창
 * - 등록 버튼
 * - 삭제 버튼
 */

// 리뷰 작성 영역 전체 래퍼
export const Review = styled.div`
  width: 80%;
  display: flex;
`;

// 추천/비추천 버튼
export const Recomend = styled.button`
  width: 10%;
  height: 30px;
  font-size: 15px;
  margin-top: 40px;
  margin-right: 20px;
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;

  /* 추천 선택 시 */
  &.active {
    background-color: #1abfb1;
    color: white;
    border: none;
  }

  /* 비추천 선택 시 */
  &.dislike {
    background-color: #992b2b;
    color: white;
    border: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

// 리뷰 내용 입력창
export const Comment = styled.input`
  width: 100%;
  height: 30px;
  font-size: 20px;
  outline: none;
  margin-top: 40px;
  transition: all 0.3s;

  &:focus {
    border-color: #4092cd;
  }

  &::placeholder {
    color: #aaa;
    font-size: 14px;
    font-style: italic;
    flex-direction: column;
  }
`;

// 리뷰 등록 버튼
export const Registration = styled.button`
  width: 10%;
  height: 30px;
  font-size: 15px;
  color: black;
  margin-top: 40px;
  margin-left: 20px;

  &:hover {
    background-color: pink;
    color: white;
    border: none;
  }
`;

// 리뷰 삭제 버튼
export const Elision = styled.button`
  width: 10%;
  height: 30px;
  font-size: 15px;
  color: black;
  margin-top: 30px;
  margin-left: 20px;
`;
