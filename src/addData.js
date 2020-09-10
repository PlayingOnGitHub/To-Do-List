import {pubSub} from "./pubSub.js";

function createToDo( date, priority, title, description, futureData ) {
    date = "trial";
    priority = "trial";
    title = "trial";
    description = "trial";
    let toDo = {
        date: date,
        priority: priority,
        title: title,
        description: description
    };
    /* keeps this fairly open to extension.. Can add another prototype to the existing prototype */
    if ( futureData != null && futureData != undefined && futureData != "" ) { /* and typeof futureData == "object" ... literal ??? */
        return Object.assign(toDo, futureData);
    }
    return toDo;
}

function saveToDoList(toDoObject) {
    if (!localStorage.getItem(toDoObject.title) ) {
        localStorage.setItem( toDoObject.title, JSON.stringify(toDoObject) );
        pubSub.publish( "addToDoList", toDoObject );
    }
    else {
        console.log("already added");
    }
};

function toDoList( date, priority, title, description, futureData ) {
    let toDoObject = createToDo( date, priority, title, description, futureData );
    saveToDoList(toDoObject);
}

export {
    toDoList
};