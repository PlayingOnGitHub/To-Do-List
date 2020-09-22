import datepicker from 'js-datepicker';
import pubSub from './pubSub';
import * as create from './create';
import * as addData from './addData';
import * as updateData from './updateData';
import * as getData from './getData';
import * as deleteData from './deleteData';
import * as dropDown from './dropDown';

function loadStartingPageHTML() {
  const content = document.getElementById('content');
  const wrapPage = content.appendChild(create.element('div', 'class', 'wrap-page'));
  const header = wrapPage.appendChild(create.element('header'));
  const banner = header.appendChild(create.element('div', 'class', 'banner'));
  const actionItems = banner.appendChild(create.element('div', 'class', 'action-items'));
  const addItemIcon = actionItems.appendChild(create.element('div', 'class', 'add-item-icon'));
  addItemIcon.appendChild(create.element('div', 'class', 'rect1'));
  addItemIcon.appendChild(create.element('div', 'class', 'rect2'));
  const notificationIcon = actionItems.appendChild(create.element('div', 'class', 'notification-icon'));
  notificationIcon.appendChild(create.element('div', 'class', 'notification-circle'));
  const welcome = banner.appendChild(create.element('div', 'class', 'welcome'));
  const welcomeParagraph = welcome.appendChild(create.element('p'));
  welcomeParagraph.textContent = 'To Do List';
  const belowHeaderWrapper = wrapPage.appendChild(create.element('div', 'class', 'below-header-wrapper'));
  const sideBar = belowHeaderWrapper.appendChild(create.element('div', 'class', 'side-bar'));
  const projectsHeaderWrapper = sideBar.appendChild(create.element('div', 'class', 'projects-header-wrapper'));
  const projectsHeader = projectsHeaderWrapper.appendChild(create.element('h1', 'class', 'projects-header'));
  projectsHeader.textContent = 'Projects';
  sideBar.appendChild(create.element('div', 'class', 'projects-wrapper'));
  const main = belowHeaderWrapper.appendChild(create.element('main'));
  const mainContentWrapper = main.appendChild(create.element('div', 'class', 'main-content-wrapper'));
  mainContentWrapper.appendChild(create.element('h2', 'class', 'recently-added'));
}

function loadAddToDoPageHTML() {
  const content = document.getElementById('content');
  const addToDoPageWrapper = content.appendChild(create.element('div', 'id', 'add-to-do-page-wrapper'));
  const addToDoBox = addToDoPageWrapper.appendChild(create.element('div', 'class', 'add-to-do-box'));
  const cancelAddToDoItem = addToDoBox.appendChild(create.element('div', 'class', 'cancel-add-to-do-item', '', 'id', 'cancel-add-to-do-item'));
  cancelAddToDoItem.textContent = 'X';
  const addTaskInputBox = addToDoBox.appendChild(create.element('input', 'class', 'add-task-input-box', '', 'id', 'add-task-input-box'));
  addTaskInputBox.placeholder = 'Add task';
  addTaskInputBox.type = 'text';
  addTaskInputBox.maxlength = '20';
  const addDescription = addToDoBox.appendChild(create.element('textarea', 'class', 'add-description', '', 'id', 'description'));
  addDescription.placeholder = 'Add description';
  const addToDoItemButton = addToDoBox.appendChild(create.element('button', 'id', 'add-to-do-item-button', '', 'class', 'add-to-do-item-button'));
  addToDoItemButton.textContent = 'Add Task';
  const scheduleInputBox = addToDoBox.appendChild(create.element('input', 'class', 'schedule-input-box', '', 'id', 'schedule-input-box'));
  scheduleInputBox.type = 'text';
  scheduleInputBox.placeholder = 'Schedule';
  const priorityText = addToDoBox.appendChild(create.element('p', 'class', 'priority-text'));
  priorityText.textContent = 'Priority?';
  const priorityWrapper = addToDoBox.appendChild(create.element('div', 'class', 'priority-wrapper'));
  const lowWrapper = priorityWrapper.appendChild(create.element('div', 'class', 'low-wrapper'));
  const priority1 = lowWrapper.appendChild(create.element('p', 'class', 'priority', '', 'id', 'low'));
  priority1.textContent = 'Low';
  const highWrapper = priorityWrapper.appendChild(create.element('div', 'class', 'high-wrapper'));
  const priority2 = highWrapper.appendChild(create.element('p', 'class', 'priority', '', 'id', 'high'));
  priority2.textContent = 'High';
  addToDoBox.appendChild(create.element('div', 'class', 'project-tag-box', '', 'id', 'project-tag-box'));
  const projectTitleInputBox = addToDoBox.appendChild(create.element('input', 'class', 'project-title-input-box', '', 'id', 'project-title-input-box'));
  projectTitleInputBox.type = 'text';
  projectTitleInputBox.placeholder = 'Tag Project Name';
}

function addLoadStartingPageListeners() {
  const addItemIcon = document.getElementsByClassName('add-item-icon')[0];
  addItemIcon.addEventListener('click', loadAddToDoPage, true);
}

function renderToDoItems() {
  /* this will change application state */
  const { toDoItemsWrapper } = this;
  const { projectIconWrapper } = this;

  const projectData = JSON.parse(projectIconWrapper.id);
  if (toDoItemsWrapper.style.display === '' || toDoItemsWrapper.style.display === 'none') {
    toDoItemsWrapper.style.display = 'block';
    pubSub.publish('show-project-data', projectData); /* where data is project data */
  } else {
    toDoItemsWrapper.style.display = 'none';
    pubSub.publish('remove-dropdown-data', projectData);
  }
}

function getToDoItemFormData() {
  const addTaskInputBox = document.getElementById('add-task-input-box');
  const scheduleInputBox = document.getElementById('schedule-input-box');
  const lowerPriority = document.getElementById('low');
  const highPriority = document.getElementById('high');
  const projectTitleInputBox = document.getElementById('project-title-input-box');
  const addDescriptionTextArea = document.getElementById('description');

  const toDoItemTitle = addTaskInputBox.value;
  const toDoItemDueDate = scheduleInputBox.value;
  let toDoItemPriority = '';
  const toDoItemDescription = addDescriptionTextArea.value;

  if (lowerPriority.style.color === 'red') {
    toDoItemPriority = 'low';
  } else if (highPriority.style.color === 'red') {
    toDoItemPriority = 'high';
  }
  const toDoItemProjectTitle = projectTitleInputBox.value;
  const formData = {
    title: toDoItemTitle,
    dueDate: toDoItemDueDate,
    priority: toDoItemPriority,
    description: toDoItemDescription,
    projectTitle: toDoItemProjectTitle,
  };

  return formData;
}

function addToDoItem() {
  const formData = getToDoItemFormData();
  const toDoItemProjectTitle = formData.projectTitle;
  const toDoItemDescription = formData.description;
  const toDoItemDueDate = formData.dueDate;
  const toDoItemPriority = formData.priority;
  const toDoItemTitle = formData.title;

  if (!getData.project(toDoItemProjectTitle)) {
    const newProject = addData.project(toDoItemProjectTitle);
    newProject.save();
  }

  const newToDo = addData.toDoItem(
    toDoItemTitle,
    toDoItemDescription,
    toDoItemDueDate,
    toDoItemPriority,
    toDoItemProjectTitle,
  );
  newToDo.save();
}

function addToDoItemButtonListeners() {
  const addToDoItemButton = document.getElementById('add-to-do-item-button');
  addToDoItemButton.addEventListener('click', addToDoItem, true);

  const cancelAddToDoItemButton = document.getElementById('cancel-add-to-do-item');
  cancelAddToDoItemButton.addEventListener('click', returnHome, true);
}

function updateToDoItemButtonListeners(selectedToDoItemData) {
  const addToDoItemButton = document.getElementById('add-to-do-item-button');
  addToDoItemButton.addEventListener('click', updateToDoItem.bind(selectedToDoItemData), true);

  const cancelAddToDoItemButton = document.getElementById('cancel-add-to-do-item');
  cancelAddToDoItemButton.addEventListener('click', returnHome, true);
}

function mixinEditToDoPage(selectedToDoItemData) {
  const updateToDoItemButton = document.getElementById('add-to-do-item-button');
  updateToDoItemButton.textContent = 'Update task';
  updateToDoItemButton.className = 'update-to-do-item-button';
  const projectTagBox = document.getElementById('project-tag-box');
  projectTagBox.style.display = 'none';
  const projectTitleInputBox = document.getElementById('project-title-input-box');
  projectTitleInputBox.value = selectedToDoItemData.projectTitle;
  const description = document.getElementById('description');
  description.value = selectedToDoItemData.description;
  const scheduleInputBox = document.getElementById('schedule-input-box');
  scheduleInputBox.value = selectedToDoItemData.dueDate;
  const priorityLevel = selectedToDoItemData.priority;
  if (priorityLevel == 'low') {
    const priority1 = document.getElementById('low');
    priority1.style.color = 'red';
    priority1.style.fontWeight = 'bold';
  } else if (priorityLevel == 'high') {
    const priority2 = document.getElementById('high');
    priority2.style.color = 'red';
    priority2.style.fontWeight = 'bold';
  }
  const addTaskInputBox = document.getElementById('add-task-input-box');
  addTaskInputBox.value = selectedToDoItemData.title;
}

function updateToDoItem() {
  const toDoData = getToDoItemFormData();
  const oldData = this;
  updateData.toDoItem(toDoData, oldData);
}

function editToDoItem() {
  const selectedToDoItemData = JSON.parse(this.id);
  loadAddToDoPageHTML();
  /* I know. Implements switching title to orange and black
    but I'm just ready for the next thing. */
  makeAddToDoPageInteractive();
  mixinEditToDoPage(selectedToDoItemData);
  updateToDoItemButtonListeners(selectedToDoItemData);
}

function deleteToDoItem() {
  const toDoItem = this;
  deleteData.toDoItem(toDoItem);
}

function renderProjects() {
  /* recreate projectsWrapper by deleting it */
  const oldProjectsWrapper = document.getElementsByClassName('projects-wrapper')[0];
  oldProjectsWrapper.remove();
  const sideBar = document.getElementsByClassName('side-bar')[0];
  const projectsWrapper = sideBar.appendChild(create.element('div', 'class', 'projects-wrapper'));
  /* end of recreating projectsWrapper */

  const projectArray = getData.getAllProjects();
  projectArray.forEach((projectItem, currentIndex) => {
    /* display project info and title here */
    const projectDiv = projectsWrapper.appendChild(create.element('div', 'class', 'project'));
    const projectIconWrapper = projectDiv.appendChild(create.element('div', 'class', 'project-icon-wrapper', '', 'id', JSON.stringify(projectItem)));
    projectIconWrapper.appendChild(create.element('div', 'class', 'project-icon', '', 'id', currentIndex));
    const projectTitleLink = projectDiv.appendChild(create.element('a', 'class', 'project-link', '#'));
    projectTitleLink.textContent = projectItem.title;
    const toDoItemsWrapper = projectDiv.appendChild(create.element('div', 'class', 'to-do-items-wrapper', '', 'id', `to-do-${currentIndex}`));
    /* end of project info and title stuff */

    const { toDoLists } = projectItem;
    toDoLists.forEach((toDoItem) => {
      const toDoLinkWrapper = toDoItemsWrapper.appendChild(create.element('div', 'class', 'to-do-link-wrapper'));
      const toDoLink = toDoLinkWrapper.appendChild(create.element('p', 'class', 'to-do-link', '#', 'id', JSON.stringify(toDoItem)));
      toDoLink.textContent = toDoItem.title;
      toDoLink.addEventListener('click', editToDoItem.bind(toDoLink), true);
      /* put delete button here! */
      const deleteButton = toDoLinkWrapper.appendChild(create.element('div', 'class', 'delete-button'));
      deleteButton.addEventListener('click', deleteToDoItem.bind(toDoItem), true);
      deleteButton.appendChild(create.element('div', 'class', 'check-line-one'));
      deleteButton.appendChild(create.element('div', 'class', 'check-line-two'));
    });

    projectIconWrapper.addEventListener('click', renderToDoItems.bind({ toDoItemsWrapper, projectIconWrapper }), true);
  });
  renderDropDowns();
}

function renderDropDowns() {
  /* keep drop down in a style of display if projectName exists */
  const dropDownProjectTitles = dropDown.getActiveDropDowns();
  let dropDownElements = document.querySelectorAll('.project-icon-wrapper');
  dropDownElements = [...dropDownElements];
  /* for each project name on the actual page */
  dropDownElements.forEach((elementItem, currentIndex) => {
    const projectDataFromPage = JSON.parse(elementItem.id);
    const projectTitleFromPage = projectDataFromPage.title;
    /* is the project title on the page the same as the project title already saved? */
    /* and for each project title saved, is the project title (saved) the same as the project title from page? */
    const doesItExist = dropDownProjectTitles.findIndex((dropDownProjectTitle) => dropDownProjectTitle == projectTitleFromPage);
    if (doesItExist !== -1) {
      const toDoItemsWrapper = document.getElementById(`to-do-${currentIndex}`);
      toDoItemsWrapper.style.display = 'block';
    }
  });
}

function loadStartingPage() {
  loadStartingPageHTML();
  addLoadStartingPageListeners();
  renderProjects();
}

function makeAddToDoPageInteractive() {
  datepicker('#schedule-input-box', {
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString();
      input.value = value;
    },
  });
  function changePriorityColor() {
    const selectedPriority = this;
    const selectedId = selectedPriority.id;
    if (selectedId == 'low') {
      const high = document.getElementById('high');
      if (high.style.color == 'red') {
        high.style.color = 'black';
        high.style.fontWeight = '';
      }
    } else if (selectedId == 'high') {
      const low = document.getElementById('low');
      if (low.style.color == 'red') {
        low.style.color = 'black';
        low.style.fontWeight = '';
      }
    }
    const priorityColor = selectedPriority.style.color;
    if (priorityColor == 'black' || priorityColor == '') {
      selectedPriority.style.color = 'red';
      selectedPriority.style.fontWeight = 'bold';
    } else if (priorityColor == 'red') {
      selectedPriority.style.color = 'black';
      selectedPriority.style.fontWeight = '';
    }
  }

  function addPriorityClickListeners() {
    const highParagraph = document.getElementById('high');
    const lowParagraph = document.getElementById('low');
    highParagraph.addEventListener('click', changePriorityColor, true);
    lowParagraph.addEventListener('click', changePriorityColor, true);
  }

  function changeProjectTagBoxColor() {
    const projectTagBoxColor = this.style.backgroundColor;
    if (projectTagBoxColor === 'black' || projectTagBoxColor === '') {
      this.style.backgroundColor = 'orange';
    } else if (projectTagBoxColor === 'orange') {
      this.style.backgroundColor = 'black';
    }
  }

  function changeDisplayForProjectTitleInputBox() {
    const projectTagBoxColor = this.style.backgroundColor;
    const tagProjectNameInputBox = document.getElementById('project-title-input-box');
    if (projectTagBoxColor === 'black' || projectTagBoxColor === '') {
      tagProjectNameInputBox.style.display = 'none';
    } else if (projectTagBoxColor === 'orange') {
      tagProjectNameInputBox.style.display = 'block';
    }
  }

  function doProjectStuff() {
    changeProjectTagBoxColor.call(this);
    changeDisplayForProjectTitleInputBox.call(this);
    /* other stuff */
  }

  function addProjectTagBoxListeners() {
    const projectTagBox = document.getElementById('project-tag-box');
    projectTagBox.addEventListener('click', doProjectStuff.bind(projectTagBox), true);
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
  const addToDoItemPageWrapper = document.getElementById('add-to-do-page-wrapper');
  addToDoItemPageWrapper.remove();
}

pubSub.subscribe('saved-to-do-item', returnHome);
pubSub.subscribe('updated-project-data', returnHome);
pubSub.subscribe('nothing-to-update', returnHome);
pubSub.subscribe('deleted-to-do-item', renderProjects);
pubSub.subscribe('deleted-project-data', renderProjects);

export default loadStartingPage;
