import {
  SearchWrapper,
  SearchInput,
  SearchButton,
  SearchResult,
} from "./SearchSection.style";

const SearchSection = ({
  searchStation,
  searchResult,
  setSearchStation,
  handleSearch,
  handleResultClick,
}) => {
  return (
    <>
      <SearchWrapper>
        <SearchInput
          placeholder="궁금하신 내용을 입력하세요."
          maxLength={50}
          onChange={(e) => setSearchStation(e.target.value)}
          value={searchStation}
        />
        <SearchButton onClick={handleSearch}>🔍</SearchButton>
      </SearchWrapper>

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
