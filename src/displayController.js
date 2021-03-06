import { myProjects, Project, addNewProject, assignProjectId } from './projectItem.js';
import { Todo } from './todoItem.js';
import { parseISO, format } from 'date-fns';

const projectList = document.querySelector('.project-list');
const projectFormModal = document.getElementById('newProjectForm');
const newProjectForm = document.querySelector('.project-modal-form');
const projectContent = document.querySelector('.project-content');
const projectTodoContent = document.querySelector('.project-todo-content');
const newTodoForm = document.getElementById('newTodoForm');
const todoForm = document.querySelector('.modal-form');
let currentProject;
let initialId;
let initialTodos;

const hideAddButton = () => {
    const addBtn = document.querySelector('.add-btn');
    addBtn.style.display = 'none';
}

const showAddButton = () => {
    const addBtn = document.querySelector('.add-btn');
    addBtn.style.display = 'flex';
}

const renderTodoForm = (e) => {
    const newTodoForm = document.getElementById('newTodoForm');
    const addBtn = document.querySelector('.add-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const date = document.getElementById('dueDate');

    //set calendar's due date to today's date
    date.value = new Date().toLocaleDateString('en-CA');
    
    function openForm(e) {
        newTodoForm.style.display = 'block';
    }

    function closeForm(e) {
        newTodoForm.style.display = 'none';
    }

    addBtn.addEventListener('click', openForm);
    cancelBtn.addEventListener('click', closeForm);
}

const renderProjectForm = () => {
    const newProjectForm = document.getElementById('newProjectForm');
    const addBtn = document.querySelector('.project-add-btn');
    const cancelBtn = document.querySelector('.project-cancel-btn');
    
    function openForm(e) {
        newProjectForm.style.display = 'block';
    }

    function closeForm(e) {
        newProjectForm.style.display = 'none';
    }

    addBtn.addEventListener('click', openForm);
    cancelBtn.addEventListener('click', closeForm);
}

window.onclick = function(e) {
    if (e.target === newTodoForm) {
        newTodoForm.style.display = 'none';
    } else if (e.target === projectFormModal) {
        projectFormModal.style.display = 'none';
    }
}
    
function clearCurrentProjects() {
    projectList.innerHTML = '';
}

function editProjectName(e) {
    const projectAddBtn = document.getElementById('submit');
    let index = e.target.parentNode.dataset.order;
    document.getElementById('name').value = myProjects[index].name;
    initialId = index;
    initialTodos = myProjects[index].todoList;
    projectFormModal.style.display = 'block';
    projectAddBtn.addEventListener('click', (e) => {
        myProjects.splice(index, 1);
        localStorage.setItem('myProjects', JSON.stringify(myProjects));
    });
}
    
function removeProject(e) {
    let index = e.target.parentNode.dataset.order;
    projectContent.remove();
    projectTodoContent.remove();
    myProjects.splice(index, 1);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
    clearCurrentProjects();
    displayProjectNames();
}
    
const displayProjectNames = () => {
    projectList.innerHTML = '';
    myProjects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        const projectButtonsDiv = document.createElement('div');
        const editBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        projectDiv.classList.add('project-div');
        projectButtonsDiv.classList.add('project-buttons-div');
        editBtn.classList.add('project-edit-btn');
        removeBtn.classList.add('project-remove-btn');
        editBtn.innerHTML = '<i class="far fa-edit fa-lg"></i>';
        removeBtn.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>';
        projectDiv.dataset.order = index;
        editBtn.dataset.order = index;
        removeBtn.dataset.order = index;
        const pName = document.createElement('div');
        pName.classList.add('project-name');
        pName.innerText = project.name;
        projectDiv.append(pName);
        projectButtonsDiv.append(editBtn);
        projectButtonsDiv.append(removeBtn);
        projectDiv.append(projectButtonsDiv);
        projectList.append(projectDiv);
        editBtn.addEventListener('click', editProjectName);
        removeBtn.addEventListener('click', removeProject);
    });
}

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = document.getElementById('name').value;
    const newProject = new Project(projectName);
    if(initialId && initialTodos) {
        newProject.id = initialId;
        newProject.todoList = initialTodos;
    }
    addNewProject(newProject);
    clearCurrentProjects();
    displayProjectNames();
    assignProjectId();
    newProjectForm.reset();
});

function loadProject(e) {
    for (let project of myProjects) {
        if(project.name === e.target.innerText) {
            let index = project.id;
            currentProject = myProjects[index];
        }
    }
    projectContent.innerHTML = '';
    projectTodoContent.innerHTML = '';
    const pcDiv = document.createElement('div');
    pcDiv.classList.add('pc-div');
    pcDiv.dataset.id = currentProject;
    const pcName = document.createElement('div');
    pcName.classList.add('pcName');
    const addBtn = document.querySelector('.add-btn');
    showAddButton();
    addBtn.addEventListener('click', renderTodoForm);
    const deleteCompletedBtn = document.createElement('button');
    deleteCompletedBtn.classList.add('delete-btn');
    deleteCompletedBtn.innerText = 'Delete Completed Todos';
    deleteCompletedBtn.addEventListener('click', deleteCompletedTodos);
    pcName.innerText = e.target.innerText;
    pcDiv.append(pcName);
    pcDiv.append(deleteCompletedBtn);
    projectContent.append(pcDiv);
    displayTodo();
}
projectList.addEventListener('click', loadProject);

function assignTodoId() {
    currentProject.todoList.forEach((todo, index) => {
        todo.id = index;
    });
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

function clearCurrentTodos() {
    projectTodoContent.innerHTML = '';
}

function editTodo(e) {
    const todoAddBtn = document.getElementById('submitTodo');
    const cancelBtn = document.querySelector('.cancel-btn');
    let index = e.target.parentNode.dataset.order;
    newTodoForm.style.display = 'block';
    document.getElementById('title').value = currentProject.todoList[index].title;
    document.getElementById('description').value = currentProject.todoList[index].description;
    document.getElementById('dueDate').value = currentProject.todoList[index].dueDate;
    document.getElementById('priority').value = currentProject.todoList[index].priority;
    currentProject.todoList.splice(index, 1);
    todoAddBtn.addEventListener('click', (e) => {
        localStorage.setItem('myProjects', JSON.stringify(myProjects));
        newTodoForm.style.display = 'none';
    })
    cancelBtn.addEventListener('click', (e) => {
        newTodoForm.style.display = 'none';
    });
}

function removeTodo(e) {
    let index = e.target.parentNode.dataset.order;
    currentProject.todoList.splice(index, 1);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
    clearCurrentTodos();
    displayTodo();
}

function markTodoComplete(e) {
    let index = e.target.parentNode.dataset.order;
    if(e.target.checked) {
        currentProject.todoList[index].completed = true;
        e.target.parentNode.style.textDecoration = 'line-through';
    } else {
        currentProject.todoList[index].completed = false;
        e.target.parentNode.style.textDecoration = 'none';
    }
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

function deleteCompletedTodos(e) {
    currentProject.todoList = currentProject.todoList.filter(todo => !todo.completed);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
    clearCurrentTodos();
    displayTodo();
}

function generateElement(element, type, elemTxt, className) {
    let newEl = document.createElement(element);
    if ((type !== '') && elemTxt !== undefined) {
        newEl.textContent = `${type}: ${elemTxt}`;
    } else {
        newEl.textContent = elemTxt;
    }
    newEl.classList.add(className);
    return newEl;
}

const displayTodo = () => {
    currentProject.todoList.forEach((todo, index) => {
        const todoDiv = document.createElement('div');
        const todoButtonsDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        todoDiv.dataset.order = index;
        const checkbox = document.createElement('input');
        const editTodoBtn = document.createElement('button');
        const removeTodoBtn = document.createElement('button');
        editTodoBtn.dataset.order = index;
        removeTodoBtn.dataset.order = index;
        todoButtonsDiv.classList.add('todo-buttons-div');
        editTodoBtn.classList.add('todo-edit-btn');
        removeTodoBtn.classList.add('todo-remove-btn');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('completed-todo');
        editTodoBtn.innerHTML = '<i class="far fa-edit fa-lg"></i>';
        removeTodoBtn.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>';
        let todoTitle = generateElement('div', '', todo.title, 'tdT');
        let todoDescription = generateElement('div', 'Description', todo.description, 'tdDesc');
        let todoDueDate = generateElement('div', 'Due Date', todo.dueDate, 'tdDate');
        let todoPriority = generateElement('div', 'Priority', todo.priority, 'tdP');
        if(todo.completed === true) {
            checkbox.checked = true;
            todoDiv.style.textDecoration = 'line-through';
        } else {
            todoDiv.style.textDecoration = 'none';
        }
        todoDiv.append(checkbox);
        todoDiv.append(todoTitle);
        todoDiv.append(todoDescription);
        todoDiv.append(todoDueDate);
        todoDiv.append(todoPriority);
        todoButtonsDiv.append(editTodoBtn);
        todoButtonsDiv.append(removeTodoBtn);
        todoDiv.append(todoButtonsDiv);
        projectTodoContent.append(todoDiv);
        checkbox.addEventListener('click', markTodoComplete);
        editTodoBtn.addEventListener('click', editTodo);
        removeTodoBtn.addEventListener('click', removeTodo);
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tdTitle = document.getElementById('title').value;
    const tdDescription = document.getElementById('description').value;
    let tdDueDate = document.getElementById('dueDate').value;
    tdDueDate = format(parseISO(tdDueDate), 'MM/dd/yyyy');
    const tdPriority = document.getElementById('priority').value;
    const tdCompleted = false;

    const newTodo = new Todo(tdTitle, tdDescription, tdDueDate, tdPriority, tdCompleted);
    currentProject.addNewTodo(newTodo);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
    clearCurrentTodos();
    displayTodo();
    assignTodoId();
    todoForm.reset();
});

export { renderProjectForm, hideAddButton, displayProjectNames };