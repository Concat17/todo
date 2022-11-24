import PropTypes from "prop-types";

export const TodoAttachmentPropTypes = {
  /**
   * Todo for this attachment
   */
  todo: PropTypes.shape({
    /**
     * Todo id
     */
    _id: PropTypes.string.isRequired,
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
};
