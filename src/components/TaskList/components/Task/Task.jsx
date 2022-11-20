import { useState } from "react";
import classNames from "classnames";

import {
  AddFileIcon,
  Checkbox,
  IconButton,
  Button,
  OpenButton,
} from "../../../../components";

import "./Task.less";

export const Task = ({ title, open, editing, onClick }) => {
  const [done, setDone] = useState(false);
  // const [isOpen, setIsOpen] = useState(open); TODO: figure out why doent work
  // const [isEditing, setIsEditing] = useState(true);
  // console.log(open, isEditing);
  return (
    <li className="task-container">
      <div className="overview">
        <div className="left">
          <Checkbox checked={done} onChange={setDone} />
        </div>
        {open ? (
          <input
            type="text"
            defaultValue={title}
            placeholder={"Enter task title"}
            className="editable-field"
          />
        ) : (
          <span
            onClick={onClick}
            className={classNames("title", { strike: done })}
          >
            {title}
          </span>
        )}
        <div className="right">
          <input
            type="date"
            defaultValue="2022-07-22"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>

      <div className={classNames("description", { hidden: !open })}>
        <IconButton Icon={AddFileIcon} />
        {open ? (
          <input
            type="text"
            defaultValue={title}
            placeholder={"Enter task title"}
            className="editable-field"
          />
        ) : (
          <span
            onClick={onClick}
            className={classNames("title", { strike: done })}
          >
            {title}
          </span>
        )}
        <div>
          <Button onClick={() => setIsEditing((p) => !p)}>Edit</Button>
          <Button>Save</Button>
          <Button>Remove</Button>
        </div>
      </div>
    </li>
  );
};
