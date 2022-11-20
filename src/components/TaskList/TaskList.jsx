import { useMemo, useState } from "react";

import { Task } from "./components";
import { IconButton, AddIcon } from "../../components";
import "./TaskList.less";

const tasks = ["пресс качат", "бегит", "турник", "анжуманя"];

export const TaskList = () => {
  const [isAdding, setIsAdding] = useState(false);

  const [openTask, setOpenTask] = useState("");
  return useMemo(
    () => (
      <>
        <ul>
          {tasks.map((t, i) => (
            <Task
              key={i}
              title={t}
              open={t === openTask}
              onClick={() => (setOpenTask(t), console.log(t))}
            />
          ))}
          {isAdding && <Task open editing />}
        </ul>
        {!isAdding && (
          <IconButton Icon={AddIcon} onClick={() => setIsAdding(true)} />
        )}
      </>
    ),
    [openTask]
  );
};
