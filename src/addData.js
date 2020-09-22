import pubSub from './pubSub';
import * as saveData from './saveData';
import * as deleteData from './deleteData';
import * as updateData from './updateData';

/* this is just me practicing higher level concepts.
   Most of this isn't really needed */

const toDoInterface = (toDoData) => ({
  type: 'to-do-interface',
  save: () => toDoData.save(),
  delete: () => toDoData.delete(),
  update: () => toDoData.update(),
});

const projectInterface = (projectData) => ({
  type: 'project-interface',
  save: () => projectData.save(),
  delete: () => projectData.delete(),
  update: () => projectData.update(),
});

const toDoItem = (title, description, dueDate, priority, projectTitle) => {
  const myProperties = {
    title,
    description,
    dueDate,
    priority,
    projectTitle,
    type: 'to-do-item',
  };
  const storageMixins = {
    save() {
      saveData.toDoItem(myProperties);
    },
    delete() {
      deleteData.toDoItem(myProperties);
    },
    update() {
      updateData.toDoItem(myProperties);
    },
  };
  const implemented = toDoInterface({ ...storageMixins, ...myProperties });
  return Object.assign(Object.create(implemented), myProperties);
};

const project = (title) => {
  const myProperties = {
    title,
    type: 'project',
    toDoLists: [],
  };
  const storageMixins = {
    save() {
      saveData.project(myProperties);
    },
    delete() {
      deleteData.project(myProperties);
    },
    update() {
      updateData.project(myProperties);
    },
  };
  const implemented = projectInterface({ ...myProperties, ...storageMixins });
  return Object.assign(Object.create(implemented), myProperties);
};

export {
  toDoItem,
  project,
};
