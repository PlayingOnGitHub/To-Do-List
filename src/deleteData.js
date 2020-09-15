import {pubSub} from "./pubSub.js";
import * as getData from "./getData.js";

function toDoItem(toDoData) {
    let storageTitle = `${toDoData.projectName}-${toDoData.title}`;
    if (!localStorage.getItem(storageTitle)) {
        pubSub.publish("failed-to-delete-to-do-item", toDoData );
        console.log("Failed to delete to do item. Item may already be deleted");
    }
    else {
        localStorage.removeItem(storageTitle);
        pubSub.publish("deleted-to-do-item", toDoData );
        console.log("Deleted to do item");
    }
};

function project(projectData) {
    
}

export {
    toDoItem,
    project
};