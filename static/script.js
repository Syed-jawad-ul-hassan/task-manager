const API_URL = "/tasks";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load all tasks
function loadTasks() {

  fetch(API_URL)
    .then((res) => res.json())
    .then((tasks) => {

      taskList.innerHTML = "";

      // Update counter
      taskCount.textContent =
        `${tasks.length} Task${tasks.length !== 1 ? "s" : ""}`;

      // Show / Hide empty message
      emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

      tasks.forEach(renderTask);

    })
    .catch((err) => {

      console.error(err);

      taskList.innerHTML =
        "<li>Could not load tasks.</li>";

    });

}

// Add task
function addTask() {

  const title = taskInput.value.trim();

  if (!title) {

    taskInput.style.border = "2px solid red";

    setTimeout(() => {
      taskInput.style.border = "1px solid #ccc";
    }, 1000);

    taskInput.focus();

    alert("Task cannot be empty");

    return;
  }

  fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title
    })

  })

    .then((res) => {

      if (!res.ok)
        throw new Error("Failed to add task");

      return res.json();

    })

    .then(() => {

      taskInput.value = "";

      taskInput.focus();

      loadTasks();

    })

    .catch((err) => {

      console.error(err);

      alert("Could not add task.");

    });

}

// Complete Task
function toggleComplete(id, currentStatus) {

  fetch(`${API_URL}/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      completed: !currentStatus
    })

  })

    .then((res) => {

      if (!res.ok)
        throw new Error("Failed to update");

      return res.json();

    })

    .then(loadTasks)

    .catch((err) => console.error(err));

}

// Edit Task
function editTask(id, oldTitle) {

  const newTitle = prompt("Edit task:", oldTitle);

  if (newTitle === null) return;

  if (!newTitle.trim()) {

    alert("Task cannot be empty");

    return;

  }

  fetch(`${API_URL}/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title: newTitle.trim()
    })

  })

    .then((res) => {

      if (!res.ok)
        throw new Error("Failed to update task");

      return res.json();

    })

    .then(loadTasks)

    .catch((err) => console.error(err));

}

// Delete Task
function deleteTask(id) {

  if (!confirm("Delete this task?"))
    return;

  fetch(`${API_URL}/${id}`, {

    method: "DELETE"

  })

    .then((res) => {

      if (!res.ok)
        throw new Error("Failed to delete");

      loadTasks();

    })

    .catch((err) => console.error(err));

}

// Display Task
function renderTask(task) {

  const li = document.createElement("li");

  li.className =
    "task-item" +
    (task.completed ? " completed" : "");

  li.style.opacity = "0";

  setTimeout(() => {

    li.style.opacity = "1";
    li.style.transition = "0.3s";

  }, 50);

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";

  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () =>
    toggleComplete(task.id, task.completed)
  );

  const title = document.createElement("span");

  title.className = "task-title";

  title.textContent = task.title;

  const editBtn = document.createElement("button");

  editBtn.className = "edit-btn";

  editBtn.textContent = "✏️";

  editBtn.title = "Edit Task";

  editBtn.addEventListener("click", () =>
    editTask(task.id, task.title)
  );

  const deleteBtn = document.createElement("button");

  deleteBtn.className = "delete-btn";

  deleteBtn.textContent = "🗑️";

  deleteBtn.title = "Delete Task";

  deleteBtn.addEventListener("click", () =>
    deleteTask(task.id)
  );

  li.appendChild(checkbox);
  li.appendChild(title);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

}