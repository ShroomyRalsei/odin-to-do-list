import { convertDates } from "./convertDates";

const task = {
  title: "Pet my cat",
  description: "random text lol",
  dueDate: "2024-01-04",
  completeStatus: false,
  priority: "Trivial",
  checklist: ["Get grooming thingy", "clean cat"],
  bgColor: 'Green'
};

const taskList = {
  title: "Pending tasks",
  description: "Do your thing lol",
  tasks: [task],
};

const dueDateSelectValue = {
  currentValue: JSON.parse(localStorage.getItem("dueDateSelectValue")) || true,

  get value() {
    return this.currentValue;
  },
  set value(boolean) {
    this.currentValue = boolean;
  },
};

const prioritySelectValue = {
  currentValue:
    JSON.parse(localStorage.getItem("prioritySelectValue")) || false,

  get value() {
    return this.currentValue;
  },
  set value(boolean) {
    this.currentValue = boolean;
  },
};

const taskListArray = JSON.parse(localStorage.getItem("taskListArray")) || [
  taskList,
];

const currentlySelectedListNumber = {
  currentValue:
    JSON.parse(localStorage.getItem("currentlySelectedListNumber")) || 0,

  get value() {
    return this.currentValue;
  },
  set value(indexNumber) {
    if (indexNumber <= 0) {
      this.currentValue = 0;
    } else {
      this.currentValue = indexNumber;
    }

    updateLocalStorage();
  },
};

const currentlySelectedList = {
  get value() {
    return taskListArray[currentlySelectedListNumber.value];
  },
};

const taskArray = {
  get value() {
    return currentlySelectedList.value.tasks;
  },
};

for (let i = 0; i < taskArray.value.length; i++) {
  if (taskArray.value[i].dueDate.length > 10) {
    taskArray.value[i].dueDate = taskArray.value[i].dueDate.slice(0,10);
  }
}

function updateLocalStorage() {
  localStorage.setItem("taskListArray", JSON.stringify(taskListArray));

  localStorage.setItem(
    "prioritySelectValue",
    JSON.stringify(prioritySelectValue),
  );

  localStorage.setItem(
    "dueDateSelectValue",
    JSON.stringify(dueDateSelectValue),
  );

  localStorage.setItem(
    "currentlySelectedListNumber",
    JSON.stringify(currentlySelectedListNumber.value),
  );
}

function addToTaskListArray(list) {
  taskListArray.push(list);

  updateLocalStorage();
}

function removeFromTaskListArray(index) {
  if (taskListArray.length !== 1) {
    taskListArray.splice(index, 1);

    updateLocalStorage();
  } else {
    alert("This is the last list!");
  }
}

function addToTaskArray(individualTask) {
  currentlySelectedList.value.tasks.push(individualTask);

  convertDates(taskArray.value);

  updateLocalStorage();
}

function removeFromTaskArray(index) {
  taskArray.value.splice(index, 1);

  updateLocalStorage();
}

export {
  taskListArray,
  addToTaskArray,
  addToTaskListArray,
  taskArray,
  currentlySelectedList,
  currentlySelectedListNumber,
  prioritySelectValue,
  dueDateSelectValue,
  removeFromTaskListArray,
  removeFromTaskArray,
  updateLocalStorage,
};
