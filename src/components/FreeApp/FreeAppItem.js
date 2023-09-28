// import "./FreeAppItem.css";
import styled from "styled-components";

const H2 = styled.h2`
  margin-right: 35px;
  color: #717171;
`;

const Container = styled.div`
  border-bottom: 1px solid #ababab;
  display: flex;
  align-items: center;
  padding: 18px 4px;

  img,
  div {
    margin-right: 15px;
  }

  *:last-child {
    margin-right: 0;
  }
`;

const InnerDiv = styled.div`
.inner-div label,
p,
div {
  margin: 0;
`;

const P = styled.p`
  padding: 15px 0px;
  color: #737373;
`;

const Img = styled.img`
  width: 115px;
  height: 115px;
  border-radius: ${(props) => (props.iconshape === "circle" ? "60px" : "30px")};
`;

const FreeAppItem = (props) => {
  const isOdd = props.numbering % 2 === 1;
  const iconshape = isOdd ? "rectangle" : "circle";

  return (
    <Container>
      <H2 className="number">{props.numbering}</H2>

      <Img src={props.icon} iconshape={iconshape} alt="app icon" />

      <InnerDiv>
        <label style={{ fontSize: "25px" }}>{props.label}</label>
        <P>{props.category}</P>
        <div>{props.starRating}</div>
      </InnerDiv>
    </Container>
  );
};

export default FreeAppItem;
