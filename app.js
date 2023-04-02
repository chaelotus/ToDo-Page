const $form = document.querySelector(".todos-input__form");
const todosDisplay = document.querySelector(".todos-display__container");
const $ul = document.querySelector(".todos-display__items");
const $input = document.querySelector(".todos-input__input");
const todosFilter = document.querySelector(".todos-filter");
const itemcount = document.querySelector(".todos-filter__itemcount");

const AllBtn = document.querySelector(".All");
const ActiveBtn = document.querySelector(".Active");
const Completed = document.querySelector(".Completed");
//localstorage array
let todositem = [];
let filtertodos = [];
//item count
let count = 0;
const createItem = (content) => {
  const li_list = document.createElement("li");
  li_list.classList.add("todos-display__list");
  let dateId = Date.now();
  li_list.id = dateId;
  count++;

  const randomnum = Math.random();
  const label_check = document.createElement("label");
  label_check.htmlFor = randomnum;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = randomnum;
  checkbox.classList.add("inputCheck");

  //checkbox change
  checkbox.addEventListener("change", (event) => {
    let checkboxParent = event.target.parentElement.parentElement;
    if (event.target.checked) {
      checkboxParent.classList.add("checked");
      count--;
    } else {
      checkboxParent.classList.remove("checked");
      count++;
    }
    itemcount.textContent =
      count > 1 ? `${count} items left` : `${count} item left`;

    localStorage.setItem(
      li_list.id,
      checkboxParent.classList.contains("checked")
    );
  });

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
  //let fixid = dateId;
  todositem.push({ id: dateId, text: li_list.textContent });
  localStorage.setItem("todos", JSON.stringify(todositem));

  if (count > 0) {
    todosFilter.style.display = "flex";
    if (count > 1) {
      itemcount.textContent = `${count} items left`;
    }
  }

  //delete click
  deleteicon.onclick = (event) => {
    todositem = todositem.filter((x) => {
      console.log(x.id, event.target.parentElement.id);
      return String(x.id) !== event.target.parentElement.id;
    });
    console.log(todositem);
    //localStorage.removeItem(event.target.parentElement.id);
    localStorage.setItem("todos", JSON.stringify(todositem));

    event.target.parentElement.remove();
    if (!event.target.parentElement.classList.contains("checked")) {
      itemcount.textContent =
        count > 1 ? `${--count} items left` : `${--count} item left`;
    } else if (event.target.parentElement.classList.contains("checked")) {
      itemcount.textContent =
        count > 1 ? `${count} items left` : `${count} item left`;
    }

    if (count === 0) {
      todosFilter.style.display = "none";
    }
  };

  filtertodos.push(li_list);
  console.log(filtertodos);

  AllBtn.onclick = () => {
    filtertodos.map((x) => (x.style.display = "flex"));
  };

  ActiveBtn.onclick = () => {
    filtertodos
      .filter((x) => x.className.includes("checked"))
      .map((x) => (x.style.display = "none"));
    filtertodos
      .filter((x) => !x.className.includes("checked"))
      .map((x) => (x.style.display = "flex"));
  };
  Completed.onclick = () => {
    filtertodos
      .filter((x) => !x.className.includes("checked"))
      .map((x) => (x.style.display = "none"));
    filtertodos
      .filter((x) => x.className.includes("checked"))
      .map((x) => (x.style.display = "flex"));
  };
};

if (localStorage.length > 0) {
  let setLocalItem = JSON.parse(localStorage.getItem("todos"));

  setLocalItem.map((item) => {
    createItem(item.text);
  });
}

$form.onkeydown = (event) => {
  //enter key
  // window.onload = () => {
  //   const checklist = querySelectorAll(".todos-display__list");
  //   console.log(checklist);
  //   checklist.forEach(li=>
  //     let setcheck = localStorage.getItem()
  //     if(li.)
  //     )
  // };
  if (event.keyCode === 13) {
    if ($input.value === "") {
      return;
    }
    event.preventDefault();
    const inputValue = event.target.value;
    createItem(inputValue);
    $input.value = "";
  }
};
