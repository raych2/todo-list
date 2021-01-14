const myProjects = [];
const newProjectForm = document.querySelector('.project-modal-form');

class Project {
    constructor(name) {
        this.name = name;
    }
}

export {myProjects, newProjectForm, Project};