const API_URL = "https://taskflow-backend-5ma2.onrender.com/api/tasks";

// GET
export async function fetchTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

// POST
export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

// PATCH
export async function toggleTaskApi(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}

// DELETE
export async function deleteTaskApi(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
