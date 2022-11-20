import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useGetTodos = () =>
  useQuery([QUERY_KEYS.GET_TODOS], () =>
    axios.get("http://localhost:3333/todo").then((res) => res.data)
  );
