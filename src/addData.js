import {pubSub} from "./pubSub.js";
import * as saveData from "./saveData.js";
import * as deleteData from "./deleteData.js"

/* this is just me practicing higher level concepts.
   Most of this isn't really needed */

let toDoInterface = (toDoData) => ({
    type: "to-do-interface",
    save: () => toDoData.save(toDoData),
    delete: () => toDoData.delete(toDoData)
});

let projectInterface = (projectData) => ({
    type: "project-interface",
    save: () => projectData.save(projectData),
    delete: () => projectData.delete(projectData)
});

let toDoItem = (title, description, dueDate, priority, projectName) => {
    let myProperties = {
        title,
        description,
        dueDate,
        priority,
        projectName,
        type: "to-do-item",
        save(toDoData) {
            saveData.toDoItem(myProperties);
        },
        delete(toDoData) {
            deleteData.toDoItem(toDoData);
        }
    }
    let implemented = toDoInterface(myProperties);
    let newProto = Object.create(implemented);
    return Object.assign( newProto, 
        {
            title, 
            description, 
            dueDate, 
            priority, 
            projectName 
        }
    );
};

let project = (name) => {
    let myProperties = {
        name: name,
        type: "project",
        toDoLists: [],
        save(projectData) {
            saveData.project(projectData);
        },
        delete(projectData) {
            deleteData.project(projectData);
        }
    }
    let implemented = projectInterface(myProperties);
    let newProto = Object.create(implemented);
    return Object.assign( newProto, {name}, myProperties.toDoLists );
}

export {
    toDoItem
};