// import "./RecomItem.css";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 50px;
  row-gap: 8px;
  margin-right: 30px;
  width: 160px;
`;

const Img = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 40px;
  margin-right: 13px;
  margin: 0;
`;

const Label = styled.label`
  font-size: 25px;
`;

const P = styled.p`
  color: #7a7a7a;
  font-size: 25px;
`;

const RecomItem = (props) => {
  return (
    <Div className="recom-item-container">
      <Img src={props.icon} alt="app name" />
      <Label>{props.label}</Label>
      <P>{props.category}</P>
    </Div>
  );
};

export default RecomItem;
