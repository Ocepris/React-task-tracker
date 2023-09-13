import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
import TicTacToe from "./components/TicTacToe";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
const dbUrl = "http://localhost:3001/"

function App() {

  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  const fetchTasks = async () => {
    const result = await fetch(dbUrl + "tasks")
    const data = await result.json()
    return data;
  }

  const addTask = async (task) => {

    const result = await fetch(dbUrl + "tasks", {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
      },
      body: JSON.stringify(task)
    })

    const newTask = await result.json()
    setTasks([...tasks, newTask])

  }

  const deleteTask = async (id) => {
    await fetch(dbUrl + "tasks/" + id, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const fetchTask = async (id) => {
    const res = await fetch(dbUrl + "tasks/" + id)
    const data = await res.json()

    return data
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(dbUrl + "tasks/" + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAdd(!showAdd)} showAdd={showAdd} />

        <Routes>
          <Route path="/" element={<>
            {showAdd && <AddTask onAdd={addTask}></AddTask>}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask}></Tasks>) : ("No Tasks to show :(")}

            <Footer></Footer>
          </>}
          />
          <Route path="/TicTacToe" element={<TicTacToe></TicTacToe>}></Route>

        </Routes>
      </div>
    </Router>
  );
}



export default App;
