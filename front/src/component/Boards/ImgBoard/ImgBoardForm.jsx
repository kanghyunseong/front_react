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
  ImagePreview,
} from "./ImgBoard.styles";
import gasipan from "../../../assets/gasipan.png";

const ImgBoardForm = () => {
  const [imgBoardTitle, setImgBoardTitle] = useState("");
  const [imgBoardContent, setImgBoardContent] = useState("");
  const [file, setFile] = useState(null);

  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  // 로그인 체크
  useEffect(() => {
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다!");
      navi("/login");
    }
  }, [auth.isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imgBoardTitle.trim() || !imgBoardContent.trim()) {
      return alert("제목/내용은 필수입니다!");
    }

    const formData = new FormData();
    formData.append("imgBoardTitle", imgBoardTitle);
    formData.append("imgBoardContent", imgBoardContent);
    if (file) formData.append("file", file);

    const handelFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    const allowTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 1024 * 1024 * 10;
    if (selectedFile && !allowTypes.includes(selectedFile.type)) {
      alert("이미지만 올려주세요 확장자는 jpg등등 이런거만 가능합니다.");
      return;
    }
    if (selectedFile && selectedFile.size > maxSize) {
      alert("너무 용량이 커요 힘듭니다 서버가");
      return;
    }

    setFile(selectedFile);
  };

     axios
       .post("http://localhost:8081/boards/imgBoards", formData, {
         headers: {
           Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("게시글이 등록되었습니다!");
          navi("/boards/imgBoards");
        }
      })
      .catch((err) => console.log(err));
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
          onChange={(e) => setImgBoardTitle(e.target.value)}
        />

        <Label>내용</Label>
        <Input
          type="text"
          onChange={(e) => setImgBoardContent(e.target.value)}
        />

        <Label>작성자</Label>
        <Input
          type="text"
           value={auth.memberName}
          readOnly
          style={{ background: "#eee" }}
        />

        <Label>파일 첨부</Label>
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <ImagePreview src="" alt="미리보기"></ImagePreview>
        <Button>등록하기</Button>
        <Button onClick={() => navi(-1)} style={{ background: "blue" }}>
                뒤로가기
              </Button>
      </Form>
    </Container>
  );
};

export default ImgBoardForm;
