const $form = document.querySelector(".todos-input__form");
const todosDisplay = document.querySelector(".todos-display__container");
const $input = document.querySelector(".todos-input__input");
//li 만들어서 ul에 포함시키기
const createItem = (content) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const ul = document.createElement("ul");
  ul.classList.add("todos-display__items");
  const li = document.createElement("li");
  li.classList.add("todos-display__items-item");
  li.textContent = content;
  todosDisplay.append(ul);
  const div = document.createElement("div");
  div.classList.add("todos-display__list");
  ul.append(div);
  div.append(checkbox, li);
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
