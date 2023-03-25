const $form = document.querySelector(".todos-input__form");
const todosDisplay = document.querySelector(".todos-display__container");
const $input = document.querySelector(".todos-input__input");
//li 만들어서 ul에 포함시키기
const createItem = (content) => {
  const ul = document.createElement("ul");
  ul.classList.add("todos-display__items");

  const div_list = document.createElement("div");
  div_list.classList.add("todos-display__list");

  const div_check = document.createElement("div");
  div_check.classList.add("todos-display__check");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const li = document.createElement("li");
  li.classList.add("todos-display__items-item");
  li.textContent = content;
  div_check.append(checkbox, li);
  const deleteicon = document.createElement("i");
  deleteicon.classList.add("fa-solid");
  deleteicon.classList.add("fa-xmark");

  todosDisplay.append(ul);
  ul.append(div_list);
  div_list.append(div_check, deleteicon);
};
$form.onkeydown = (event) => {
  if (event.keyCode === 13) {
    //엔터키
    event.preventDefault();
    const inputValue = event.target.value;
    createItem(inputValue);
    $input.value = "";
  }
};
