import {pubSub} from "./pubSub.js";
import * as saveData from "./saveData.js";
import * as deleteData from "./deleteData.js";
import * as updateData from "./updateData.js";

/* this is just me practicing higher level concepts.
   Most of this isn't really needed */

let toDoInterface = (toDoData) => ({
    type: "to-do-interface",
    save: () => toDoData.save(),
    delete: () => toDoData.delete(),
    update: () => toDoData.update()
});

let projectInterface = (projectData) => ({
    type: "project-interface",
    save: () => projectData.save(),
    delete: () => projectData.delete(),
    update: () => projectData.update()
});

let toDoItem = (title, description, dueDate, priority, projectTitle) => {
    let myProperties = {
        title,
        description,
        dueDate,
        priority,
        projectTitle,
        type: "to-do-item",
    };
    let storageMixins = {
        save() {
            saveData.toDoItem(myProperties);
        },
        delete() {
            deleteData.toDoItem(myProperties);
        },
        update() {
            updateData.toDoItem(myProperties);
        }
    };
    let implemented = toDoInterface({...storageMixins, ...myProperties});
    return Object.assign(Object.create(implemented), myProperties);
};

let project = (title) => {
    let myProperties = {
        title,
        type: "project",
        toDoLists: []
    };
    let storageMixins = {
        save() {
            saveData.project(myProperties);
        },
        delete() {
            deleteData.project(myProperties);
        },
        update() {
            updateData.project(myProperties);
        }
    };
    let implemented = projectInterface({...myProperties, ...storageMixins})
    return Object.assign(Object.create(implemented), myProperties);
}

export {
    toDoItem,
    project
};