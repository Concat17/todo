import { Task } from "./components";
import "./TaskList.less";

const tasks = ["пресс качат", "бегит", "турник", "анжуманя"];

export const TaskList = () => {
  return (
    <ul>
      {tasks.map((t) => (
        <Task key={t} title={t} />
      ))}
    </ul>
  );
};
