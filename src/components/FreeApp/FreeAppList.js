import FreeAppItem from "./FreeAppItem";
const FreeAppList = (props) => {
  return (
    <ul>
      {props.item.map((app, index) => (
        <FreeAppItem
          key={app.key}
          numbering={index + 1}
          label={app.label}
          icon={app.icon}
          category={app.category}
          starRating={app.starRating}
        />
      ))}
    </ul>
  );
};

export default FreeAppList;
