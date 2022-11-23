import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useDeleteTodoAttachment = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.DELETE_TODO_ATTACHMENT],
    mutationFn: (todoId) => {
      console.log("t", todoId);
      return axios.delete(`${import.meta.env.VITE_API_URL}/file/${todoId}`);
    },
  });
