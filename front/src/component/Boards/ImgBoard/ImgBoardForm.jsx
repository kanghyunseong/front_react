import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Header,
  Form,
  Input,
  Label,
  Button,
} from "./ImgBoard.styles";
import gasipan from "../../../assets/gasipan.png";

const ImgBoardForm = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [file, setFile] = useState(null);

  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다!");
      navi("/members/login");
    }
  }, [auth.isAuthenticated, navi]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!boardTitle.trim() || !boardContent.trim()) {
      return alert("제목/내용은 필수입니다!");
    }

    if (!file) {
      return alert("이미지 파일을 선택해주세요!");
    }

    const formData = new FormData();
    formData.append("boardTitle", boardTitle);
    formData.append("boardContent", boardContent);
    formData.append("imageFile", file); // 백엔드에서 받는 파라미터명에 맞게 수정

    axios
      .post("http://localhost:8081/boards/imgBoards", formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          alert("갤러리 게시글이 등록되었습니다!");
          navi("/boards/imgBoards");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("등록에 실패했습니다.");
      });
  };

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">갤러리 게시글 작성</div>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Label>제목</Label>
        <Input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />

        <Label>내용</Label>
        <Input
          type="text"
          value={boardContent}
          onChange={(e) => setBoardContent(e.target.value)}
        />

        <Label>작성자</Label>
        <Input
          type="text"
          value={auth.userId}
          readOnly
          style={{ background: "#eee" }}
        />

        <Label>이미지 파일</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button type="submit">등록하기</Button>
        <Button
          type="button"
          onClick={() => navi(-1)}
          style={{ background: "blue" }}
        >
          뒤로가기
        </Button>
      </Form>
    </Container>
  );
};

export default ImgBoardForm;
