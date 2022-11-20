import { useMemo, useState } from "react";

import { Task } from "./components";
import { IconButton, AddIcon } from "../../components";
import "./TaskList.less";

export const TaskList = () => {
  const [tasks, setTasks] = useState([
    "пресс качат",
    "бегит",
    "турник",
    "анжуманя",
  ]);

  const [openTask, setOpenTask] = useState("");

  return (
    <>
      <ul>
        {tasks.map((t, i) => (
          <Task
            key={i}
            title={t}
            open={t === openTask}
            onOpen={(title) => {
              setOpenTask(title);
            }}
          />
        ))}
        {openTask === "adding" && (
          <Task
            open={openTask === "adding"}
            onSave={(t) => {
              setTasks([...tasks, t]);
            }}
          />
        )}
      </ul>
      {!(openTask === "adding") && (
        <IconButton Icon={AddIcon} onClick={() => setOpenTask("adding")} />
      )}
    </>
  );
};
