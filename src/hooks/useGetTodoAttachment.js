import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import axios from "axios";

export const useGetTodoAttachment = ({ todoId, fileName }) =>
  useQuery(
    [QUERY_KEYS.GET_TODO_ATTACHMENT],
    () => {
      const config = {
        headers: {
          "Content-Type": "application/pdf",
        },
        responseType: "blob",
      };

      console.log({ todoId, fileName });

      return axios
        .get(`${import.meta.env.VITE_API_URL}/file/download/${todoId}`, config)
        .then((response) => {
          // create file link in browser's memory
          const href = URL.createObjectURL(response.data);

          // create "a" HTML element with href to file & click
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", fileName); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);

          return fileName;
        });
    },
    { refetchOnWindowFocus: false, enabled: false }
  );
