import { useState, useCallback, useMemo } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import { Checkbox, Button, OpenButton } from "../../..";
import { TodoAttachment } from "./components/TodoAttachment";

import { TodoPropTypes } from "./todoPropTypes";

import "./Todo.less";

const SAVE_BUTTON_TEXT = "Save";
const REMOVE_BUTTON_TEXT = "Remove";
const TITLE_PLACEHOLDER = "Enter todo title";
const DESCRIPTION_PLACEHOLDER = "Enter todo description";
const NO_TITLE_ERROR_TEXT = "Enter todo title";

const deadlineDateFormat = "YYYY-MM-DD";

/**
 * Component for showing todo.
 *
 * @component
 * @example
 * const todo = {
 *   _id: "637e4e024535a372b431538e",
 *   done: false,
 *   title: "to do homework",
 * }
 * const open = false;
 * return (
 *    <Todo todo={todo}  open={open} />
 * )
 *
 */
export const Todo = ({ todo, open, toggleDone, onOpen, onSave, onDelete }) => {
  // todo fields
  const [done, setDone] = useState(!!todo?.done);
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [deadline, setDeadline] = useState(
    dayjs(todo?.deadline ? todo?.deadline : undefined).format(
      deadlineDateFormat
    )
  );
  // state for validating no title error
  const [isNoTitleError, setIsNoTitleError] = useState(false);

  const handleCheck = useCallback(
    (done) => {
      toggleDone({ _id: todo._id, done: done });
      setDone(done);
    },
    [toggleDone, todo?._id]
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
    // today deadline is not expired yet, so adding 1 day to deadline
    const deadlineDate = dayjs(deadline).add(1, "day");

    return deadlineDate.isBefore(today);
  }, [deadline]);

  return (
    <li className="todo-container">
      <div className="left">
        {todo?._id && <Checkbox checked={done} onChange={handleCheck} />}
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
          className={classNames({
            expire: isDeadlineExpire,
            "date-picker": open,
          })}
          type="date"
          disabled={!open}
          value={deadline}
          min="1997-01-01"
          max="2030-12-31"
          placeholder="dd-mm-yyyy"
          onChange={(e) => setDeadline(e.target.value)}
        />
        <OpenButton
          open={open}
          onClick={() => {
            onOpen(open ? "" : todo._id);
          }}
        />
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
              {todo?._id && <TodoAttachment todo={todo} />}
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

Todo.propTypes = TodoPropTypes;
