import PropTypes from "prop-types";

import "./IconButton.less";

/**
 * Clickable icon component.
 *
 * @component
 * @example
 * return (
 *    <IconButton Icon={AddIcon}  onClick={onClick} />
 * )
 */
export const IconButton = ({ Icon, onClick, ...props }) => {
  return (
    <div className="icon-button-container" onClick={onClick} {...props}>
      <Icon />
    </div>
  );
};

IconButton.propTypes = {
  Icon: PropTypes.func,
  onClick: PropTypes.func,
};
