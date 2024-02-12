import "./style.css";

import { updateMenu } from "./menuManipulator";

import { convertDates } from "./convertDates";

import { chooseFilter } from "./chooseFilter";

import { currentlySelectedList, taskArray } from "./savedDataManipulator";

import { populateContentContainer, menuDiv } from "./DOMManipulator";

const sidebarBtn = document.querySelector(".sidebar-btn");

sidebarBtn.addEventListener("click", () => {
  updateMenu(menuDiv);
});

/* updateSelectedList(currentlySelectedListNumber); */

convertDates(taskArray);

chooseFilter();

populateContentContainer(currentlySelectedList.value);
