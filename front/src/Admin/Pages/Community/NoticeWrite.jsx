import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as S from "./NoticeWrite.styles";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 수정 모드 데이터 확인
  const passedData = location.state?.noticeData;
  const isEditMode = !!passedData;

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEditMode && passedData) {
      setTitle(passedData.title);
      setWriter(passedData.writer);
      setDate(passedData.date);
      // setContent(passedData.content);
    }
  }, [isEditMode, passedData]);

  return (
    <div>
      <S.Header>
        <h2>Community / {isEditMode ? "Notice Edit" : "Notice Write"}</h2>
      </S.Header>

      <S.Container>
        <S.SectionTitle>
          {isEditMode ? "Edit Notice" : "Write Notice"}
        </S.SectionTitle>
        <S.SectionDesc>
          {isEditMode ? "Edit details" : "Create new notice"}
        </S.SectionDesc>

        <S.FormGroup>
          <div>
            <S.Label>Notice title</S.Label>
            <S.Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <S.Label>Writer Name</S.Label>
            <S.Input
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>
        </S.FormGroup>

        <S.FormGroup>
          <div>
            <S.Label>Date</S.Label>
            <S.Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </S.FormGroup>

        <S.Label>작성 내용</S.Label>
        <S.TextAreaBox>
          <S.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </S.TextAreaBox>

        <S.Label>파일 첨부</S.Label>
        <S.TextAreaBox
          style={{ background: "white", border: "none", padding: 0 }}
        >
          <S.UploadBox>
            <FaCloudUploadAlt size={30} />
            <div style={{ marginTop: "10px" }}>Click to upload</div>
            <p>SVG, PNG, JPG or GIF</p>
          </S.UploadBox>
        </S.TextAreaBox>

        <S.ButtonGroup>
          <S.Button onClick={() => navigate(-1)}>Cancel</S.Button>
          {/* $primary 사용 */}
          <S.Button
            $primary
            onClick={() => navigate("/admin/community/notice-list")}
          >
            {isEditMode ? "Save Changes" : "Create"}
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default NoticeWrite;
