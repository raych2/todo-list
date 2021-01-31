import { Todo, myTodos } from './todoItem';

const myProjects = [];
const newProjectForm = document.querySelector('.project-modal-form');

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
}


export {myProjects, newProjectForm, Project, addNewProject};