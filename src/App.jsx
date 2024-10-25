import { useState } from 'react'
import Create from './components/Create'
import Show from './components/Show'

const App = (props) => {
  <h1>Product Based React Project</h1>
  const [task, setTask] = useState([])
  return (
    <div>
      <Create task={task} setTask={setTask} />
      <hr />
      <Show task={task} setTask={setTask} />
    </div>
  )
}

export default App
