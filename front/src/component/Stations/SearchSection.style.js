import styled from "styled-components";

/**
 * SearchSection.jsx (검색 컴포넌트)에서 사용하는 스타일
 * - 검색 입력창
 * - 검색 버튼
 * - 검색 결과 목록
 */

// 검색 입력 영역 래퍼
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// 검색 입력창
export const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #4092cd;
  }

  &::placeholder {
    color: #aaa;
    font-size: 14px;
    font-style: italic;
  }
`;

// 검색 버튼 (돋보기 아이콘)
export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 검색 결과 목록 영역
export const SearchResult = styled.div`
  height: 800px;
  background-repeat: no-repeat;
  background-image: url("src/assets/logo.png");
  background-position: center;
  overflow: scroll;
`;
