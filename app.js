const $form = document.querySelector(".todos-input__form");
const todosDisplay = document.querySelector(".todos-display__container");
const $input = document.querySelector(".todos-input__input");
//li 만들어서 ul에 포함시키기
const createItem = (content) => {
  const ul = document.createElement("ul");
  ul.classList.add("todos-display__items");

  const li_list = document.createElement("li");
  li_list.classList.add("todos-display__list");

  const randomnum = Math.random();
  const label_check = document.createElement("label");
  label_check.htmlFor = randomnum;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.id = randomnum;
  const span = document.createElement("span");
  span.classList.add("todos-display__items-text");
  span.textContent = content;
  label_check.append(checkbox, span);
  const deleteicon = document.createElement("i");
  deleteicon.classList.add("fa-solid");
  deleteicon.classList.add("fa-xmark");

  todosDisplay.append(ul);
  ul.append(li_list);
  li_list.append(label_check, deleteicon);
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
