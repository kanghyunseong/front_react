import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/reqService.js";
import {
  Container,
  Header,
  Pagination,
  SelectBox,
  Tab,
  Table,
  TabMenu,
  Td,
  Th,
  Thead,
  TitleTd,
  Tr,
} from "./Notice.styles";
import gasipan from "../../../assets/gasipan.png";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(10);

  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부

  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  // 공지사항 목록(전체 조회 or 검색 결과) 로딩
  const loadNotices = () => {
    const baseUrl = "/api/notices";

    // 검색 모드일 때는 /search 호출, 아니면 전체 조회
    const url = isSearchMode ? `${baseUrl}/search` : baseUrl;

    const query = new URLSearchParams(
      isSearchMode
        ? { type: searchType, keyword: keyword.trim(), page }
        : { page }
    ).toString();

    axiosPublic
      .getActual(`${url}?${query}`)
      .then((data) => {
        setNotices(data.content || []);
        setTotalPages(data.totalPages || 1);
        setTotalElements(data.totalElements || 0);
        setSize(data.size || 10);
      })
      .catch((err) => {
        console.error("공지사항 페이지 로딩 실패:", err);
        // 401/500 등 기본 에러 알림은 인터셉터에서 처리
        alert("공지사항 목록을 불러올 수 없습니다.");
      });
  };

  // 페이지 / 검색 모드 변경 시 목록 다시 로딩
  useEffect(() => {
    loadNotices();
  }, [page, isSearchMode]); // keyword, searchType 은 검색 버튼 눌렀을 때만 반영

  // 상세보기
  const handleView = (id) => {
    navi(`/notices/${id}`);
  };

  // 검색 기능
  const handleSearch = () => {
    if (!keyword.trim()) {
      alert("검색어를 입력하세요!");
      return;
    }
    setPage(0); // 검색 시 첫 페이지로
    setIsSearchMode(true);
  };

  // 검색 초기화 (전체 목록 보기)
  const handleResetSearch = () => {
    setKeyword("");
    setIsSearchMode(false);
    setPage(0);
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">공지사항</div>
      </Header>

      {/* 탭 메뉴 */}
      <TabMenu>
        <Tab $active onClick={() => navi("/notices")}>
          공지사항
        </Tab>
        <Tab onClick={() => navi("/boards")}>일반</Tab>
        <Tab onClick={() => navi("/imgBoards")}>갤러리</Tab>
      </TabMenu>

      {/* 테이블 */}
      <Table>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>작성일</Th>
            <Th>조회</Th>
          </Tr>
        </Thead>

        <tbody>
          {Array.isArray(notices) && notices.length > 0 ? (
            notices.map((notice, index) => {
              const rowNumber = totalElements - page * size - index;
              return (
                <Tr key={notice.noticeNo}>
                  <Td>{rowNumber}</Td>

                  <TitleTd
                    style={{ cursor: "pointer" }}
                    onClick={() => handleView(notice.noticeNo)}
                  >
                    {notice.noticeTitle}
                  </TitleTd>

                  <Td>{notice.noticeWriter}</Td>
                  <Td>{notice.noticeDate}</Td>
                  <Td>{notice.noticeCount}</Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={5}>등록된 공지사항이 없습니다.</Td>
            </Tr>
          )}
        </tbody>
      </Table>

      {/* 페이지네이션 (1 ~ totalPages) */}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            style={{
              padding: "6px 10px",
              margin: "0 4px",
              background: page === i ? "black" : "lightgray",
              color: page === i ? "white" : "black",
              borderRadius: "4px",
            }}
          >
            {i + 1}
          </button>
        ))}
      </Pagination>

      {/* 검색 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 20,
          gap: "10px",
        }}
      >
        <SelectBox
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="content">내용</option>
        </SelectBox>

        <input
          type="text"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            height: "40px",
            padding: "0 10px",
            fontSize: "14px",
            border: "1px solid gray",
            borderRadius: "6px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            height: "40px",
            padding: "0 20px",
            fontSize: "14px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
          }}
        >
          검색
        </button>

        {isSearchMode && (
          <button
            onClick={handleResetSearch}
            style={{
              height: "40px",
              padding: "0 20px",
              fontSize: "14px",
              background: "lightgray",
              color: "black",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
            }}
          >
            전체보기
          </button>
        )}
      </div>
    </Container>
  );
};

export default Notice;
