/* eslint-disable react/prop-types */
// don't know how to write propTypes for props.style
import "./IconBase.less";

export const IconBase = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: "2rem", height: "2rem", ...props.style }}
      className="icon"
    >
      {props.children}
    </svg>
  );
};
