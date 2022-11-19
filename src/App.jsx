import { useState } from "react";
import { TaskList, IconButton, AddFileIcon } from "./components";
import "./App.less";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Todo</h1>
      <div>
        <TaskList />
        <IconButton Icon={AddFileIcon} />
      </div>
    </div>
  );
}

export default App;
