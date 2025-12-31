import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  font-family: "Pretendard", sans-serif;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 40px;

  img {
    width: 100%;
    display: block;
  }

  .title-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
    color: black; /* 이미지에 따라 white나 shadow 추가 가능 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const TabMenu = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-weight: bold;
  border-bottom: ${(props) => (props.$active ? "2px solid black" : "none")};
  color: ${(props) => (props.$active ? "black" : "#888")};
  cursor: pointer;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const Thead = styled.thead`
  background-color: #f7f7f7;
`;

export const Tr = styled.tr`
  border-top: 1px solid #ddd;
`;

export const Th = styled.th`
  padding: 10px;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 10px;
  text-align: center;
`;

export const TitleTd = styled(Td)`
  text-align: left;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const WriteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 4px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
  }
`;

export const SelectBox = styled.select`
  padding: 0 10px;
  border: 1px solid #aaa;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  appearance: none;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  padding: 10px 18px;
  background-color: rgba(255, 172, 172, 0.6);
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 40px;
  font-size: 14px;

  &:hover {
    background-color: rgba(255, 172, 172, 0.87);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid rgba(251, 137, 255, 0.1);
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: lightpink;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const BoardContent = styled.p`
  font-size: 1.2em;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 20px;
  min-height: 200px;
`;

export const BoardWriter = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  font-size: 0.9em;
  color: #888888;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-size: 33px;
  color: #333333;
  margin-bottom: 20px;
`;

/* ====================== 게시글 상세 하단 + 댓글 영역 ====================== */

export const BottomArea = styled.div`
  margin-top: 32px;
`;

// 상단 [목록보기 / 신고하기]  |  [삭제 / 수정] 라인
export const TopButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;

  & > div {
    display: flex;
    gap: 8px;
  }

  /* 상단 버튼들은 여백 없이 딱 붙도록 */
  & > div button {
    margin-top: 0;
  }
`;

// 댓글 전체 영역 박스
export const CommentArea = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px 18px 20px;
  margin-top: 8px;
  background-color: #fafafa;
`;

// "댓글쓰기" 라벨
export const CommentWriteTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
`;

// 댓글 입력 textarea
export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 70px;
  padding: 10px 12px;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  resize: vertical;
  font-size: 14px;
  box-sizing: border-box;
  line-height: 1.4;

  &:focus {
    outline: none;
    border-color: #ff9eaa;
    box-shadow: 0 0 0 1px rgba(255, 158, 170, 0.3);
  }
`;

// 로그인 안 했을 때 비활성 input 느낌
export const CommentDisabledBox = styled.div`
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 6px;
  background: #f5f5f5;
  color: #999;
  display: flex;
  align-items: center;
  font-size: 13px;
`;

// "작성하기" 버튼 라인
export const CommentWriteButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  /* 댓글 작성 버튼은 위 여백 제거 */
  button {
    margin-top: 0;
    padding: 8px 14px;
    font-size: 13px;
  }
`;

// 댓글 리스트를 위한 테이블
export const CommentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 18px;
  font-size: 13px;
`;

export const CommentHeadCell = styled.th`
  padding: 8px 6px;
  border-top: 1px solid #d5d5d5;
  border-bottom: 1px solid #d5d5d5;
  text-align: center;
  background-color: #f7f7f7;
  font-weight: 500;

  &:first-child {
    width: 60px;
  }
`;

export const CommentCell = styled.td`
  padding: 8px 6px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  text-align: center;

  /* 내용 컬럼만 좌측 정렬 */
  &:nth-child(3) {
    text-align: left;
  }
`;

// "수정 삭제", "댓글신고" 같은 작은 텍스트 버튼
export const CommentActionButton = styled.button`
  border: none;
  background: none;
  padding: 0 4px;
  cursor: pointer;
  font-size: 12px;
  color: #777;

  &:hover {
    text-decoration: underline;
    color: #444;
  }
`;
