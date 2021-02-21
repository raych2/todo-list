import { Todo } from './todoItem';
import { parseISO, format } from 'date-fns';

const newProjectForm = document.querySelector('.project-modal-form');

let myProjects = [];
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
}

const addNewProject = (project) => {
    myProjects.push(project);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

function assignProjectId() {
    myProjects.forEach((project, index) => {
        project.id = index;
    });
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

const defaultProject = new Project('Default');
defaultProject.addNewTodo(new Todo('First Todo', 'Example', format(parseISO(new Date().toLocaleDateString('en-CA')), 'MM/dd/yyyy'), 'High', false));
defaultProject.id = 0;

function retrieveProjects() {
    if (projectData !== null) {
        for(let i = 0; i < projectData.length; i++) {
            let savedProject = projectData[i];
            let spName = savedProject.name;
            let restoredProject = new Project(spName);
            for(let j = 0; j < savedProject.todoList.length; j++) {
                let savedProjectTodo = savedProject.todoList[j];
                let spTodoTitle = savedProjectTodo.title;
                let spTodoDescription = savedProjectTodo.description;
                let spTodoDueDate = savedProjectTodo.dueDate;
                let spTodoPriority = savedProjectTodo.priority;
                let spTodoCompleted = savedProjectTodo.completed;
                let spTodoId = j;
                let spTodo = new Todo(spTodoTitle, spTodoDescription, spTodoDueDate, spTodoPriority, spTodoCompleted, spTodoId);
                restoredProject.addNewTodo(spTodo);
            }
            myProjects.push(restoredProject);
            assignProjectId();
        }
    } else {
        myProjects.push(defaultProject);
        localStorage.setItem('myProjects', JSON.stringify(myProjects));
    }
}

export {myProjects, Project, addNewProject, retrieveProjects, assignProjectId };