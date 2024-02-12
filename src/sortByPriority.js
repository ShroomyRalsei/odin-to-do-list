function sortByPriority(taskA, taskB) {
  if (
    (taskA.priority == "Urgent" &&
      (taskB.priority == "Important" || taskB.priority == "Trivial")) ||
    (taskA.priority == "Important" && taskB.priority == "Trivial")
  ) {
    return -1;
  }
  if (
    (taskA.priority == "Urgent" && taskB.priority == "Urgent") ||
    (taskA.priority == "Important" && taskB.priority == "Important") ||
    (taskA.priority == "Trivial" && taskB.priority == "Trivial")
  ) {
    return 0;
  }
  if (
    (taskA.priority == "Trivial" &&
      (taskB.priority == "Important" || taskB.priority == "Urgent")) ||
    (taskA.priority == "Important" && taskB.priority == "Urgent")
  ) {
    return 1;
  }
}

export { sortByPriority };
