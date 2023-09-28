import RecomItem from "./RecomItem";
import styled from "styled-components";

const Ul = styled.ul`
  border-bottom: 1px solid #ababab;
  display: flex;
  flex-direction: row;
  padding-inline-start: 0px;
  overflow-x: auto;
`;

const RecomList = (props) => {
  return (
    <Ul className="recom-list-container">
      {props.item.map((item) => (
        <RecomItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          category={item.category}
        />
      ))}
    </Ul>
  );
};

export default RecomList;
