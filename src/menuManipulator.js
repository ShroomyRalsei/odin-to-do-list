import Barbarian from "./barbarian.jpg";

import {
  toggleMenuAppearance,
  populateTaskListsList,
} from "./DOMManipulator";

import { createListForm } from "./formCreator";

function updateMenu(menu) {
  if (checkIfMenuActive(menu) === "inactive") {
    createMenu(menu);
  } else {
    clearMenu(menu);
  }
}

function createMenu(menu) {
  toggleMenuAppearance(menu);

  const userDiv = document.createElement("div");

  userDiv.classList.add("user");

  const profilePicture = new Image();

  profilePicture.src = Barbarian;

  const userName = document.createElement("h3");

  userName.textContent = "Platanomaduro";

  userDiv.appendChild(profilePicture);

  userDiv.appendChild(userName);

  menu.appendChild(userDiv);

  const addNewListBtn = document.createElement("button");

  addNewListBtn.setAttribute("type", "button");

  addNewListBtn.setAttribute("class", "add new-list");

  addNewListBtn.textContent = "ADD NEW LIST";

  addNewListBtn.addEventListener("click", () => {
    createListForm();
  });

  menu.appendChild(addNewListBtn);

  // confusing ik but funny name lol
  const tasksListsList = document.createElement("ul");

  populateTaskListsList(tasksListsList);

  menu.appendChild(tasksListsList);
}

function checkIfMenuActive(menu) {
  if (menu.textContent === "") {
    return "inactive";
  }
}

function clearMenu(menu) {
  menu.textContent = "";
  toggleMenuAppearance(menu);
}

export { createMenu, updateMenu, clearMenu, checkIfMenuActive };
