import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useDeleteTodo = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.DELETE_TODO],
    mutationFn: (todo) => {
      return axios.delete(`${import.meta.env.VITE_API_URL}/todo`, {
        data: todo,
      });
    },
  });
