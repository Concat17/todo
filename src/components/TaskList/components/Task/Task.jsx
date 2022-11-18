import { useState } from "react";
import classNames from "classnames";

import { Checkbox } from "../../../Checkbox";
import "./Task.less";

export const Task = ({ title }) => {
  const [done, setDone] = useState(false);

  return (
    <li className="task-container">
      <div className="left">
        <Checkbox checked={done} onChange={setDone} />
      </div>
      <span className={classNames({ strike: done })}>{title}</span>
      <div className="right">
        <span>21.11.2022</span>
      </div>
    </li>
  );
};
