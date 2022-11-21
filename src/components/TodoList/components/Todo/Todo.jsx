import { useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import { Checkbox, Button, OpenButton } from "../../..";

import "./Todo.less";

const SAVE_BUTTON_TEXT = "Save";
const REMOVE_BUTTON_TEXT = "Remove";
const TITLE_PLACEHOLDER = "Enter todo title";
const DESCRIPTION_PLACEHOLDER = "Enter todo description";

const deadlineDateFormat = "YYYY-MM-DD";

export const Todo = ({ todo, open, onCheck, onOpen, onSave, onDelete }) => {
  const [done, setDone] = useState(!!todo?.done);
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [deadline, setDeadline] = useState(
    todo?.deadline ? dayjs(todo.deadline).format(deadlineDateFormat) : undefined
  );

  return (
    <li className="todo-container">
      <div className="left">
        <Checkbox
          checked={done}
          onChange={(c) => {
            onCheck({ _id: todo._id, done: c });
            setDone(c);
          }}
        />
      </div>

      {open ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder={TITLE_PLACEHOLDER}
          className="editable-title"
        />
      ) : (
        <span className={classNames("title", { strike: done })}>{title}</span>
      )}
      <div className="right">
        <input
          type="date"
          disabled={!open}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <OpenButton open={open} onClick={() => onOpen(open ? "" : todo._id)} />
      </div>

      {open && (
        <>
          <div className="left">
            <Button
              onClick={() =>
                onSave({
                  _id: todo?._id,
                  done,
                  title,
                  description,
                  deadline: dayjs(deadline).toISOString(),
                })
              }
            >
              {SAVE_BUTTON_TEXT}
            </Button>
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
              {/* <IconButton Icon={AddFileIcon} /> */}
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
