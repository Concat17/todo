import { useState, useCallback, useMemo } from "react";

import {
  useUploadTodoAttachment,
  useGetTodoAttachment,
  useDeleteTodoAttachment,
} from "../../../../../hooks";

import { LoadingSpinner } from "../../../../LoadingSpinner";
import { queryClient } from "../../../../../utils";
import { QUERY_KEYS } from "../../../../../constants";

import { IconButton } from "../../../../IconButton";
import { CrossIcon } from "../../../../Icons";

import { TodoAttachmentPropTypes } from "./todoAttachmentPropTypes";

import "./TodoAttachment.less";

const Loading = () => (
  <div className="loading-container">
    <LoadingSpinner />
  </div>
);

const UPLOAD_BUTTON_TEXT = "Upload";

/**
 * Component for working with todo attachment.
 *
 * @component
 * @example
 * const todo = {
 *   _id: "637e4e024535a372b431538e",
 *   fileId: "637e9eabb880aa3b95af6247",
 *   fileName: "test.txt";
 * }
 * return (
 *    <TodoAttachment todo={todo} />}
 * )
 */
export const TodoAttachment = ({ todo }) => {
  const [file, setFile] = useState();

  const { mutate: uploadAttachment, isLoading: isUploading } =
    useUploadTodoAttachment();
  const { mutate: deleteAttachment, isLoading: isDeleting } =
    useDeleteTodoAttachment();
  const { refetch: downloadFile } = useGetTodoAttachment({
    todoId: todo._id,
    fileName: todo.fileName,
  });

  const handleUploadAttachment = useCallback(
    (event) => {
      // prevents page reload
      event.preventDefault();
      uploadAttachment(
        { file, todoId: todo._id },
        {
          onSuccess: () => {
            queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
          },
        }
      );
    },
    [file, todo, uploadAttachment]
  );

  const handleDeleteAttachment = useCallback(
    (todoId) => {
      deleteAttachment(todoId, {
        onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
        },
      });
    },
    [deleteAttachment]
  );

  const isFileLoading = useMemo(
    () => isUploading || isDeleting,

    [isUploading, isDeleting]
  );

  if (isFileLoading) {
    return <Loading />;
  }

  return todo.fileId ? (
    <div className="file-container">
      <a onClick={() => downloadFile()} className="file-download-link ">
        {todo.fileName}
      </a>
      <IconButton
        Icon={CrossIcon}
        onClick={() => handleDeleteAttachment(todo._id)}
      />
    </div>
  ) : (
    <form onSubmit={handleUploadAttachment} className="file-upload-form">
      <input type="file" onChange={(event) => setFile(event.target.files[0])} />
      <button type="submit">{UPLOAD_BUTTON_TEXT}</button>
    </form>
  );
};

TodoAttachment.propTypes = TodoAttachmentPropTypes;
