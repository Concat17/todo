import { useState, useCallback, useMemo } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import { Checkbox, Button, OpenButton } from "../../..";
import { TodoFile } from "./TodoFile";

import "./Todo.less";

const SAVE_BUTTON_TEXT = "Save";
const REMOVE_BUTTON_TEXT = "Remove";
const TITLE_PLACEHOLDER = "Enter todo title";
const DESCRIPTION_PLACEHOLDER = "Enter todo description";
const NO_TITLE_ERROR_TEXT = "Enter todo title";

const deadlineDateFormat = "YYYY-MM-DD";

export const Todo = ({ todo, open, onCheck, onOpen, onSave, onDelete }) => {
  const [done, setDone] = useState(!!todo?.done);
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [deadline, setDeadline] = useState(
    dayjs(todo?.deadline ? todo?.deadline : undefined).format(
      deadlineDateFormat
    )
  );
  const [isNoTitleError, setIsNoTitleError] = useState(false);

  const handleCheck = useCallback(
    (done) => {
      onCheck({ _id: todo._id, done: done });
      setDone(done);
    },
    [onCheck, todo?._id]
  );

  const handleSave = useCallback(() => {
    if (!title) {
      setIsNoTitleError(true);
    } else {
      onSave({
        _id: todo?._id,
        done,
        title,
        description,
        deadline: dayjs(deadline).toISOString(),
      });

      setIsNoTitleError(false);
    }
  }, [deadline, description, done, onSave, title, todo?._id]);

  const isDeadlineExpire = useMemo(() => {
    const today = dayjs();
    const deadlineDate = dayjs(deadline).add(1, "day");

    return deadlineDate.isBefore(today);
  }, [deadline]);

  return (
    <li className="todo-container">
      <div className="left">
        <Checkbox checked={done} onChange={handleCheck} />
      </div>

      {open ? (
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value), setIsNoTitleError(false);
          }}
          placeholder={TITLE_PLACEHOLDER}
          className="editable-title"
        />
      ) : (
        <span className={classNames("title", { strike: done })}>{title}</span>
      )}
      <div className="right">
        <input
          className={classNames({ expire: isDeadlineExpire })}
          type="date"
          disabled={!open}
          value={deadline}
          min="1997-01-01"
          max="2030-12-31"
          placeholder="dd-mm-yyyy"
          onChange={(e) => setDeadline(e.target.value)}
        />
        <OpenButton open={open} onClick={() => onOpen(open ? "" : todo._id)} />
      </div>

      {open && (
        <>
          <div className="left">
            <div className="left-controls">
              <Button onClick={handleSave}>{SAVE_BUTTON_TEXT}</Button>

              {isNoTitleError && (
                <span className="error">{NO_TITLE_ERROR_TEXT}</span>
              )}
            </div>
          </div>
          <textarea
            name="description"
            cols="30"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder={DESCRIPTION_PLACEHOLDER}
            className="editable-description"
          ></textarea>
          <div className="right">
            <div className="right-controls">
              {todo?._id && <TodoFile todo={todo} />}
              <Button onClick={() => onDelete(todo._id)}>
                {REMOVE_BUTTON_TEXT}
              </Button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
