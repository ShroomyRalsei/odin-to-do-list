import { task, taskList } from "./objectCreators.js";

import {
  menuDiv,
  appendFormToContent,
  emptyContent,
  emptyForm,
  populateContentContainer,
} from "./DOMManipulator";

import { updateMenu } from "./menuManipulator.js";

import {
  addToTaskListArray,
  addToTaskArray,
  currentlySelectedList,
  currentlySelectedListNumber,
  updateLocalStorage,
  taskListArray,
} from "./savedDataManipulator.js";

import { removeAllChildren } from "./removeAllChildren.js";

const formDiv = document.createElement("div");

formDiv.classList.add("form-div");

const form = document.createElement("form");

const titleLabel = document.createElement("label");

titleLabel.setAttribute("for", "title");

titleLabel.textContent = "Title";

const title = document.createElement("input");

title.type = "text";

title.placeholder = "New meeting";

title.required = "true";

title.id = "title";

const descriptionLabel = document.createElement("label");

descriptionLabel.setAttribute("for", "description");

descriptionLabel.textContent = "Description";

const description = document.createElement("textarea");

description.rows = "10";

description.columns = "60";

description.id = "description";

const taskListOnForm = document.createElement("p");

const submitBtn = document.createElement("button");

submitBtn.type = "submit";

submitBtn.textContent = "CREATE";

submitBtn.setAttribute("class", "add new-task");

submitBtn.addEventListener("click", (e) => {
  if (title.value && dueDate.value && priority.value) {
    e.preventDefault();

    const newTask = new task(
      title.value,
      description.value,
      dueDate.value,
      priority.value,
      checklist,
    );

    addToTaskArray(newTask);

    emptyForm();

    clearFormElements();

    emptyContent();

    populateContentContainer(currentlySelectedList.value);
  }
});

const submitListBtn = document.createElement("button");

submitListBtn.type = "submit";

submitListBtn.textContent = "CREATE";

submitListBtn.setAttribute("class", "add new-list");

submitListBtn.addEventListener("click", (e) => {
  if (title.value != "") {
    e.preventDefault();

    const newTaskList = new taskList(title.value, description.value);

    addToTaskListArray(newTaskList);

    emptyForm();

    updateMenu(menuDiv);

    updateMenu(menuDiv);

    clearFormElements();
  }
});

const updateListInfoBtn = document.createElement("button");

updateListInfoBtn.type = "submit";

updateListInfoBtn.textContent = "CREATE";

updateListInfoBtn.setAttribute("class", "add new-list");

updateListInfoBtn.addEventListener("click", (e) => {
  if (title.value != "") {
    e.preventDefault();

    if (taskListOnForm.textContent != "") {
      taskListArray.splice(
        currentlySelectedListNumber.value,
        1,
        new taskList(title.value, description.value, checklist),
      );

      updateLocalStorage();
    } else {
      taskListArray.splice(
        currentlySelectedListNumber.value,
        1,
        new taskList(title.value, description.value),
      );

      updateLocalStorage();
    }

    emptyContent();

    populateContentContainer(currentlySelectedList.value);

    emptyForm();

    updateMenu(menuDiv);

    updateMenu(menuDiv);

    clearFormElements();
  }
});

const dueDateLabel = document.createElement("label");

dueDateLabel.setAttribute("for", "due-date");

dueDateLabel.textContent = "Due date";

const dueDate = document.createElement("input");

dueDate.type = "date";

dueDate.required = "true";

dueDate.id = "due-date";

const priorityLabel = document.createElement("label");

priorityLabel.setAttribute("for", "priority");

priorityLabel.textContent = "Priority";

const priority = document.createElement("select");

priority.required = "true";

priority.id = "priority";

const urgentOption = document.createElement("option");

urgentOption.name = "urgent";

urgentOption.id = "urgent";

urgentOption.textContent = "Urgent";

const importantOption = document.createElement("option");

importantOption.name = "important";

importantOption.id = "important";

importantOption.textContent = "Important";

const trivialOption = document.createElement("option");

trivialOption.name = "trivial";

trivialOption.id = "trivial";

trivialOption.textContent = "Trivial";

priority.appendChild(urgentOption);

priority.appendChild(importantOption);

priority.appendChild(trivialOption);

let checklist = [];

const checklistLabel = document.createElement("label");

checklistLabel.setAttribute("for", "checklist");

checklistLabel.textContent = "Checklist:";

const checklistInput = document.createElement("input");

checklistInput.type = "text";

checklistInput.id = "checklist";

const showChecklistItems = document.createElement("p");

checklistInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    checklist.push(`${checklistInput.value}`);

    showChecklistItems.textContent = "";

    for (let i = 0; i < checklist.length; i++) {
      const checklistItem = document.createElement("button");

      checklistItem.textContent = `${checklist[i]}`;

      checklistItem.addEventListener("click", () => {
        showChecklistItems.removeChild(checklistItem);

        checklist.splice(checklist.findIndex(checklistItem.textContent), 1);

        console.log(checklist);
      });

      showChecklistItems.appendChild(checklistItem);
    }
  }
});

function createForm(
  optionalTitle = "",
  optionalDescription = "",
  optionalDueDate = "",
  optionalPriority = "",
  optionalChecklist = [],
) {
  title.value = optionalTitle;

  description.value = optionalDescription;

  dueDate.value = optionalDueDate;

  priority.value = optionalPriority;

  checklist = optionalChecklist;

  formDiv.appendChild(form);

  form.appendChild(titleLabel);

  form.appendChild(title);

  form.appendChild(descriptionLabel);

  form.appendChild(description);

  form.appendChild(submitBtn);

  form.appendChild(dueDateLabel);

  form.appendChild(dueDate);

  form.appendChild(priorityLabel);

  form.appendChild(priority);

  showChecklistItems.textContent = "";

  for (let i = 0; i < checklist.length; i++) {
    const checklistItem = document.createElement("button");

    checklistItem.textContent = `${checklist[i]}`;

    checklistItem.addEventListener("click", () => {
      showChecklistItems.removeChild(checklistItem);

      checklist.splice(checklist[i].findIndex(checklistItem.textContent), 1);

      console.log(checklist[i]);
    });

    showChecklistItems.appendChild(checklistItem);
  }

  formDiv.appendChild(checklistLabel);

  formDiv.appendChild(checklistInput);

  formDiv.appendChild(showChecklistItems);

  appendFormToContent(formDiv);
}

function showTask(
  mandatoryTitle,
  optionalDescription,
  mandatoryDueDate,
  mandatoryPriority,
  optionalChecklist = [],
) {
  const showTitle = document.createElement("p");

  const showDescription = document.createElement("p");

  const showDueDate = document.createElement("p");

  const showPriority = document.createElement("p");

  const closeBtn = document.createElement("button");

  showTitle.textContent = `Title: ${mandatoryTitle}`;

  showDescription.textContent = `Description: ${optionalDescription || "none"}`;

  showDueDate.textContent = `Due date: ${mandatoryDueDate}`;

  showPriority.textContent = `Priority: ${mandatoryPriority}`;

  closeBtn.textContent = "CLOSE";

  closeBtn.addEventListener("click", () => {
    emptyForm();

    clearFormElements();
  });

  checklist = optionalChecklist;

  formDiv.appendChild(form);

  form.appendChild(showTitle);

  form.appendChild(showDescription);

  form.appendChild(showDueDate);

  form.appendChild(showPriority);

  showChecklistItems.textContent = "";

  for (let i = 0; i < checklist.length; i++) {
    const checklistItem = document.createElement("span");

    checklistItem.textContent = `${checklist[i]}; `;

    showChecklistItems.appendChild(checklistItem);
  }

  formDiv.appendChild(checklistLabel);

  formDiv.appendChild(showChecklistItems);

  formDiv.appendChild(closeBtn);

  appendFormToContent(formDiv);
}

function createListForm(
  optionalTitle = "",
  optionalDescription = "",
  optionalTasks = [],
) {
  title.value = optionalTitle;

  description.value = optionalDescription;

  formDiv.appendChild(form);

  form.appendChild(titleLabel);

  form.appendChild(title);

  form.appendChild(descriptionLabel);

  form.appendChild(description);

  if (optionalTitle == "") {
    form.appendChild(submitListBtn);
  } else {
    checklist = optionalTasks;

    const taskListOnFormArray = [];

    for (let i = 0; i < optionalTasks.length; i++) {
      taskListOnFormArray.push(optionalTasks[i].title);
    }

    taskListOnForm.textContent = `Tasks: ${taskListOnFormArray.join("         ")}`;

    form.appendChild(taskListOnForm);

    form.appendChild(updateListInfoBtn);
  }

  appendFormToContent(formDiv);
}

function clearFormElements() {
  removeAllChildren(form);

  removeAllChildren(formDiv);

  title.value = "";

  description.value = "";

  dueDate.value = "";

  priority.value = "Trivial";

  checklist = [];

  showChecklistItems.textContent = "";

  checklistInput.value = "";
}

export { form, submitBtn, createForm, createListForm, checklist, showTask };
