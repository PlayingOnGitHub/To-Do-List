import {pubSub} from "./pubSub.js";

function toDoItem(toDoData) {
    let storageTitle = `${toDoData.projectName}-${toDoData.title}`;
    if (!localStorage.getItem(storageTitle)) {
        localStorage.setItem(`${storageTitle}`, JSON.stringify(toDoData) );
        pubSub.publish("added-to-do-item", toDoData );
        console.log("Save Successful");
    }
    else {
        pubSub.publish("failed-to-add-to-do-item", toDoData );
        console.log("Failed to save");
    }
}

function project(projectData) {
    
}

export {
    toDoItem,
    project
}