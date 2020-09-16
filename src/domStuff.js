import {pubSub} from "./pubSub.js";
import * as create from "./create.js";
import * as addData from "./addData.js";
import * as deleteData from "./deleteData.js";
import * as getData from "./getData.js";

function loadStartingPage() {
    console.log(addData.project("projectName"));
    console.log(addData.toDoItem("toDoTitle", "coolDescription", "noDueDate", "alwaysAPriority", "projectName"));
    console.log(addData.toDoItem("newToDo", "coolDescription", "noDueDate", "alwaysAPriority", "projectName"));
};

function renderProjects(updatedProjectInformationFromDeletedProjectAddedProjectOrUpdatedProject) {
    console.log("rendering");
    console.log(updatedInformation);
};

function renderCurrentProject(projectInformation) {
    /* display to do's and their details for this project... project name.. etc... 
       todos could have a brief description across a single line.. stacked vertically */
       
}

function displayToDoListDropDownFromSelectedProject(dataFromProjectThatWasClicked) {

};

/* subscribe to stuff down here... and add the functions to run as a result of certain events firing.. like addToDoList.. addProject..etc
   etc etc.. updateToDoList... deleteData.data... etc etc etc */

// pubSub.subscribe("addToDoList", render );
// pubSub.subscribe("delete", someData => updateDisplay({title:""}) );

export {
    loadStartingPage
};