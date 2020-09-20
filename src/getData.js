import {pubSub} from "./pubSub.js";

function project(someData) {
    let projectTitle = someData.projectTitle || someData.title || someData; /* must be in this order of or statements or my function breaks */
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

function getAllProjects() {
    let projectTitles = Object.getOwnPropertyNames(localStorage);
    let projectArray = projectTitles.map((projectTitle) => {
        return JSON.parse(localStorage.getItem(projectTitle));
    });
    return projectArray;
}

export {
    project,
    toDoItem,
    getAllProjects
};