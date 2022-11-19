import { useState } from "react";
import { TaskList, IconButton, AddIcon } from "./components";
import "./App.less";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Todo</h1>
      <div>
        <TaskList />
        <IconButton Icon={AddIcon} />
      </div>
    </div>
  );
}

export default App;
