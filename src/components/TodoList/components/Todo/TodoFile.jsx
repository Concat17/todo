import { useState, useCallback } from "react";

import {
  useUploadTodoAttachment,
  useGetTodoAttachment,
  useDeleteTodoAttachment,
} from "../../../../hooks";

import { queryClient } from "../../../../utils";
import { QUERY_KEYS } from "../../../../constants";

import "./TodoFile.less";
import { IconButton } from "../../../IconButton";
import { CrossIcon } from "../../../Icons";

export const TodoFile = ({ todo }) => {
  const [file, setFile] = useState();

  const { mutate: uploadAttachment } = useUploadTodoAttachment();
  const { mutate: deleteAttachment } = useDeleteTodoAttachment();
  const { refetch: downloadFile } = useGetTodoAttachment({
    todoId: todo._id,
    fileName: todo.fileName,
  });

  const handleUploadAttachment = useCallback(
    (event) => {
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
      <button type="submit">Upload</button>
    </form>
  );
};
