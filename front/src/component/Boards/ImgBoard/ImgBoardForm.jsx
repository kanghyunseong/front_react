import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../Api";
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
  const [imgBoardTitle, setImgBoardTitle] = useState("");
  const [imgBoardContent, setImgBoardContent] = useState("");
  const [files, setFiles] = useState([]); // 여러 개

  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다!");
      navi("/members/login");
    }
  }, [auth.isAuthenticated, navi]);

  const handelFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const allowTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 1024 * 1024 * 10;

    const validFiles = [];

    for (const file of selectedFiles) {
      if (!allowTypes.includes(file.type)) {
        alert("이미지만 올려주세요 (jpg, jpeg, png, gif)");
        continue;
      }
      if (file.size > maxSize) {
        alert("너무 용량이 커요 (파일당 최대 10MB)");
        continue;
      }
      validFiles.push(file);
    }

    setFiles(validFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imgBoardTitle.trim() || !imgBoardContent.trim()) {
      return alert("제목/내용은 필수입니다!");
    }

    if (!files || files.length === 0) {
      return alert("이미지 파일을 하나 이상 선택해주세요!");
    }

    const formData = new FormData();
    formData.append("imgBoardTitle", imgBoardTitle);
    formData.append("imgBoardContent", imgBoardContent);

    files.forEach((file) => {
      formData.append("files", file);
    });

    api
      .post("/boards/imgBoards", formData)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          alert(res.data?.message || "갤러리 게시글이 등록되었습니다!");
          navi("/boards/imgBoards");
        }
      })
      .catch((err) => {
        console.log(err);
        const msg =
          err.response?.data?.message || "등록에 실패했습니다.";
        alert(msg);
      });
  };

  // 뒤로가기 버튼 처리
  const handleBack = () => {
    if (imgBoardTitle.trim() || imgBoardContent.trim()) {
      const ok = window.confirm(
        "작성 중인 내용이 사라집니다. 정말 뒤로가시겠어요?"
      );
      if (!ok) return;
    }
    navi(-1);
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
          value={imgBoardTitle}
          onChange={(e) => setImgBoardTitle(e.target.value)}
        />

        <Label>내용</Label>
        <Input
          type="text"
          value={imgBoardContent}
          onChange={(e) => setImgBoardContent(e.target.value)}
        />

        <Label>작성자</Label>
        <Input
          type="text"
          value={auth.userId}
          readOnly
          style={{ background: "#eee" }}
        />

        <Label>이미지 파일 (여러 개 선택 가능)</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handelFileChange}
        />

        <Button type="submit">등록하기</Button>
        <Button
          type="button"
          onClick={handleBack}
          style={{ background: "blue" }}
        >
          뒤로가기
        </Button>
      </Form>
    </Container>
  );
};

export default ImgBoardForm;
