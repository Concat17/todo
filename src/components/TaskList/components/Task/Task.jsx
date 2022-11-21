import { useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import {
  AddFileIcon,
  Checkbox,
  IconButton,
  Button,
  OpenButton,
} from "../../../../components";

import "./Task.less";

export const Task = ({ task, open, onCheck, onOpen, onSave, onDelete }) => {
  const [done, setDone] = useState(!!task.done);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(
    dayjs(task.deadline).format("YYYY-MM-DD")
  );

  // const [isOpen, setIsOpen] = useState(open); TODO: figure out why doent work
  // const [isEditing, setIsEditing] = useState(true);
  // console.log(open, isEditing);

  return (
    <li className="task-container">
      <div className="left">
        <Checkbox
          checked={done}
          onChange={(c) => {
            onCheck({ _id: task._id, done: c });
            setDone(c);
          }}
        />
      </div>

      {open ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder={"Enter task title"}
          className="editable-field"
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
        <OpenButton open={open} onClick={() => onOpen(open ? "" : task._id)} />
      </div>

      {open && (
        <>
          <div>
            <Button
              onClick={() =>
                onSave({
                  _id: task._id,
                  done,
                  title,
                  description,
                  deadline: dayjs(deadline).toISOString(),
                })
              }
            >
              Save
            </Button>
          </div>
          <textarea
            name="Text1"
            cols="30"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder={"Enter task title"}
            className="editable-field"
          ></textarea>
          <div className="right">
            <div className="right-controls">
              <IconButton Icon={AddFileIcon} />
              <Button onClick={() => onDelete(task._id)}>Remove</Button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
