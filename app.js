const form = document.querySelector(".todos-input__form");
const todosDisplay = document.querySelector(".todos-display__container");
const ul = document.querySelector(".todos-display__items");
const input = document.querySelector(".todos-input__input");
const todosFilter = document.querySelector(".todos-filter");
const itemcount = document.querySelector(".todos-filter__itemcount");

const AllBtn = document.querySelector(".All");
const ActiveBtn = document.querySelector(".Active");
const CompletedBtn = document.querySelector(".Completed");

//localstorage data
let todos = [];
let filter = "all";
let count;
const updateItemCount = (count) => {
  count = todos.filter((todo) => !todo.checked).length;
  itemcount.textContent =
    count > 1 ? `${count} items left` : `${count} item left`;
};

const saveTodosLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const createToDoElement = ({ id, text, checked }) => {
  // li 생성
  const li = document.createElement("li");
  li.classList.add("todos-display__list");
  li.id = id;

  // checkbox 생성
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("inputCheck");
  checkbox.checked = checked;
  checkbox.id = "myCheckbox";

  const span = document.createElement("span");
  span.classList.add("todos-display__items-text");
  span.textContent = text;

  const label = document.createElement("label");
  label.append(checkbox, span);
  label.htmlFor = "myCheckbox";

  // x icon 생성
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-xmark");

  ul.append(li);
  li.append(label, deleteIcon);

  updateItemCount();
  return li;
};

const renderTodos = () => {
  ul.innerHTML = "";
  const active = todos.filter((todo) => !todo.checked);
  console.log(active);
  todos
    .filter((todo) => {
      if (filter === "all") {
        return true;
      }
      return filter === "completed" ? todo.checked : !todo.checked;
    })
    .forEach((todo) => {
      const todoElement = createToDoElement(todo);
      todoElement.style.display = "flex";
      updateItemCount();
    });
  if (todos.length > 0) {
    todosFilter.style.display = "flex";
  } else {
    todosFilter.style.display = "none";
  }
};
const addTodo = (text) => {
  const todo = {
    id: Date.now(),
    text,
    checked: false,
  };
  todos.push(todo);
  saveTodosLocalStorage();
  renderTodos();
};
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodosLocalStorage();
  renderTodos();
};

form.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    const inputValue = input.value.trim();
    if (inputValue) {
      event.preventDefault();
      addTodo(inputValue);
      input.value = "";
    }
  }
});
AllBtn.addEventListener("click", () => {
  filter = "all";
  renderTodos();
});
ActiveBtn.addEventListener("click", () => {
  filter = "active";
  renderTodos();
});
CompletedBtn.addEventListener("click", () => {
  filter = "completed";
  renderTodos();
});
ul.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (event.target.classList.contains("fa-xmark")) {
    deleteTodo(Number(li.id));
  }
});
ul.addEventListener("change", (event) => {
  const li = event.target.closest("li");
  const todo = todos.find((todo) => todo.id === Number(li.id));
  todo.checked = event.target.checked;
  saveTodosLocalStorage();
  updateItemCount();
});

// 로컬스토리지에 값이 있으면 새로고침해도 유지
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

renderTodos();
