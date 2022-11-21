import { QueryClientProvider } from "@tanstack/react-query";

import { TaskList } from "./components";
import { queryClient } from "./utils";

import "./App.less";

const TITLE = "Todo";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>{TITLE}</h1>

        <TaskList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
