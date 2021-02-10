import { displayProjectNames, hideAddButton, renderProjectForm } from './displayController';
import { retrieveProjects } from './projectItem';

const initialize = (() => {
    retrieveProjects();
    displayProjectNames();
    hideAddButton();
    renderProjectForm();
})();