const myProjects = [];
const newProjectForm = document.querySelector('.project-modal-form');

class Project {
    constructor(name, todoList) {
        this.name = name;
        this.todoList = [];
    }
}

const addNewProject = (project) => {
    myProjects.push(project);
}

export {myProjects, newProjectForm, Project, addNewProject};