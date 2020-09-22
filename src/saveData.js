import pubSub from './pubSub';
import * as getData from './getData';

function toDoItem(toDoData) {
  if (!getData.toDoItem(toDoData)) {
    /* go ahead and save it to project */
    const { projectTitle } = toDoData;
    const data = localStorage.getItem(projectTitle);
    const decryptedData = JSON.parse(data);
    const projectArray = decryptedData.toDoLists;
    projectArray.push(toDoData);
    localStorage.setItem(projectTitle, JSON.stringify(decryptedData));
    pubSub.publish('saved-to-do-item', decryptedData);
    console.log('Saved to do item');
  } else {
    console.log('Failed to save to do item');
    pubSub.publish('failed-to-save-to-do-item', toDoData);
  }
}

function project(projectData) {
  if (!getData.project(projectData)) {
    /* if project is not already saved, go ahead and save it here */
    const projectTitle = projectData.title;
    localStorage.setItem(projectTitle, JSON.stringify(projectData));
    console.log('Saved project');
  } else {
    console.log('Failed to save project');
  }
}

function overrideProjectData(projectData) {
  const projectTitle = projectData.title;
  localStorage.setItem(projectTitle, JSON.stringify(projectData));
  console.log('Saved project');
  pubSub.publish('updated-project-data', projectData);
}

export {
  toDoItem,
  project,
  overrideProjectData,
};
