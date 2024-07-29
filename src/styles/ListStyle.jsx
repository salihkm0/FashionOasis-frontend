import { styled } from "styled-components";

export const ListPageHead = styled.h1`
  font-size: 24px;
  font-weight: 500;
  /* margin-top : 30px; */
`;
export const ListWrapper = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 6px;
    /* width: 1px; */
  }
  &::-webkit-scrollbar-track {
    background-color: #061652;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff6a00;
    cursor: pointer;
  }
`;
export const ListTable = styled.table`
  width: 100%;
  min-width : 900px;
  margin: 50px auto;
  /* border-collapse : collapse; */

  th,
  td {
    padding: 8px 2%;
    text-align: left;
    border: 1px solid #02104857;
    color: #021048;
  }
  th {
    background: #021048;
    color: white;
    padding : 5px;
  }
  td {
    border-bottom: 2px solid #de64008f;
    padding : 5px;
  }
`;
export const ListBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
export const ListBtn = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 3px;
  color: #fff;
  background: ${(props) => (props.$red ? "#c30404" : "#e96900")};
  &:hover {
    transform: scale(1.05);
  }
`;
export const ListPageBarWrpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 30px;
`;
export const AddBtn = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 3px;
  color: #fff;
  background: #021048;
`;

