import pubSub from './pubSub';
import * as getData from './getData';

function toDoItem(toDoData, dontPubSub) {
  const data = getData.toDoItem(toDoData);
  if (data) {
    const projectArray = data.toDoLists;
    data.toDoLists = projectArray.filter((myToDo) => {
      const toDoTitle = myToDo.title;
      if (toDoTitle !== toDoData.title) {
        return true;
      }
      return false;
    });
    const projectTitle = data.title;
    localStorage.setItem(projectTitle, JSON.stringify(data));
    console.log('Deleted to do item');
    if (dontPubSub) return;
    pubSub.publish('deleted-to-do-item', toDoData);
  } else {
    pubSub.publish('failed-to-delete-to-do-item', toDoData);
    console.log('Failed to delete to do data');
  }
}

function project(projectData) {
  const data = getData.project(projectData);
  if (data) {
    /* if project is not already saved, go ahead and save it here */
    const projectTitle = data.title;
    localStorage.removeItem(projectTitle);
    console.log('Deleted project Data');
    pubSub.publish('deleted-project-data', data);
  } else {
    console.log('Failed to delete project');
    pubSub.publish('failed-to-delete-project-data', projectData);
  }
}

function checkForFinalToDoItem(toDoData) {
  const toDoProjectData = getData.project(toDoData.projectTitle);
  const toDoArray = toDoProjectData.toDoLists;
  if (toDoArray.length === 0) {
    project(toDoProjectData);
  }
}

pubSub.subscribe('deleted-to-do-item', checkForFinalToDoItem);

export {
  toDoItem,
  project,
};
