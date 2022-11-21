import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useGetTodos = () =>
  useQuery([QUERY_KEYS.GET_TODOS], () =>
    axios.get(`${import.meta.env.VITE_API_URL}/todo`).then((res) => res.data)
  );
