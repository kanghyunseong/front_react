import styled from "styled-components";

// 검색 영역 전체 컨테이너
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 부모인 LeftSection에서 패딩을 주므로 여기서는 최소화 */
`;

// 검색 입력 영역 래퍼
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

// 세련된 검색 입력창
export const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 0 45px 0 15px;
  color: #333;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    border-color: #4dabf7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

// 검색 버튼
export const SearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #4dabf7;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(77, 171, 247, 0.1);
  }
`;

// 검색 결과 목록 영역
export const SearchResult = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 0 -5px; /* 스크롤바 공간 확보 */
  padding-right: 5px;

  /* 스크롤바 디자인 */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dee2e6;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

// 리스트 아이템 디자인
export const ResultList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ResultItem = styled.li`
  padding: 15px;
  margin-bottom: 10px;
  background: #fff;
  border: 1px solid #f1f3f5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    border-color: #4dabf7;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  strong {
    display: block;
    color: #212529;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  span {
    display: block;
    font-size: 12px;
    color: #868e96;
    line-height: 1.5;
    word-break: keep-all;
  }
`;
