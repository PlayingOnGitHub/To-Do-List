import {pubSub} from "./pubSub.js";

function project(projectData) {
    let projectTitle = projectData.title || projectData;
    let data = localStorage.getItem(projectTitle);
    if ( data ) {
        let decryptedData = JSON.parse(data);
        return decryptedData;
    }
    return false;
};

function toDoItem(toDoData) {
    let projectTitle = toDoData.projectTitle;
    if (!project(projectTitle)) {
        return false;
    }

    let toDoTitle = toDoData.title;
    let data = localStorage.getItem(projectTitle);
    let decryptedData = JSON.parse(data);
    
    let toDoArray = decryptedData.toDoLists;
    let toDo = toDoArray.find( (arrayItem) => arrayItem.title == toDoTitle );
    if ( toDo ) {
        return decryptedData;
    }
    return false;
}

export {
    project,
    toDoItem
};