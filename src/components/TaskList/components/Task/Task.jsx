import { useState } from "react";
import classNames from "classnames";

import { Checkbox } from "../../../Checkbox";
import { OpenButton } from "../../../OpenButton";
import { IconButton } from "../../../IconButton";
import { Button } from "../../../Button";
import "./Task.less";

const AddFileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      style={{ width: "1em", height: "1em" }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
};

export const Task = ({ title }) => {
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <li className="task-container">
      <div className="overview">
        <div className="left">
          <Checkbox checked={done} onChange={setDone} />
        </div>
        {editing ? (
          <input type="text" defaultValue={title} />
        ) : (
          <span className={classNames({ strike: done })}>{title}</span>
        )}
        <div className="right">
          <span>21.11.2022</span>
          <OpenButton open={open} onClick={() => setOpen((p) => !p)} />
        </div>
      </div>

      <div className={classNames("description", { hidden: !open })}>
        <IconButton Icon={AddFileIcon} />
        <span>kek</span>
        <div>
          <Button onClick={() => setEditing((p) => !p)}>Edit</Button>
          <Button>Save</Button>
        </div>
      </div>
    </li>
  );
};
