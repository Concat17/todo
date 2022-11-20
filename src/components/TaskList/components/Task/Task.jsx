import { useState, useEffect, useCallback, useRef } from "react";
import classNames from "classnames";

import {
  AddFileIcon,
  CrossIcon,
  Checkbox,
  IconButton,
  Button,
  OpenButton,
} from "../../../../components";

import "./Task.less";

export const Task = ({ title: initTitle, open, onOpen, onSave }) => {
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState(initTitle ?? "");
  // const [isOpen, setIsOpen] = useState(open); TODO: figure out why doent work
  // const [isEditing, setIsEditing] = useState(true);
  // console.log(open, isEditing);

  return (
    <li className="task-container">
      <div className="left">
        <Checkbox checked={done} onChange={setDone} />
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
          defaultValue="2022-07-22"
          onChange={(e) => console.log(e.target.value)}
        />
        <OpenButton open={open} onClick={() => onOpen(open ? "" : title)} />
        {/* <IconButton Icon={CrossIcon} /> */}
      </div>

      {open && (
        <>
          <div>
            <Button
              onClick={() =>
                onSave({ title, deadline: "2012-04-23T18:25:43.511Z" })
              }
            >
              Save
            </Button>
          </div>
          <textarea
            name="Text1"
            cols="30"
            rows="3"
            defaultValue={title}
            placeholder={"Enter task title"}
            className="editable-field"
          ></textarea>
          <div className="right">
            <div className="right-controls">
              <IconButton Icon={AddFileIcon} />
              <Button>Remove</Button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
