import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
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
    top: 50%;  // 이미지 위에서 수직 중앙
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
    color: black; // 이미지에 따라 white나 shadow 추가 가능
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
  border-bottom: ${(props) => (props.$active ? '2px solid black' : 'none')};
  color: ${(props) => (props.$active ? 'black' : '#888')};
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
  padding: 10px;
  background-color: rgba(255, 172, 172, 0.6);
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 40px;

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
  font-size: 0.9em;
  flex: 1;
  text-align: center;
  color: #888888;
`;

export const Title = styled.h2`
  font-size: 33px;
  color: #33333;
  margin-bottom: 70px;
`;

export const ImagePreview = styled.img`
  min-width: auto;
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  `;