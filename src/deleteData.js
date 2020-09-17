import {pubSub} from "./pubSub.js";
import * as getData from "./getData.js";

function toDoItem(toDoData) {
    let data = getData.toDoItem(toDoData);
    if (data) {
        let projectArray = data.toDoLists;
        data.toDoLists = projectArray.filter( (toDoItem) => {
            let toDoTitle = toDoItem.title;
            if (toDoTitle != toDoData.title) {
                return true;
            }
        });
        let projectTitle = data.title;
        localStorage.setItem(projectTitle, JSON.stringify(data));
        console.log("Deleted to do item");
        pubSub.publish("deleted-to-do-item", toDoData);
    }
    else {
        pubSub.publish("failed-to-delete-to-do-item", toDoData );
        console.log("Failed to delete to do data")
    }
}

function project(projectData) {
    let data = getData.project(projectData);
    if (data) {
        /* if project is not already saved, go ahead and save it here */
        let projectTitle = data.title;
        localStorage.removeItem(projectTitle);
        console.log("Deleted project Data");
        pubSub.publish("deleted-project-data", data);
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