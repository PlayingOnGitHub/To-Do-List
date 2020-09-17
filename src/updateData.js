import {pubSub} from "./pubSub.js";
import * as getData from "./getData.js";
import * as deleteData from "./deleteData.js";
import * as saveData from "./saveData.js";

function toDoItem(toDoData, oldData) {
    let newTitle = toDoData.title;
    let oldTitle = oldData.title;
    let projectData = getData.project(toDoData);
    let projectTitle = projectData.title;
    if (!projectData) {
        console.log("No project data");
        return 0;
    }
    if (oldTitle != newTitle) {
        /* first go ahead and delete the old to do list.. filter it out of toDoLists array I think */
        deleteData.toDoItem(oldData); /* error is here */
        saveData.toDoItem(toDoData);
        console.log("Updated");
        return 1;
    }
    let toDoArray = projectData.toDoLists;
    let index = toDoArray.findIndex( (toDoItem) => {
        let toDoTitle = toDoItem.title;
        if (toDoTitle == oldTitle) {
            return true;
        }
    });
    if ( index != -1 ) {
        projectData.toDoLists[index] = toDoData;
        console.log("Updated");
    } else {
        projectData.toDoLists.push(toDoData);
        console.log("Added To Do")
    }

    saveData.project(projectData);
    
    /* find the current toDoItem in toDoLists array I think and update the toDoItem in toDoLists array and then push that 
       data back up using setItem. Must have old data */

        /* can also use getData to check if it exists in the first place... That's a good idea too! Could reduce this could a good amount.
            if it turns out to exist, i will still need to find the index! */
       /* if the new title is different from the old title... delete the one with old title and push new data */
       /* if the new title is equal to the old title... update old title info */
};

function project(projectData) {

};

export {
    toDoItem,
    project
}