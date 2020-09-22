function project(someData) {
  const projectTitle =
    someData.projectTitle ||
    someData.title ||
    someData; /* must be in this order of or statements or my function breaks */
  const data = localStorage.getItem(projectTitle);
  if (data) {
    const decryptedData = JSON.parse(data);
    return decryptedData;
  }
  return false;
}

function toDoItem(toDoData) {
  const { projectTitle } = toDoData;
  if (!project(projectTitle)) {
    return false;
  }

  const toDoTitle = toDoData.title;
  const data = localStorage.getItem(projectTitle);
  const decryptedData = JSON.parse(data);

  const toDoArray = decryptedData.toDoLists;
  const toDo = toDoArray.find((arrayItem) => arrayItem.title == toDoTitle);
  if (toDo) {
    return decryptedData;
  }
  return false;
}

function getAllProjects() {
  const projectTitles = Object.getOwnPropertyNames(localStorage);
  const projectArray = projectTitles.map((projectTitle) =>
    JSON.parse(localStorage.getItem(projectTitle))
  );
  return projectArray;
}

export { project, toDoItem, getAllProjects };
