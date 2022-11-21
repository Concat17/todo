import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useCreateTodo = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.CREATE_TODO],
    mutationFn: (newTodo) => {
      return axios.post("http://localhost:3333/todo", newTodo);
    },
  });
