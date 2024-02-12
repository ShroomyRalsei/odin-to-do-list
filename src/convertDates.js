function convertDates(taskArray) {
  for (let i = 0; i < taskArray.length; i++) {
    if (typeof taskArray[i].dueDate === "string") {
      const dateArray = taskArray[i].dueDate.split("-");

      taskArray[i].dueDate = new Date(
        dateArray[0],
        dateArray[1] - 1,
        dateArray[2],
      );
    }
  }
}

export { convertDates };
