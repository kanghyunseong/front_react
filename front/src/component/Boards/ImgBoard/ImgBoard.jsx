import React, { useEffect, useState } from "react";
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
} from "./ImgBoard.styles";
import gasipan from "../../../assets/gasipan.png";

const ImgBoard = () => {
  const [imgBoards, setImgBoards] = useState([]);
  const [page, setPage] = useState(0);     // 0부터 시작
  const [totalPages, setTotalPages] = useState(1);

  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");

  const navi = useNavigate();

  // 페이지별 게시글 로딩
  useEffect(() => {
    axios
      .get(`http://localhost:8081/boards/imgBoards?page=${page}`)
      .then((response) => {
        console.log(response);
        setImgBoards(response.data);   
        setTotalPages(response.data.totalPages);
      })
      .catch((err) => {
        console.error("게시판 페이지 로딩 실패:", err);
      });
  }, [page]);

  // 상세보기 + 조회수 증가
  const handleView = (id) => {
    axios
      .post(`http://localhost:8081/boards/imgBoards/${id}/view`)
      .then(() => navi(`/boards/imgBoards/${id}`))
      .catch(() => navi(`/boards/imgBoards/${id}`));
  };

  // 검색 기능
  const handleSearch = () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    axios
      .get("http://localhost:8081/boards/imgBoards/search", {
        params: { type: searchType, keyword, page },
      })
      .then((res) => {
        setImgBoards(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("검색 실패:", err));
  };

  return (
    <Container>

      {/* 헤더 */}
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">갤러리 게시판</div>
      </Header>

      {/* 탭 메뉴 */}
      <TabMenu>
        <Tab onClick={() => navi("/boards/notices")}>공지사항</Tab>
        <Tab onClick={() => navi("/boards/boards")}>일반</Tab>
        <Tab $active onClick={() => navi("/boards/imgBoards")}>갤러리</Tab>
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
          {Array.isArray(imgBoards) && imgBoards.map((imgBoard) => (
            <Tr key={imgBoard.imgBoardNo}>
              <Td>{imgBoard.imgBoardNo}</Td>

              <TitleTd
                style={{ cursor: "pointer" }}
                onClick={() => handleView(imgBoard.imgBoardNo)}
              >
                {imgBoard.imgBoardTitle}
              </TitleTd>

              <Td>{imgBoard.imgBoardWriter}</Td>
              <Td>{imgBoard.imgBoardDate}</Td>
              <Td>{imgBoard.imgCount}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {/* 페이지네이션 */}
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

      {/* 글쓰기 */}
      <ButtonWrapper>
        <WriteButton onClick={() => navi("/boards/imgBoards/write")}>
          글쓰기
        </WriteButton>
      </ButtonWrapper>

      {/* 검색 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",   // 핵심!
          marginTop: 20,
          gap: "10px",            // 간격 안정적
        }}>

      {/* SelectBox */}
      <SelectBox
        onChange={(e) => setSearchType(e.target.value)}
        style={{
          height: "40px",
          padding: "0 10px",
          fontSize: "14px",
          borderRadius: "6px",
        }}>

        <option value="title">제목</option>
        <option value="writer">작성자</option>
        <option value="content">내용</option>
      </SelectBox>

      {/* Input */}
      <input
        type="text"
        placeholder="검색어 입력"
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          height: "40px",
          padding: "0 10px",
          fontSize: "14px",
          border: "1px solid gray",
          borderRadius: "6px",
        }} />

      {/* Button */}
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
        }}>검색</button>

      </div>



    </Container>
  );
};

export default ImgBoard;
