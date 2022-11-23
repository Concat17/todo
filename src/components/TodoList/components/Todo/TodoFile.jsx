import { useState, useCallback } from "react";

import { Button } from "../../../Button";

import {
  useUploadTodoAttachment,
  useGetTodoAttachment,
} from "../../../../hooks";

export const TodoFile = ({ todo }) => {
  const [localFile, setFile] = useState();

  const { mutate: uploadAttachment } = useUploadTodoAttachment();
  const { refetch } = useGetTodoAttachment({
    todoId: todo._id,
    fileName: todo.fileName,
  });

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(todo, todo._id);
      uploadAttachment({ file: localFile, todoId: todo._id });
    },
    [localFile, todo, uploadAttachment]
  );

  return todo.fileId ? (
    <Button onClick={() => refetch()}>{todo.fileName}</Button>
  ) : (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(event) => setFile(event.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};
