import "./IconButton.less";

export const IconButton = ({ Icon, onClick, ...props }) => {
  return (
    <div className="icon-button-container" onClick={onClick}>
      <Icon />
    </div>
  );
};
