import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useCreateTodo = () =>
  useMutation({
    mutationFn: (newTodo) => {
      return axios.post("http://localhost:3333/todo", newTodo);
    },
  });
