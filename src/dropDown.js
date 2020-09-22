import pubSub from './pubSub';

const projectNames = [];

function pushDropDown(projectData) {
  const projectTitle = projectData.title;
  const shouldIPush = projectNames.every((projectName) => projectTitle != projectName);

  if (shouldIPush) {
    projectNames.push(projectTitle);
  }
}

function removeDropDown(projectData) {
  const projectTitle = projectData.title;
  const projectIndex = projectNames.findIndex((projectName) => projectTitle == projectName);

  if (projectIndex != -1) {
    projectNames.splice(projectIndex, 1);
  }
}

function getActiveDropDowns() {
  return projectNames;
}

pubSub.subscribe('deleted-project-data', removeDropDown);
pubSub.subscribe('show-project-data', pushDropDown);
pubSub.subscribe('remove-dropdown-data', removeDropDown);

export {
  pushDropDown,
  removeDropDown,
  getActiveDropDowns,
};
