import { format } from "date-fns";

import { updateMenu } from "./menuManipulator";

import {
  taskListArray,
  dueDateSelectValue,
  currentlySelectedList,
  currentlySelectedListNumber,
  taskArray,
  prioritySelectValue,
  removeFromTaskArray,
  removeFromTaskListArray,
  updateLocalStorage,
} from "./savedDataManipulator";

import { createListForm, createForm, showTask } from "./formCreator";

import { chooseFilter } from "./chooseFilter";

const menuDiv = document.querySelector(".menu");

function populateTaskListsList(list) {
  list.textContent = "";

  for (let i = 0; i < taskListArray.length; i++) {

    const listItem = document.createElement("li");

    const listItemButton = document.createElement("button");

    listItemButton.type = "button";

    listItemButton.innerHTML = `<h3>${taskListArray[i].title}</h3>`;

    listItemButton.addEventListener("click", () => {
      emptyContent();

      currentlySelectedListNumber.value = i;

      populateContentContainer(currentlySelectedList.value);
    });

    listItem.appendChild(listItemButton);

    list.appendChild(listItem);
  }
}

const contentContainer = document.querySelector(".content");

function populateContentContainer(taskList) {
  chooseFilter(dueDateSelectValue.value);

  const titleContainer = document.createElement("div");

  titleContainer.classList.add("list-title");

  const contentHeader = document.createElement("h2");

  contentHeader.textContent = `${taskList.title}`;

  console.log(taskList);

  const editListBtn = document.createElement("button");

  editListBtn.classList.add("edit-btn");

  editListBtn.type = "button";

  editListBtn.innerHTML = `<span class="material-symbols-outlined">edit</span`;

  editListBtn.addEventListener("click", () => {
    createListForm(
      currentlySelectedList.value.title,
      currentlySelectedList.value.description,
      currentlySelectedList.value.tasks,
    );
  });

  const deleteListBtn = document.createElement("button");

  deleteListBtn.classList.add("delete-btn");

  deleteListBtn.innerHTML = `<span class="material-symbols-outlined">delete</span`;

  deleteListBtn.addEventListener("click", () => {
    emptyContent();

    removeFromTaskListArray(currentlySelectedListNumber.value);

    updateMenu(menuDiv);

    updateMenu(menuDiv);

    currentlySelectedListNumber.value -= 1;

    populateContentContainer(currentlySelectedList.value);
  });

  titleContainer.appendChild(contentHeader);

  titleContainer.appendChild(editListBtn);

  titleContainer.appendChild(deleteListBtn);

  const sortLabel = document.createElement("label");

  sortLabel.setAttribute("for", "sort");

  sortLabel.textContent = "Sort by:";

  const sort = document.createElement("select");

  sort.id = "sort";

  sort.addEventListener("change", (e) => {
    console.log(e.target.value);

    if (e.target.value == "Priority") {
      dueDateSelectValue.value = false;

      prioritySelectValue.value = true;

      updateLocalStorage();
    } else {
      dueDateSelectValue.value = true;

      prioritySelectValue.value = false;

      updateLocalStorage();
    }
    emptyContent();

    populateContentContainer(currentlySelectedList.value);
  });

  const dueDateOption = document.createElement("option");

  dueDateOption.name = "due-date";

  dueDateOption.id = "due-date";

  dueDateOption.textContent = "Due date";

  dueDateOption.selected = dueDateSelectValue.value;

  const priorityOption = document.createElement("option");

  priorityOption.name = "priority";

  priorityOption.id = "priority";

  priorityOption.textContent = "Priority";

  priorityOption.selected = prioritySelectValue.value;

  sort.appendChild(dueDateOption);

  sort.appendChild(priorityOption);

  titleContainer.appendChild(sortLabel);

  titleContainer.appendChild(sort);

  contentContainer.appendChild(titleContainer);

  const descriptionContainer = document.createElement("div");

  descriptionContainer.classList.add("list-description");

  const descriptionTxt = document.createElement("h2");

  descriptionTxt.textContent = `${taskList.description}`;

  descriptionContainer.appendChild(descriptionTxt);

  contentContainer.appendChild(descriptionContainer);

  const addNewTaskBtn = document.createElement("button");

  addNewTaskBtn.type = "button";

  addNewTaskBtn.setAttribute("class", "add new-task");

  addNewTaskBtn.textContent = "ADD NEW TASK";

  addNewTaskBtn.addEventListener("click", () => {
    createForm();
  });

  contentContainer.appendChild(addNewTaskBtn);

  const taskContainer = document.createElement("div");

  taskContainer.classList.add("task-container");

  for (let i = 0; i < taskList.tasks.length; i++) {
    console.log(taskList.tasks[i]);

    const taskTable = document.createElement("table");

    taskTable.setAttribute("class", `task ${taskList.tasks[i].priority}`);

    taskTable.innerHTML = `<colgroup><col span="4" style="background-color:${taskList.tasks[i].bgColor};"></colgroup>`;

    const taskTableRow = document.createElement("tr");

    const titleCell = document.createElement("td");

    const titleCellBtn = document.createElement("button");

    titleCellBtn.textContent = `${taskList.tasks[i].title}`;

    titleCellBtn.addEventListener("click", () => {
      showTask(
        taskArray.value[i].title,
        taskArray.value[i].description,
        format(taskArray.value[i].dueDate, "yyyy-MM-dd"),
        taskArray.value[i].priority,
        taskArray.value[i].checklist,
      );
    });

    titleCell.classList.add("show-task-btn");

    titleCell.appendChild(titleCellBtn);

    taskTableRow.appendChild(titleCell);

    const dueDateCell = document.createElement("td");

    dueDateCell.textContent = `${format(taskList.tasks[i].dueDate, "yyyy-MMM-dd")}`;

    taskTableRow.appendChild(dueDateCell);

    const editCell = document.createElement("td");

    const editCellBtn = document.createElement("button");

    editCellBtn.classList.add("edit-btn");

    editCellBtn.innerHTML = `<span class="material-symbols-outlined">edit</span`;

    editCellBtn.addEventListener("click", () => {
      createForm(
        taskArray.value[i].title,
        taskArray.value[i].description,
        format(taskArray.value[i].dueDate, "yyyy-MM-dd"),
        taskArray.value[i].priority,
        taskArray.value[i].checklist,
      );

      taskContainer.removeChild(taskTable);

      removeFromTaskArray(i);
    });

    editCell.appendChild(editCellBtn);

    taskTableRow.appendChild(editCell);

    const deleteCell = document.createElement("td");

    const deleteCellBtn = document.createElement("button");

    deleteCellBtn.classList.add("delete-btn");

    deleteCellBtn.innerHTML = `<span class="material-symbols-outlined">delete</span`;

    deleteCellBtn.addEventListener("click", () => {
      taskContainer.removeChild(taskTable);

      removeFromTaskArray(i);
    });

    deleteCell.appendChild(deleteCellBtn);

    taskTableRow.appendChild(deleteCell);

    taskTable.appendChild(taskTableRow);

    taskContainer.appendChild(taskTable);
  }
  contentContainer.appendChild(taskContainer);
}

const formContainer = document.querySelector(".form-container");

function emptyForm() {
  formContainer.textContent = "";
}

function emptyContent() {
  contentContainer.textContent = "";
}

function appendFormToContent(form) {
  const formPresence = isFormPresent();

  if (formPresence == "nope") {
    formContainer.appendChild(form);
  }
}

function isFormPresent() {
  if (formContainer.textContent == "") {
    return "nope";
  }
}

function toggleMenuAppearance(menu) {
  contentContainer.classList.toggle("menu-active");

  formContainer.classList.toggle("menu-active");

  menu.classList.toggle("visible");
}

export {
  toggleMenuAppearance,
  appendFormToContent,
  populateTaskListsList,
  populateContentContainer,
  emptyForm,
  emptyContent,
  menuDiv,
};
