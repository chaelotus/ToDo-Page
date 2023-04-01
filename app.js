const $form = document.querySelector(".todos-input__form");
const todosDisplay = document.querySelector(".todos-display__container");
const $ul = document.querySelector(".todos-display__items");
const $input = document.querySelector(".todos-input__input");
const todosFilter = document.querySelector(".todos-filter");
const itemcount = document.querySelector(".todos-filter__itemcount");

//localstorage array
let todositem = [];

//item count
let count = 0;

const createItem = (content) => {
  const li_list = document.createElement("li");
  li_list.classList.add("todos-display__list");
  count++;

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

  $ul.append(li_list);
  li_list.append(label_check, deleteicon);

  //localstorage setitem
  let dateId = Date.now();
  todositem.push({ id: dateId, text: li_list.textContent });
  li_list.id = dateId;
  localStorage.setItem("todos", JSON.stringify(todositem));

  if (count > 0) {
    todosFilter.style.display = "flex";
    if (count > 1) {
      itemcount.textContent = `${count} items left`;
    }
  }

  deleteicon.onclick = (event) => {
    //console.log(event.target.parentElement);

    todositem = todositem.filter((x) => {
      console.log(x.id === event.target.parentElement.id);
      return String(x.id) !== event.target.parentElement.id;
    });
    localStorage.setItem("todos", JSON.stringify(todositem));

    itemcount.textContent =
      count > 1 ? `${--count} items left` : `${--count} item left`;
    event.target.parentElement.remove();
    console.log(count);
    if (count === 0) {
      todosFilter.style.display = "none";
    }
  };
};
if (localStorage.length > 0) {
  let setLocalItem = JSON.parse(localStorage.getItem("todos"));

  setLocalItem.map((item) => {
    createItem(item.text);
  });
}

$form.onkeydown = (event) => {
  if (event.keyCode === 13) {
    //enter key
    event.preventDefault();
    const inputValue = event.target.value;
    createItem(inputValue);

    $input.value = "";
  }
};
