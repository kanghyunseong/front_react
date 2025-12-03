import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Header,
  Form,
  Input,
  Label,
  Button,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const BoardForm = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");

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

     if (!boardTitle.trim() || !boardContent.trim()) {
       return alert("제목/내용은 필수입니다!");
     }

     const formData = new FormData();
     formData.append("boardTitle", boardTitle);
     formData.append("boardContent", boardContent);

     axios
       .post("http://localhost:8081/boards/boards", formData, {
         headers: {
           Authorization: `Bearer ${auth.accessToken}`,
           "Content-Type": "multipart/form-data",
         },
       })
       .then((res) => {
         if (res.status === 201) {
           alert("게시글이 등록되었습니다!");
           navi("/boards/boards");
         }
       })
       .catch((err) => console.log(err));
   };

  // 뒤로가기 버튼 처리: 작성 중이면 확인창 띄우기
  const handleBack = () => {
    if (boardTitle.trim() || boardContent.trim()) {
      const ok = window.confirm("작성 중인 내용이 사라집니다. 정말 뒤로가시겠어요?");
      if (!ok) return;
    }
    // history가 없을 수도 있으니 안전하게 경로로 이동
    navi(-1); 
  };

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">일반 게시글 작성</div>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Label>제목</Label>
        <Input
          type="text"
          onChange={(e) => setBoardTitle(e.target.value)}
        />

        <Label>내용</Label>
        <Input
          type="text"
          onChange={(e) => setBoardContent(e.target.value)}
        />

        <Label>작성자</Label>
        <Input
          type="text"
           value={auth.userId}
          readOnly
          style={{ background: "#eee" }}
        />

         <Button type="submit">등록하기</Button>
        <Button type="button" onClick={handleBack} style={{ background: "blue" }} >
        뒤로가기 </Button>
      </Form>
    </Container>
  );
};

export default BoardForm;
