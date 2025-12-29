import {
  SearchWrapper,
  SearchInput,
  SearchButton,
  SearchResult,
} from "./SearchSection.style";

/**
 * SearchSection - 검색 컴포넌트 (왼쪽 영역)
 *
 * Props:
 * - searchStation: 검색 입력값 (string)
 * - searchResult: 검색 결과 배열 (array)
 * - setSearchStation: 검색 입력값 업데이트 함수
 * - handleSearch: 검색 버튼 클릭 핸들러
 * - handleResultClick: 검색 결과 항목 클릭 핸들러
 */
const SearchSection = ({
  searchStation, // Props: 검색 입력값
  searchResult, // Props: 검색 결과 배열
  setSearchStation, // Props: 검색 입력값 업데이트 함수
  handleSearch, // Props: 검색 실행 함수
  handleResultClick, // Props: 검색 결과 클릭 함수
}) => {
  return (
    <>
      {/* 검색 입력 영역 */}
      <SearchWrapper>
        <SearchInput
          placeholder="궁금하신 내용을 입력하세요."
          maxLength={50}
          onChange={(e) => setSearchStation(e.target.value)}
          value={searchStation}
        />
        <SearchButton onClick={handleSearch}>🔍</SearchButton>
      </SearchWrapper>

      {/* 검색 결과 목록 */}
      <SearchResult id="searchResult">
        <ol style={{ paddingLeft: 0 }}>
          {searchResult &&
            searchResult.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleResultClick(item.stationId)}
                  style={{
                    cursor: "pointer",
                    marginBottom: "8px",
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    listStyle: "none",
                  }}
                >
                  <strong>{item.stationName}</strong>
                  <div style={{ fontSize: "0.9rem", color: "#555" }}>
                    {item.address}
                  </div>
                </li>
              );
            })}
        </ol>
      </SearchResult>
    </>
  );
};

export default SearchSection;
