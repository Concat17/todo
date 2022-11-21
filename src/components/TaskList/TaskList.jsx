import { useState } from "react";

import { Task } from "./components";
import { IconButton, AddIcon } from "../../components";
import { useCreateTodo, useDeleteTodo, useGetTodos } from "../../hooks";
import { QUERY_KEYS } from "../../constants";
import { queryClient } from "../../utils";

import "./TaskList.less";

const addingTaskId = "adding";

export const TaskList = () => {
  const { data: todos, isLoading: isLoadingTodos } = useGetTodos();

  const [openTaskId, setOpenTaskId] = useState("");

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  if (isLoadingTodos) return <>Loading...</>;

  return (
    <>
      <ul>
        {todos.map((task) => (
          <Task
            key={task._id}
            task={task}
            open={task._id === openTaskId}
            onOpen={(title) => {
              setOpenTaskId(title);
            }}
            onDelete={(id) => {
              deleteTodo(
                { id },
                {
                  onSuccess: () => {
                    queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
                  },
                }
              );
              setOpenTaskId("");
            }}
          />
        ))}
        {openTaskId === addingTaskId && (
          <Task
            open={openTaskId === addingTaskId}
            onSave={(newTask) => {
              createTodo(newTask, {
                onSuccess: () => {
                  queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
                },
              });
              setOpenTaskId("");
            }}
          />
        )}
      </ul>
      {!(openTaskId === addingTaskId) && (
        <IconButton
          Icon={AddIcon}
          onClick={() => setOpenTaskId(addingTaskId)}
        />
      )}
    </>
  );
};
