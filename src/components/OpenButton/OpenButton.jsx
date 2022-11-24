import classNames from "classnames";
import PropTypes from "prop-types";

import "./OpenButton.less";

/**
 * Button with open icon.
 *
 * @component
 * @example
 *  <OpenButton open={open} onClick={handleOpen}/>
 */
export const OpenButton = ({ open, onClick }) => {
  return (
    <div className="container" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={classNames("arrow-icon", { rotated: open })}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
};
OpenButton.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};
