import PropTypes from "prop-types";

import "./Button.less";

/**
 * Button component.
 *
 * @component
 * @example
 * return (
 *    <Button onClick={handleSave}>save</Button>
 * )
 */
export const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};
