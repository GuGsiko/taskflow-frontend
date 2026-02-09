import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import {
  fetchTasks,
  createTask,
  toggleTaskApi,
  deleteTaskApi,
} from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // LOAD TASKS FROM BACKEND
  useEffect(() => {
    fetchTasks()
      .then((data) => {
        console.log("FROM BACKEND:", data);

        const mappedTasks = data.map((task) => ({
          id: task.id,
          text: task.title,
          completed: task.status === "done",
        }));

        setTasks(mappedTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tasks", err);
        setLoading(false);
      });
  }, []);

  // ADD TASK
  const addTask = async (text) => {
    try {
      const newTask = await createTask(text);

      const mapped = {
        id: newTask.id,
        text: newTask.title,
        completed: newTask.status === "done",
      };

      setTasks((prev) => [...prev, mapped]);
    } catch (err) {
      console.error(err);
    }
  };

  // TOGGLE TASK
  const toggleTask = async (id) => {
    try {
      const updated = await toggleTaskApi(id);

      const mapped = {
        id: updated.id,
        text: updated.title,
        completed: updated.status === "done",
      };

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? mapped : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await deleteTaskApi(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // FILTER
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-1 text-center">
          TaskFlow
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Simple task management app
        </p>

        <TaskInput onAdd={addTask} />

        <p className="text-sm text-gray-500 text-center mb-2">
          Active tasks: <span className="font-medium">{activeCount}</span>
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-sm rounded-full border transition
                ${
                  filter === type
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {tasks.some((t) => t.completed) && (
          <button
            onClick={clearCompleted}
            className="text-xs text-red-500 hover:underline mb-3 block mx-auto"
          >
            Clear completed tasks
          </button>
        )}

        {loading && (
          <p className="text-center text-sm text-gray-400">
            Loading tasks from server...
          </p>
        )}

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
