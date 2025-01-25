const modal = document.getElementById("MyModal");
const myBtn = document.getElementById("MyBtn");
const closeModalButton = document.getElementById("closeModalButton");
const todoInput = document.querySelector(".todo-input");
const todoSelect = document.getElementById("statusSelect");
const todoSubmitButton = document.getElementById("submitButton");
const todoContainer = document.getElementById("todoContainer");
const progressContainer = document.getElementById("todoProgress");
const doneContainer = document.getElementById("todoContainer3");
const blockContainer = document.getElementById("blockContainer");
let tasks = [];
let editingTaskIndex = null;

if (myBtn) {
  myBtn.onclick = () => {
    modal.style.display = "block";
    todoInput.value = "";
    todoSelect.value = "";
    editingTaskIndex = null;
  };
}

if (closeModalButton) {
  closeModalButton.onclick = () => {
    modal.style.display = "none";
  };
}

todoSubmitButton.onclick = () => {
  const taskText = todoInput.value.trim();
  const taskStatus = todoSelect.value;
  if (!taskText || !taskStatus) return alert("Бүгдийн бөгөл нүү");
  if (editingTaskIndex !== null) {
    tasks[editingTaskIndex].text = taskText;
    tasks[editingTaskIndex].status = taskStatus;
    editingTaskIndex = null;
  } else {
    tasks.push({ text: taskText, status: taskStatus });
  }
  renderTasks();
  modal.style.display = "none";
};

function renderTasks() {
  todoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  doneContainer.innerHTML = "";
  blockContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task.text, index);
    switch (task.status) {
      case "todo":
        todoContainer.appendChild(taskElement);
        break;
      case "inprogress":
        progressContainer.appendChild(taskElement);
        break;
      case "done":
        doneContainer.appendChild(taskElement);
        break;
      case "blocked":
        blockContainer.appendChild(taskElement);
        break;
    }
  });
}

function createTaskElement(text, index) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("todo-section2");
  taskElement.innerHTML = `
<div class="Dugui">
<div class="todo-comp">
<p>${text}</p>
</div>
<div class="zurag">
<img src="./Vector (1).png" alt="Edit" class="edit-btn" />
<img src="./Frame.png" alt="Delete" class="delete-btn" />
</div>
</div>`;
  taskElement.querySelector(".edit-btn").onclick = () => {
    modal.style.display = "block";
    todoInput.value = text;
    todoSelect.value = tasks[index].status;
    editingTaskIndex = index;
  };
  taskElement.querySelector(".delete-btn").onclick = () => {
    tasks.splice(index, 1);
    renderTasks();
  };
  return taskElement;
}

renderTasks();
