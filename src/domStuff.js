import {pubSub} from "./pubSub.js";
import * as create from "./create.js";
import * as addData from "./addData.js";
import * as updateData from "./updateData.js";
import * as getData from "./getData.js";
import * as deleteData from "./deleteData.js";
import datepicker from "js-datepicker";
import * as dropDown from "./dropDown.js";

function loadStartingPageHTML() {
    let content = document.getElementById("content");
    let wrapPage = content.appendChild(create.element("div", "class", "wrap-page"));
        let header = wrapPage.appendChild(create.element("header"));
            let banner = header.appendChild(create.element("div", "class", "banner"));
                let actionItems = banner.appendChild(create.element("div", "class", "action-items"));
                    let addItemIcon = actionItems.appendChild(create.element("div", "class", "add-item-icon"));
                        let rect1 = addItemIcon.appendChild(create.element("div", "class", "rect1"));
                        let rect2 = addItemIcon.appendChild(create.element("div", "class", "rect2"));
                    let notificationIcon = actionItems.appendChild(create.element("div", "class", "notification-icon"));
                        let notificationCircle = notificationIcon.appendChild(create.element("div", "class", "notification-circle"));
                let welcome = banner.appendChild(create.element("div", "class", "welcome"));
                    let welcomeParagraph = welcome.appendChild(create.element("p"));
                    welcomeParagraph.textContent = "To Do List";
        let belowHeaderWrapper = wrapPage.appendChild(create.element("div", "class", "below-header-wrapper"));
            let sideBar = belowHeaderWrapper.appendChild(create.element("div", "class", "side-bar"));
                let projectsHeaderWrapper = sideBar.appendChild(create.element("div", "class", "projects-header-wrapper"));
                    let projectsHeader = projectsHeaderWrapper.appendChild(create.element("h1", "class", "projects-header"));
                    projectsHeader.textContent = "Projects";
                let projectsWrapper = sideBar.appendChild(create.element("div", "class", "projects-wrapper"));
            let main = belowHeaderWrapper.appendChild(create.element("main"));
                let mainContentWrapper = main.appendChild(create.element("div", "class", "main-content-wrapper"));
                    let recentlyAdded = mainContentWrapper.appendChild(create.element("h2", "class", "recently-added"));
}

function loadAddToDoPageHTML() {
    let content = document.getElementById("content");
        let addToDoPageWrapper = content.appendChild(create.element("div", "id", "add-to-do-page-wrapper"));
            let addToDoBox = addToDoPageWrapper.appendChild(create.element("div", "class", "add-to-do-box"));
                let cancelAddToDoItem = addToDoBox.appendChild(create.element("div", "class", "cancel-add-to-do-item", "", "id", "cancel-add-to-do-item"));
                    cancelAddToDoItem.textContent = "X";
                let addTaskInputBox = addToDoBox.appendChild(create.element("input", "class", "add-task-input-box", "", "id", "add-task-input-box"));
                    addTaskInputBox.placeholder = "Add task";
                    addTaskInputBox.type = "text";
                    addTaskInputBox.maxlength = "20";
                let addDescription = addToDoBox.appendChild(create.element("textarea", "class", "add-description", "", "id", "description"));
                    addDescription.placeholder = "Add description";
                let addToDoItemButton = addToDoBox.appendChild(create.element("button", "id", "add-to-do-item-button", "", "class", "add-to-do-item-button"));
                    addToDoItemButton.textContent = "Add Task";
                let scheduleInputBox = addToDoBox.appendChild(create.element("input", "class", "schedule-input-box", "", "id", "schedule-input-box"));
                    scheduleInputBox.type = "text";
                    scheduleInputBox.placeholder = "Schedule";
                let priorityText = addToDoBox.appendChild(create.element("p", "class", "priority-text"));
                    priorityText.textContent = "Priority?";
                let priorityWrapper = addToDoBox.appendChild(create.element("div", "class", "priority-wrapper"));
                    let lowWrapper = priorityWrapper.appendChild(create.element("div", "class", "low-wrapper"));
                        let priority1 = lowWrapper.appendChild(create.element("p", "class", "priority", "", "id", "low"));
                            priority1.textContent = "Low";
                    let highWrapper = priorityWrapper.appendChild(create.element("div", "class", "high-wrapper"));
                        let priority2 = highWrapper.appendChild(create.element("p", "class", "priority", "", "id", "high"));
                            priority2.textContent = "High";
                let projectTagBox = addToDoBox.appendChild(create.element("div", "class", "project-tag-box", "", "id", "project-tag-box"));
                let projectTitleInputBox = addToDoBox.appendChild(create.element("input", "class", "project-title-input-box", "", "id", "project-title-input-box"));
                    projectTitleInputBox.type = "text";
                    projectTitleInputBox.placeholder = "Tag Project Name";


}

function addLoadStartingPageListeners() {
    let addItemIcon = document.getElementsByClassName("add-item-icon")[0];
    addItemIcon.addEventListener("click", loadAddToDoPage, true );
}

function renderToDoItems() {
    /* this will change application state */
    let bindedMaterials = this;
    let toDoItemsWrapper = this["toDoItemsWrapper"];
    let projectIconWrapper = this["projectIconWrapper"];

    let projectData = JSON.parse(projectIconWrapper.id)
    if ( toDoItemsWrapper.style.display == "" || toDoItemsWrapper.style.display == "none") {
        toDoItemsWrapper.style.display = "block";
        pubSub.publish("show-project-data", projectData ); /* where data is project data */
    }
    else {
        toDoItemsWrapper.style.display = "none";
        pubSub.publish("remove-dropdown-data", projectData);
    }
}

function getToDoItemFormData() {
    let addTaskInputBox = document.getElementById("add-task-input-box");
    let scheduleInputBox = document.getElementById("schedule-input-box");
    let lowerPriority = document.getElementById("low");
    let highPriority = document.getElementById("high");
    let projectTitleInputBox = document.getElementById("project-title-input-box");
    let addDescriptionTextArea = document.getElementById("description");

    let toDoItemTitle = addTaskInputBox.value;
    let toDoItemDueDate = scheduleInputBox.value;
    let toDoItemPriority = "";
    let toDoItemDescription = addDescriptionTextArea.value;

    if (lowerPriority.style.color == "red") {
        toDoItemPriority = "low";
    }
    else if (highPriority.style.color == "red") {
        toDoItemPriority = "high";
    }
    let toDoItemProjectTitle = projectTitleInputBox.value;
    let formData = {
        title: toDoItemTitle,
        dueDate: toDoItemDueDate,
        priority: toDoItemPriority,
        description: toDoItemDescription,
        projectTitle: toDoItemProjectTitle
    }

    return formData;

}

function addToDoItem() {
    let formData = getToDoItemFormData();
    let toDoItemProjectTitle = formData.projectTitle;
    let toDoItemDescription = formData.description;
    let toDoItemDueDate = formData.dueDate;
    let toDoItemPriority = formData.priority;
    let toDoItemTitle = formData.title;

    if (!getData.project(toDoItemProjectTitle)) {
        let newProject = addData.project(toDoItemProjectTitle);
        newProject.save();
    }

    let newToDo = addData.toDoItem(toDoItemTitle, toDoItemDescription, toDoItemDueDate, toDoItemPriority, toDoItemProjectTitle);
    newToDo.save();
}

function addToDoItemButtonListeners() {
    let addToDoItemButton = document.getElementById("add-to-do-item-button");
    addToDoItemButton.addEventListener("click", addToDoItem, true );

    let cancelAddToDoItemButton = document.getElementById("cancel-add-to-do-item");
    cancelAddToDoItemButton.addEventListener("click", returnHome, true);
}

function updateToDoItemButtonListeners(selectedToDoItemData) {
    let addToDoItemButton = document.getElementById("add-to-do-item-button");
    addToDoItemButton.addEventListener("click", updateToDoItem.bind(selectedToDoItemData), true );

    let cancelAddToDoItemButton = document.getElementById("cancel-add-to-do-item");
    cancelAddToDoItemButton.addEventListener("click", returnHome, true);
}

function mixinEditToDoPage(selectedToDoItemData) {
    let updateToDoItemButton = document.getElementById("add-to-do-item-button");
    updateToDoItemButton.textContent = "Update task";
    updateToDoItemButton.className = "update-to-do-item-button";
    let projectTagBox = document.getElementById("project-tag-box");
    projectTagBox.style.display = "none";
    let projectTitleInputBox = document.getElementById("project-title-input-box");
    projectTitleInputBox.value = selectedToDoItemData.projectTitle;
    let description = document.getElementById("description");
    description.value = selectedToDoItemData.description;
    let scheduleInputBox = document.getElementById("schedule-input-box");
    scheduleInputBox.value = selectedToDoItemData.dueDate;
    let priorityLevel = selectedToDoItemData.priority;
    if (priorityLevel == "low") {
        let priority1 = document.getElementById("low");
        priority1.style.color = "red";
        priority1.style.fontWeight = "bold";
    }
    else if (priorityLevel == "high") {
        let priority2 = document.getElementById("high");
        priority2.style.color = "red";
        priority2.style.fontWeight = "bold";
    }
    let addTaskInputBox = document.getElementById("add-task-input-box");
    addTaskInputBox.value = selectedToDoItemData.title;
}

function updateToDoItem() {
    let toDoData = getToDoItemFormData();
    let oldData = this;
    updateData.toDoItem(toDoData, oldData);
}

function editToDoItem() {
    let selectedToDoItemData = JSON.parse(this.id);
    loadAddToDoPageHTML();
    /* I know. Implements switching title to orange and black 
    but I'm just ready for the next thing.*/
    makeAddToDoPageInteractive(); 
    mixinEditToDoPage(selectedToDoItemData);
    updateToDoItemButtonListeners(selectedToDoItemData);
}

function deleteToDoItem() {
    let toDoItem = this;
    deleteData.toDoItem(toDoItem);
}

function renderProjects() {
    /* recreate projectsWrapper by deleting it */
    let oldProjectsWrapper = document.getElementsByClassName("projects-wrapper")[0];
        oldProjectsWrapper.remove();
    let sideBar = document.getElementsByClassName("side-bar")[0];
        let projectsWrapper = sideBar.appendChild(create.element("div", "class", "projects-wrapper"));
    /* end of recreating projectsWrapper */


    let projectArray = getData.getAllProjects();
    projectArray.forEach( (projectItem, currentIndex) => {
        /* display project info and title here */
        let projectDiv = projectsWrapper.appendChild(create.element("div", "class", "project"));
            let projectIconWrapper = projectDiv.appendChild(create.element("div", "class", "project-icon-wrapper", "", "id", JSON.stringify(projectItem)));
                let projectIcon = projectIconWrapper.appendChild(create.element("div", "class", "project-icon", "", "id", currentIndex));
            let projectTitleLink = projectDiv.appendChild(create.element("a", "class", "project-link", "#"));
            projectTitleLink.textContent = projectItem.title;
            let toDoItemsWrapper = projectDiv.appendChild(create.element("div", "class", "to-do-items-wrapper", "", "id", `to-do-${currentIndex}`));
        /* end of project info and title stuff */


        let toDoLists = projectItem.toDoLists;
        toDoLists.forEach( (toDoItem) => {
            let toDoLinkWrapper = toDoItemsWrapper.appendChild(create.element("div", "class", "to-do-link-wrapper"));
                let toDoLink = toDoLinkWrapper.appendChild(create.element("p", "class", "to-do-link", "#", "id", JSON.stringify(toDoItem)));
                toDoLink.textContent = toDoItem.title;
                toDoLink.addEventListener("click", editToDoItem.bind(toDoLink), true);
            /* put delete button here! */
                let deleteButton = toDoLinkWrapper.appendChild(create.element("div", "class", "delete-button"));
                deleteButton.addEventListener("click", deleteToDoItem.bind(toDoItem), true );
                    let checkLineOne = deleteButton.appendChild(create.element("div", "class", "check-line-one"));
                    let checkLineTwo = deleteButton.appendChild(create.element("div", "class", "check-line-two"));

        });

        projectIconWrapper.addEventListener("click", renderToDoItems.bind({toDoItemsWrapper, projectIconWrapper}), true );

    });
    renderDropDowns();
}

function renderDropDowns() {
    /* keep drop down in a style of display if projectName exists */
    let dropDownProjectTitles = dropDown.getActiveDropDowns();
    let dropDownElements = document.querySelectorAll(".project-icon-wrapper");
    dropDownElements = [...dropDownElements];
    /* for each project name on the actual page */
    dropDownElements.forEach( (elementItem, currentIndex) => {
        let projectDataFromPage = JSON.parse(elementItem.id);
        let projectTitleFromPage = projectDataFromPage.title;
        /* is the project title on the page the same as the project title already saved? */
        /* and for each project title saved, is the project title (saved) the same as the project title from page? */
        let doesItExist = dropDownProjectTitles.findIndex( (dropDownProjectTitle) => dropDownProjectTitle == projectTitleFromPage );
        if (doesItExist != -1) {
            let toDoItemsWrapper = document.getElementById("to-do-"+currentIndex);
            toDoItemsWrapper.style.display = "block";
        }
    });

}

function loadStartingPage() {
    loadStartingPageHTML();
    addLoadStartingPageListeners();
    renderProjects();
};

function makeAddToDoPageInteractive() {
    const picker = datepicker('#schedule-input-box', {
        formatter: (input, date, instance) => {
            const value = date.toLocaleDateString()
            input.value = value
        }
    });
    function changePriorityColor() {
        let selectedPriority = this;
        let selectedId = selectedPriority.id;
        if (selectedId == "low") {
            let high = document.getElementById("high");
            if (high.style.color == "red") {
                high.style.color = "black";
                high.style.fontWeight = "";
            }
        }
        else if (selectedId == "high") {
            let low = document.getElementById("low");
            if (low.style.color == "red") {
                low.style.color = "black";
                low.style.fontWeight = "";
            }
        }
        let priorityColor = selectedPriority.style.color;
        if (priorityColor == "black" || priorityColor == "") {
            selectedPriority.style.color = "red";
            selectedPriority.style.fontWeight = "bold";
        }
        else if (priorityColor == "red") {
            selectedPriority.style.color = "black";
            selectedPriority.style.fontWeight = "";
        }
    }

    function addPriorityClickListeners() {
        let highParagraph = document.getElementById("high");
        let lowParagraph = document.getElementById("low");
        highParagraph.addEventListener("click", changePriorityColor, true );
        lowParagraph.addEventListener("click", changePriorityColor, true );
    }

    function changeProjectTagBoxColor() {
        let projectTagBoxColor =  this.style.backgroundColor;
         if (projectTagBoxColor == "black" || projectTagBoxColor == "") {
             this.style.backgroundColor = "orange";
         }
         else if (projectTagBoxColor == "orange") {
             this.style.backgroundColor = "black";
         }
     }
     
    function changeDisplayForProjectTitleInputBox() {
        let projectTagBoxColor =  this.style.backgroundColor;
        let tagProjectNameInputBox = document.getElementById("project-title-input-box");
        if (projectTagBoxColor == "black" || projectTagBoxColor == "") {
            tagProjectNameInputBox.style.display = "none";
        }
        else if (projectTagBoxColor == "orange") {
            tagProjectNameInputBox.style.display = "block";
        }
    }
    
    function doProjectStuff() {
        changeProjectTagBoxColor.call(this);
        changeDisplayForProjectTitleInputBox.call(this)
        /* other stuff */
    }
    
    function addProjectTagBoxListeners() {
        let projectTagBox = document.getElementById("project-tag-box");
        projectTagBox.addEventListener("click", doProjectStuff.bind(projectTagBox), true);
    }

    addProjectTagBoxListeners();
    addPriorityClickListeners();
}

function loadAddToDoPage() {
    loadAddToDoPageHTML();
    makeAddToDoPageInteractive();
    addToDoItemButtonListeners();
}

function returnHome(someData) {
    renderProjects();
    let addToDoItemPageWrapper = document.getElementById("add-to-do-page-wrapper");
    addToDoItemPageWrapper.remove();
}

pubSub.subscribe("saved-to-do-item", returnHome);
pubSub.subscribe("updated-project-data", returnHome );
pubSub.subscribe("nothing-to-update", returnHome);
pubSub.subscribe("deleted-to-do-item", renderProjects);
pubSub.subscribe("deleted-project-data", renderProjects);

/* subscribe to stuff down here... and add the functions to run as a result of certain events firing.. like addToDoList.. addProject..etc
   etc etc.. updateToDoList... deleteData.data... etc etc etc */

// pubSub.subscribe("addToDoList", render );
// pubSub.subscribe("delete", someData => updateDisplay({title:""}) );

export {
    loadStartingPage
};