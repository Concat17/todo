import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useChangeCheckTodo = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.CHANGE_CHECK_TODO],
    mutationFn: (checkStatus) => {
      return axios.put("http://localhost:3333/todo/check", checkStatus);
    },
  });
