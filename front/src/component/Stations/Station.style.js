import styled from "styled-components";
export const MainContainer = styled.div`
  width: 100%;
  background: #f5f7fb;
  display: flex;
  height: 1000px;
`;

export const LeftSection = styled.div`
  display: flex;
  height: 800px;
  background: #9191919e;
  width: 20%;
  flex-direction: column;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 25px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 25px;
  font-size: 16px;
  outline: none;

  transition: all 0.3s;
  &:focus {
    border-color: 4092CD;
  }
  &::placeholder {
    color: #aaa;
    font-size: 14px;
    font-style: italic;
  }
`;
export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  background: none;
  border: none;

  width: 40px;
  height: 40px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchResult = styled.div`
  height: 800px;

  background-repeat: no-repeat;
  background-image: url("src/assets/logo.png");
  background-position: center;
  overflow: scroll;
`;
export const RightSection = styled.div`
  display: flex;
  height: 1000px;
  background: white;
  width: 80%;
  flex-direction: column;
`;
export const Map = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 500px;
`;
export const Review = styled.div`
  width: 80%;
  display: flex;
`;
export const Recomend = styled.button`
  width: 10%;
  height: 30px;
  font-size: 15px;
  margin-top: 40px;
  margin-right: 20px;
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
  &.active {
    background-color: #1abfb1;
    color: white;
    border: none;
  }
  &.dislike {
    background-color: #992b2b;
    color: white;
    border: none;
  }
  &:hover {
    opacity: 0.8;
  }
`;
export const Comment = styled.input`
  width: 100%;
  height: 30px;
  font-size: 20px;
  outline: none;
  margin-top: 40px;

  transition: all 0.3s;
  &:focus {
    border-color: 4092CD;
  }
  &::placeholder {
    color: #aaa;
    font-size: 14px;
    font-style: italic;
    flex-direction: column;
  }
`;
export const Registration = styled.button`
  width: 10%;
  height: 30px;
  font-size: 15px;
  color: black;
  margin-top: 40px;
  margin-left: 20px;
  &:hover {
    background-color: pink;
    color: white;
    border: none;
  }
`;
export const Elision = styled.button`
  width: 10%;
  height: 30px;
  font-size: 15px;
  color: black;
  margin-top: 30px;
  margin-left: 20px;
`;
