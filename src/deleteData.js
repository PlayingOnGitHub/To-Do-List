import {pubSub} from "./pubSub.js";
import * as getData from "./getData.js";

function toDoItem(toDoData) {
    if (getData.toDoItem(toDoData)) {
        let projectTitle = toDoData.projectTitle;
        let data = localStorage.getItem(projectTitle);
        let decryptedData = JSON.parse(data);
        let projectArray = decryptedData.toDoLists;
        decryptedData.toDoLists = projectArray.filter( (toDoItem) => {
            let toDoTitle = toDoItem.title;
            if (toDoTitle != toDoData.title) {
                return true;
            }
        });
        localStorage.setItem(projectTitle, JSON.stringify(decryptedData));
        console.log("Deleted to do item");
        pubSub.publish("deleted-to-do-item", toDoData);
    }
    else {
        pubSub.publish("failed-to-delete-to-do-item", toDoData );
    }
}

function project(projectData) {
    if (getData.project(projectData) ) {
        /* if project is not already saved, go ahead and save it here */
        let projectTitle = projectData.title;
        localStorage.removeItem(projectTitle);
        console.log("Deleted project Data");
        pubSub.publish("deleted-project-data", projectData);
    }
    else {
        console.log("Failed to delete project");
        pubSub.publish("failed-to-delete-project-data", projectData);
    }
}

export {
    toDoItem,
    project
};