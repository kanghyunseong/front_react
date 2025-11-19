import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Header,
  Tab,
  TabMenu,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TitleTd,
  Pagination,
  ButtonWrapper,
  WriteButton,
  SelectBox,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);          // 0부터 시작하는 페이지
  const [totalPages, setTotalPages] = useState(1);

  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");

  // 검색 모드 여부 + 검색 파라미터
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchParams, setSearchParams] = useState(null); // { type, keyword }

  const navi = useNavigate();

  // 공통 목록 로딩 (일반 / 검색 둘 다 여기서 처리)
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (isSearchMode && searchParams) {
          // 검색 모드 : 검색 API
          const res = await axios.get(
            "http://localhost:8081/boards/boards/search",
            {
              params: {
                type: searchParams.type,
                keyword: searchParams.keyword,
                page,
              },
            }
          );
          setBoards(res.data.content || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          // 일반 모드 : 전체 목록 API
          const res = await axios.get(
            "http://localhost:8081/boards/boards",
            {
              params: { page },
            }
          );
          const data = res.data;
          setBoards(data.content || data || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error("게시판 페이지 로딩 실패:", err);
      }
    };

    fetchBoards();
  }, [page, isSearchMode, searchParams]);

  // 조회수 증가 + 상세 페이지 이동
  const handleView = (id) => {
    axios
      .post(`http://localhost:8081/boards/boards/${id}/view`)
      .then(() => navi(`/boards/boards/${id}`))
      .catch(() => navi(`/boards/boards/${id}`));
  };

  // 검색 버튼 클릭
  const handleSearch = () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    // 검색 파라미터 저장 + 검색 모드 ON + page 0으로 이동
    setSearchParams({ type: searchType, keyword: keyword.trim() });
    setIsSearchMode(true);
    setPage(0);
  };

  // 검색 초기화 (전체 목록으로 복귀)
  const handleResetSearch = () => {
    setKeyword("");
    setIsSearchMode(false);
    setSearchParams(null);
    setPage(0);
  };

  // 페이지 번호 계산 (5개씩)
  const getPageNumbers = () => {
    const pageCount = 5;
    const start = Math.floor(page / pageCount) * pageCount;
    const end = Math.min(start + pageCount, totalPages);
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">일반 게시판</div>
      </Header>

      <TabMenu>
        <Tab onClick={() => navi("/boards/notices")}>공지사항</Tab>
        <Tab $active onClick={() => navi("/boards/boards")}>일반</Tab>
        <Tab onClick={() => navi("/boards/imgBoards")}>갤러리</Tab>
      </TabMenu>

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
          {Array.isArray(boards) && boards.length > 0 ? (
            boards.map((board) => (
              <Tr key={board.boardNo}>
                <Td>{board.boardNo}</Td>
                <TitleTd onClick={() => handleView(board.boardNo)}>
                  {board.boardTitle}
                </TitleTd>
                <Td>{board.boardWriter}</Td>
                <Td>{board.boardDate}</Td>
                <Td>{board.count}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5}>등록된 게시글이 없습니다.</Td>
            </Tr>
          )}
        </tbody>
      </Table>

      
      <Pagination>
        {/* 처음 */}
        <button
          onClick={() => setPage(0)}
          disabled={page === 0}
          style={{
            padding: "6px 10px",
            marginRight: "10px",
            background: page === 0 ? "#ddd" : "black",
            color: page === 0 ? "#888" : "white",
            borderRadius: "4px",
            border: "none",
            cursor: page === 0 ? "default" : "pointer",
          }}
        >
          처음
        </button>

        {/* 이전 */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          style={{
            padding: "6px 10px",
            marginRight: "10px",
            background: page === 0 ? "#ddd" : "black",
            color: page === 0 ? "#888" : "white",
            borderRadius: "4px",
            border: "none",
            cursor: page === 0 ? "default" : "pointer",
          }}
        >
          이전
        </button>

        {/* 페이지 번호 */}
        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              padding: "6px 10px",
              margin: "0 4px",
              background: page === num ? "black" : "lightgray",
              color: page === num ? "white" : "black",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {num + 1}
          </button>
        ))}

        {/* 다음 */}
        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={page === totalPages - 1}
          style={{
            padding: "6px 10px",
            marginLeft: "10px",
            background: page === totalPages - 1 ? "#ddd" : "black",
            color: page === totalPages - 1 ? "#888" : "white",
            borderRadius: "4px",
            border: "none",
            cursor: page === totalPages - 1 ? "default" : "pointer",
          }}
        >
          다음
        </button>

        {/* 마지막 */}
        <button
          onClick={() => setPage(totalPages - 1)}
          disabled={page === totalPages - 1}
          style={{
            padding: "6px 10px",
            marginLeft: "10px",
            background: page === totalPages - 1 ? "#ddd" : "black",
            color: page === totalPages - 1 ? "#888" : "white",
            borderRadius: "4px",
            border: "none",
            cursor: page === totalPages - 1 ? "default" : "pointer",
          }}
        >
          마지막
        </button>
      </Pagination>
      

      <ButtonWrapper>
        <WriteButton onClick={() => navi("/boards/boards/write")}>
          글쓰기
        </WriteButton>
      </ButtonWrapper>

      {/* 검색 */}
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
              padding: "0 14px",
              fontSize: "13px",
              background: "#ccc",
              color: "black",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
            }}
          >
            초기화
          </button>
        )}
      </div>
    </Container>
  );
};

export default Board;
