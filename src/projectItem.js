const newProjectForm = document.querySelector('.project-modal-form');

//retrieve saved projects from localStorage
const myProjects = JSON.parse(localStorage.getItem('myProjects')) || []
localStorage.setItem('myProjects', JSON.stringify(myProjects));
const projectData = JSON.parse(localStorage.getItem('myProjects'));

class Project {
    constructor(name, id) {
        this.name = name;
        this.todoList = [];
        this.id = id;
    }
    addNewTodo(todo) {
        this.todoList.push(todo);
    }
    deleteTodo(index) {
        this.todoList.splice(index, 1);
    }
}

const addNewProject = (project) => {
    myProjects.push(project);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

export {myProjects, newProjectForm, Project, addNewProject };