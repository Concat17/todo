import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useUploadTodoAttachment = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.UPLOAD_TODO_ATTACHMENT],
    mutationFn: ({ todoId, file }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("todoId", todoId);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      return axios.post(
        `${import.meta.env.VITE_API_URL}/file`,
        formData,
        config
      );
    },
  });
