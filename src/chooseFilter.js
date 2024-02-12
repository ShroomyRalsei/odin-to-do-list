import { taskArray } from "./savedDataManipulator";

import { sortByDate } from "./sortByDate";

import { sortByPriority } from "./sortByPriority";

function chooseFilter(dueDateFilter) {
  if (dueDateFilter == true) {
    console.log(taskArray.value.sort(sortByDate));
  } else {
    console.log(taskArray.value.sort(sortByPriority));
  }
}

export { chooseFilter };
