import pubSub from './pubSub';
import * as getData from './getData';
import * as deleteData from './deleteData';
import * as saveData from './saveData';

function toDoItem(toDoData, oldData) {
  const newTitle = toDoData.title;
  const newDescription = toDoData.description;
  const newDueDate = toDoData.dueDate;
  const newPriority = toDoData.priority;
  const oldTitle = oldData.title;
  const oldDescription = oldData.description;
  const oldDueDate = oldData.dueDate;
  const oldPriority = oldData.priority;

  const projectData = getData.project(toDoData);
  if (!projectData) {
    console.log('No project data');
    pubSub.publish('failed-to-update-to-do-item');
    return 0;
  }
  if (newTitle == oldTitle && newDescription == oldDescription && newDueDate == oldDueDate && newPriority == oldPriority) {
    pubSub.publish('nothing-to-update', toDoData);
    return 0;
  }
  if (oldTitle !== newTitle) {
    /* first go ahead and delete the old to do list.. filter it out of toDoLists array I think */
    deleteData.toDoItem(oldData, true);
    saveData.toDoItem(toDoData);
    console.log('Updated');
    return 1;
  }
  const toDoArray = projectData.toDoLists;
  const index = toDoArray.findIndex((myToDo) => {
    const toDoTitle = myToDo.title;
    if (toDoTitle === oldTitle) {
      return true;
    }
    return false;
  });
  if (index !== -1) {
    projectData.toDoLists[index] = toDoData;
    console.log('Updated');
  } else {
    console.log(projectData);
    projectData.toDoLists.push(toDoData);
    console.log('Added To Do');
  }
  saveData.overrideProjectData(projectData);
}

function project(projectData) {

}

export {
  toDoItem,
  project,
};
