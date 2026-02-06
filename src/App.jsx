import { useState , useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App(){
  const[tasks, setTasks] = useState (() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [] ; 
  });

  const[filter, setFilter] =useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask= (text) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text , completed : false},
    ]);
  };

  const toggleTask = (id) =>{
    setTasks((prev) =>
      prev.map((task) =>
        task.id == id
        ? {...task, completed: !task.completed}
        : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) =>t.id != id));
  };
  
  const filteredTasks = tasks.filter((task) => {
    if (filter == "active") return !task.completed;
    if (filter == "completed") return task.completed;
    return true; //all
  });

  return(
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-1 text-center">
          TaskFlow
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Simple task management app
        </p>

        <TaskInput onAdd={addTask} />
        <div className="flex justify-center gap-2 mb-4">
          {["all" , "active" , "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-sm rounded-full border transition
                ${
                  filter == type
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 hover:bg-grey-100"
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <TaskList 
          tasks={filteredTasks} 
          onDelete={deleteTask}
          onToggle={toggleTask}
          filter={filter}
        />
      </div>
    </div>
  );

}

export default App;
