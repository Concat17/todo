import { useState } from 'react' 
import {TaskList} from "./components"
import './App.less'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
       <h1>Todo</h1>
       <div>
       <TaskList/>
       </div>
    </div>
  )
}

export default App
