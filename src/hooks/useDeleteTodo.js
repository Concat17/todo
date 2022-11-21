import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useDeleteTodo = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.DELETE_TODO],
    mutationFn: (todo) => {
      console.log("t", todo);
      return axios.delete("http://localhost:3333/todo", {
        data: todo,
      });
    },
  });
