import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useEditTodo = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.EDIT_TODO],
    mutationFn: (todo) => {
      console.log(todo);
      return axios.put("http://localhost:3333/todo", todo);
    },
  });
