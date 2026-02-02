import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App(){
  const[tasks, setTasks] = useState ([]);

  const addTask = (text) => {
    setTasks((prev) => [
      ...prev,
      {id: Date.now(), text},
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) =>t.id != id));
  };

  return(
    <div className="min-h-screen bg-gray-100 flex iteams-center justify-center">
      <div className="bg-white w-full max-w-mb [-6 rpunded-xl shadow">
        <h1 className="text-2xl font-semibold mb-1 text-center">
          TaskFlow
        </h1>
        <p className="text-sm text-grey-500 text-center mb-4">
          Simple task management app
        </p>

        <TaskInput onAdd={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </div>
    </div>
  );

}

export default App;
