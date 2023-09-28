// import "./SearchBar.css";
import styled from "styled-components";
const Div = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #bab8b8;
`;

const Input = styled.input`
  flex: 1;
  height: 50px;
  font-size: 25px;
  background-color: #dfdfdf;
  border: none;
  border-radius: 9px;
  text-align: center;
`;

const SearchBar = (props) => {
  return (
    <Div>
      <Input
        // value={input}`
        onChange={(event) => props.onChange(event.target.value)}
        type="text"
        placeholder="🔍  搜尋"
      />
    </Div>
  );
};

export default SearchBar;
