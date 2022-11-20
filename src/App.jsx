import { useState } from "react";
import { TaskList, IconButton, AddIcon } from "./components";

import "./App.less";

function App() {
  return (
    <div className="App">
      <h1>Todo</h1>
      <div>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
