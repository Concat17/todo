import { useState } from "react";
import classNames from "classnames";

import { Checkbox } from "../../../Checkbox";
import { OpenButton } from "../../../OpenButton";
import { IconButton } from "../../../IconButton";
import { Button } from "../../../Button";
import { AddFileIcon } from "../../../Icons";
import "./Task.less";

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
          <input type="text" defaultValue={title} className="editable-field" />
        ) : (
          <span className={classNames({ strike: done })}>{title}</span>
        )}
        <div className="right">
          <input
            type="date"
            defaultValue="2022-07-22"
            onChange={(e) => console.log(e.target.value)}
          />
          <OpenButton open={open} onClick={() => setOpen((p) => !p)} />
        </div>
      </div>

      <div className={classNames("description", { hidden: !open })}>
        <IconButton Icon={AddFileIcon} />
        <span>kek</span>
        <div>
          <Button onClick={() => setEditing((p) => !p)}>Edit</Button>
          <Button>Save</Button>
          <Button>Remove</Button>
        </div>
      </div>
    </li>
  );
};
