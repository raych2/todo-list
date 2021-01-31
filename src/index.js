import { hideAddButton, renderProjectForm, displayTodoList, currentProject } from './displayController.js';
import { myProjects } from './projectItem.js';

const projectList = document.querySelector('.project-list');

const initialize = (() => {
    hideAddButton();
    renderProjectForm();
    //displayTodoList(currentProject);
})();

