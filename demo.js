let tasks = [];
// Initial variables required
const UserInput = document.getElementById("UserInput");
const addButton = document.querySelector(".add");
const tasksList = document.querySelector(".task-list");
const tasksLeft = document.getElementById("left");
const remaining = tasks.filter((task) => task.done === false).length;

const img = document.querySelector(".bg-img");
console.log(`hi ${addButton.parentElement}`);

function addTask(task) {
  tasks.push(task);
  console.log(tasks.length);
  tasksLeft.innerHTML = tasks.length;
  img.classList.add("hidden");
  renderTasks(tasks);

  // showNotification("Task added Successfully");
}

function deleteTask(taskId) {
  const currentTasks = tasks.filter((task) => task.id !== Number(taskId));
  tasks = currentTasks;
  CalcRemainingTasks();
  // renderTasks(tasks);
}

// Adding tasks to Tasklist DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  // task.done = true;
  li.innerHTML = `<input type="checkbox" id="${task.id}" class="toggle" ${
    task.done ? "checked" : ""
  }/>
    <label for="${task.id}"
      >${task.title}</label
    >
    <button class="delete" id='${task.id}'><i class="fa-solid fa-trash" id="${
    task.id
  }"></i></button>`;

  tasksList.append(li);
}

// Rendering the real time tasks list
function renderTasks(tasks) {
  // if (tasks.length === 0) {
  //   img.classList.toggle("hidden");
  // }
  tasksList.innerHTML = "";
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }
    // const remaining = tasks.filter((task) => task.done === false).length;
    // tasksLeft.innerHTML = remaining;
  }
}

function CalcRemainingTasks() {
  const remainingTasks = tasks.filter((task) => task.done === false);
  let count = remainingTasks.length;
  tasksLeft.innerHTML = count;
  // if (tasks.length===0) {
  //   img.classList.remove("hidden");
  // }
}

function toggle(taskId) {
  const toggledTasks = tasks.filter((task) => task.id === Number(taskId));

  if (toggledTasks.length > 0) {
    for (let i = 0; i < toggledTasks.length; i++) {
      toggledTasks[0].done = toggledTasks[0].done ? false : true;
    }
  }
  CalcRemainingTasks();
  // renderTasks();
}

function showNotification(message) {
  alert(message);
}

// HANDLING KEY PRESSES
function handleKeyPress(e) {
  const target = e.target;
  const key = e.key;
  if (key === "Enter") {
    const text = target.value;
    console.log(text);
    if (!text) {
      showNotification("empty text !!!!!");
    } else {
      const task = {
        title: text,
        id: Number(Date.now().toString()),
        done: false,
      };
      target.value = "";
      addTask(task);
    }
    // console.log(task);
  }
}

// Handling different clicks in the application using event delegation
function handleClicks(e) {
  let alpha = e.target;
  console.log(alpha.innerHTML);
  if (alpha.classList.contains("fa-circle-plus")) {
    console.log("lciked");
    const target = UserInput;
    const text = target.value;
    console.log(text);
    if (!text) {
      showNotification("empty text !!!!!");
      return;
    } else {
      const task = {
        title: text,
        id: Number(Date.now().toString()),
        done: false,
      };
      addTask(task);
      target.value = "";

      // console.log(task);
    }
  } else if (e.target.className === "TaskBar") {
    addButton.classList.remove("hidden");
  } else if (e.target.className === "fa-solid fa-trash") {
    let id = e.target.id;
    console.log(id);
    deleteTask(id);
    renderTasks(tasks);
  } else if (e.target.className === "toggle") {
    let id = e.target.id;
    toggle(id);
  } else if (alpha.innerHTML === "Completed") {
    let tasksCompleted = tasks.filter((task) => task.done === true);
    renderTasks(tasksCompleted);
  } else if (alpha.innerHTML === "Uncomplete") {
    let tasksUncompleted = tasks.filter((task) => task.done !== true);
    renderTasks(tasksUncompleted);
  } else if (alpha.innerHTML === "All") {
    renderTasks(tasks);
  } else if (e.target.id === "completeAll") {
    for (let i = 0; i < tasks.length; i++) {
      console.log(tasks[i].id);
      tasks[i].done = true;
    }
    renderTasks(tasks);
  } else if (e.target.id === "clearCompleted") {
    tasks = tasks.filter((task) => task.done !== true);
    renderTasks(tasks);
    CalcRemainingTasks();
  }
}

// Initialization
function Initialize() {
  UserInput.addEventListener("keydown", handleKeyPress);
  document.addEventListener("click", handleClicks);
  renderTasks();
}

Initialize();
console.log("message");
