import debounce from "lodash/debounce";
import styled from "styled-components";
import React, { useCallback } from "react";

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
  const debounceSearch = debounce((searchVal) => {
    props.onChange(searchVal);
  }, 400);

  const inputChangeHandler = (event) => {
    debounceSearch(event.target.value);
  };

  return (
    <Div>
      <Input onChange={inputChangeHandler} type="text" placeholder="🔍  搜尋" />
    </Div>
  );
};

export default SearchBar;
