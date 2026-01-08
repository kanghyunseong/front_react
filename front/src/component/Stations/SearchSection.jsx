import React from "react";
import {
  SearchContainer,
  SearchWrapper,
  SearchInput,
  SearchButton,
  SearchResult,
  ResultList,
  ResultItem,
} from "./SearchSection.style";

const SearchSection = ({
  searchStation,
  searchResult,
  setSearchStation,
  handleSearch,
  handleResultClick,
}) => {
  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      {/* 상단 제목 (추가하면 디자인이 더 전문적으로 보입니다) */}
      <h2 style={{ fontSize: "18px", marginBottom: "15px", color: "#333" }}>
        충전소 검색
      </h2>

      {/* 상단 검색 바 */}
      <SearchWrapper>
        <SearchInput
          placeholder="충전소 이름 또는 주소 입력"
          maxLength={50}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchStation(e.target.value)}
          value={searchStation}
        />
        <SearchButton onClick={handleSearch} title="Search">
          🔍
        </SearchButton>
      </SearchWrapper>

      {/* 검색 결과 리스트 */}
      <SearchResult id="searchResult">
        <ResultList>
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((item, index) => (
              <ResultItem
                key={item.stationId || index}
                onClick={() => handleResultClick(item.stationId)}
              >
                <strong>{item.stationName}</strong>
                <span>{item.address}</span>
              </ResultItem>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                color: "#adb5bd",
                fontSize: "13px",
              }}
            >
              {searchStation ? (
                <div>
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                    ⚠️
                  </div>
                  검색 결과가 없습니다.
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                    ⚡
                  </div>
                  목적지를 입력해보세요.
                </div>
              )}
            </div>
          )}
        </ResultList>
      </SearchResult>
    </SearchContainer>
  );
};

export default SearchSection;
