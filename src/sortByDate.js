import { compareAsc } from "date-fns";

function sortByDate(taskA, taskB) {
  return compareAsc(taskA.dueDate, taskB.dueDate);
}

export { sortByDate };
