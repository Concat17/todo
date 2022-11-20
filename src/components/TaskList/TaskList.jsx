import { useState } from "react";

import { Task } from "./components";
import { IconButton, AddIcon } from "../../components";
import { useCreateTodo, useGetTodos } from "../../hooks";
import { QUERY_KEYS } from "../../constants";
import { queryClient } from "../../utils";

import "./TaskList.less";

export const TaskList = () => {
  const { data: todos, isLoading: isLoadingTodos } = useGetTodos();

  const [openTask, setOpenTask] = useState("");

  const { mutate: createTodo } = useCreateTodo();

  if (isLoadingTodos) return <>Loading...</>;

  return (
    <>
      <ul>
        {todos.map(({ _id, title }, i) => (
          <Task
            key={_id}
            title={title}
            open={title === openTask}
            onOpen={(title) => {
              setOpenTask(title);
            }}
          />
        ))}
        {openTask === "adding" && (
          <Task
            open={openTask === "adding"}
            onSave={(newTask) => {
              createTodo(newTask, {
                onSuccess: () => {
                  queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
                },
              });
              setOpenTask("");
            }}
          />
        )}
      </ul>
      {!(openTask === "adding") && (
        <IconButton Icon={AddIcon} onClick={() => setOpenTask("adding")} />
      )}
    </>
  );
};
