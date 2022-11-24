import PropTypes from "prop-types";

import "./Checkbox.less";

/**
 * Checkbox component.
 *
 * @component
 * @example
 * return (
 *    <Checkbox checked={true} onChange={handleCheck} />
 * )
 */
export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      {label}
    </label>
  );
};
Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
