import PropTypes from "prop-types";
import dayjs from "dayjs";

export const TodoPropTypes = {
  /**
   * Todo info to render
   */
  todo: PropTypes.shape({
    /**
     * Todo id
     */
    _id: PropTypes.string,
    /**
     * Todo title
     */
    title: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
    /**
     * Todo done status
     */
    done: PropTypes.bool,
    /**
     * Todo description
     */
    description: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
    /**
     * Todo deadline
     */
    deadline: PropTypes.instanceOf(dayjs.Dayjs),
    /**
     * File id
     */
    fileId: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
    /**
     * File name
     */
    fileName: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
  }),
  /**
   * Indicated if todo is open or not
   */
  open: PropTypes.bool.isRequired,
  /**
   * Action on change todo status
   */
  toggleDone: PropTypes.func,
  /**
   * Action on todo opening
   */
  onOpen: PropTypes.func,
  /**
   * Action on todo saving
   */
  onSave: PropTypes.func,
  /**
   * Action on todo deleting
   */
  onDelete: PropTypes.func,
};
