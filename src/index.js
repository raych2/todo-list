import { displayProjectNames, hideAddButton, renderProjectForm } from './displayController';

const initialize = (() => {
    displayProjectNames();
    hideAddButton();
    renderProjectForm();
})();