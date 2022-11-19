import "./IconButton.less";

export const IconButton = ({ Icon, onClick }) => {
  return (
    <div className="icon-button-container" onClick={onClick}>
      <Icon />
    </div>
  );
};
