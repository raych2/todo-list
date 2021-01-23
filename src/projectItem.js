import { Todo, myTodos } from './todoItem';

const myProjects = [];
const newProjectForm = document.querySelector('.project-modal-form');

class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }
}

const addNewTodo = (todo) => {
    for(let project of myProjects) {
        project.todoList.push(todo);
    }
}

const deleteTodo = (index) => {
    for(let project of myProjects) {
        project.todoList.splice(index, 1);
    }
}

const addNewProject = (project) => {
    myProjects.push(project);
}


export {myProjects, newProjectForm, Project, addNewProject, addNewTodo, deleteTodo};