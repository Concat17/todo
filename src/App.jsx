import { QueryClientProvider } from "@tanstack/react-query";

import { TaskList, IconButton, AddIcon } from "./components";
import { queryClient } from "./utils";

import "./App.less";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Todo</h1>
        <div>
          <TaskList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
