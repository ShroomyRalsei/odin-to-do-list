function taskList(title, description, tasks = []) {
  this.title = title;
  this.description = description;
  this.tasks = tasks;
}

function task(title, description, dueDate, priority, checklist) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.completeStatus = false;
  this.priority = priority;
  this.checklist = checklist;
  if (priority === 'Urgent') {
    this.bgColor = 'Red';
  } else if (priority === 'Important') {
    this.bgColor = 'Yellow';
  } else {
    this.bgColor = 'Green';
  }
}

export { task, taskList };
