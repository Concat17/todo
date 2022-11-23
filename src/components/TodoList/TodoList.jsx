import { useState, useMemo, useCallback } from "react";

import { Todo } from "./components";
import { IconButton, AddIcon, LoadingSpinner } from "..";
import {
  useCreateTodo,
  useDeleteTodo,
  useEditTodo,
  useGetTodos,
  useChangeCheckTodo,
} from "../../hooks";
import { QUERY_KEYS } from "../../constants";
import { queryClient } from "../../utils";

import "./TodoList.less";

const addingTodoId = "adding";

const Loading = () => (
  <div className="loading-container">
    <LoadingSpinner />
  </div>
);

export const TodoList = () => {
  const { data: todos, isLoading: isLoadingTodos } = useGetTodos();

  const [openTodoId, setOpenTodoId] = useState("");

  const { mutate: createTodo, isLoading: isCreating } = useCreateTodo();
  const { mutate: deleteTodo, isLoading: isDeleting } = useDeleteTodo();
  const { mutate: editTodo } = useEditTodo();
  const { mutate: changeCheckTodo } = useChangeCheckTodo();

  const handleCreateTodo = useCallback(
    (newTodo) => {
      createTodo(newTodo, {
        onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
        },
      });
      setOpenTodoId("");
    },
    [createTodo]
  );

  const handleChangeCheckTodo = useCallback(
    (checkStatus) => {
      changeCheckTodo(checkStatus, {
        onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEYS.GET_TODOS]);
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
      setOpenTodoId("");
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
            setOpenTodoId("");
          },
        }
      );
    },
    [deleteTodo]
  );

  const isTodoInfoLoading = useMemo(
    () => isCreating || isDeleting,

    [isCreating, isDeleting]
  );

  if (isLoadingTodos) return <Loading />;

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            open={todo._id === openTodoId}
            onOpen={(title) => {
              setOpenTodoId(title);
            }}
            onCheck={handleChangeCheckTodo}
            onSave={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
        {openTodoId === addingTodoId && (
          <Todo
            open={openTodoId === addingTodoId}
            onSave={handleCreateTodo}
            onOpen={() => {
              setOpenTodoId("");
            }}
          />
        )}
      </ul>
      {!(openTodoId === addingTodoId) && !isTodoInfoLoading && (
        <IconButton
          Icon={AddIcon}
          onClick={() => setOpenTodoId(addingTodoId)}
        />
      )}
      {isTodoInfoLoading && <Loading />}
    </>
  );
};
