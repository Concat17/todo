import { useState, useCallback } from "react";

import { Task } from "./components";
import { IconButton, AddIcon } from "../../components";
import {
  useCreateTodo,
  useDeleteTodo,
  useEditTodo,
  useGetTodos,
  useChangeCheckTodo,
} from "../../hooks";
import { QUERY_KEYS } from "../../constants";
import { queryClient } from "../../utils";

import "./TaskList.less";

const addingTaskId = "adding";
const LOADING = "Loading...";

export const TaskList = () => {
  const { data: todos, isLoading: isLoadingTodos } = useGetTodos();

  const [openTaskId, setOpenTaskId] = useState("");

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: editTodo } = useEditTodo();
  const { mutate: changeCheckTodo } = useChangeCheckTodo();

  const handleCreateTodo = useCallback(
    (newTask) => {
      createTodo(newTask, {
        onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
        },
      });
      setOpenTaskId("");
    },
    [createTodo]
  );

  const handleChangeCheckTodo = useCallback(
    (checkStatus) => {
      changeCheckTodo(checkStatus, {
        onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
          queryClient.invalidateQueries([QUERY_KEYS.GET_TODOS]);
        },
      });
    },
    [changeCheckTodo]
  );

  const handleEditTodo = useCallback(
    (todo) => {
      editTodo(todo, {
        onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
        },
      });
      setOpenTaskId("");
    },
    [editTodo]
  );

  const handleDeleteTodo = useCallback(
    (_id) => {
      deleteTodo(
        { _id },
        {
          onSuccess: () => {
            queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
          },
        }
      );
      setOpenTaskId("");
    },
    [deleteTodo]
  );

  if (isLoadingTodos) return <>{LOADING}</>;

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
            onCheck={handleChangeCheckTodo}
            onSave={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
        {openTaskId === addingTaskId && (
          <Task open={openTaskId === addingTaskId} onSave={handleCreateTodo} />
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
