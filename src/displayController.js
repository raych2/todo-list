import { myProjects, Project, addNewProject } from './projectItem.js';
import { Todo } from './todoItem';

let currentProject;

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
        newTodoForm.style.display = "none";
    } else if (e.target === newProjectForm) {
        newProjectForm.style.display = "none";
    }
}

const displayProjectList = (() => {
    const projectList = document.querySelector('.project-list');
    const projectFormModal = document.getElementById('newProjectForm');
    const newProjectForm = document.querySelector('.project-modal-form');
    
    function clearCurrentProjects() {
        projectList.innerHTML = '';
    }

    function editProjectName(e) {
        let index = e.target.parentNode.dataset.order;
        myProjects.splice(index, 1);
        projectFormModal.style.display = 'block';
    }
    
    function removeProject(e) {
        let index = e.target.parentNode.dataset.order;
        myProjects.splice(index, 1);
        clearCurrentProjects();
        displayProjectNames();
    }
    
    const displayProjectNames = () => {
        myProjects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            const editBtn = document.createElement('button');
            const removeBtn = document.createElement('button');
            projectDiv.classList.add('project-div');
            editBtn.classList.add('project-edit-btn');
            removeBtn.classList.add('project-remove-btn');
            editBtn.innerHTML = '<i class="far fa-edit"></i>';
            removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
            projectDiv.dataset.order = index;
            editBtn.dataset.order = index;
            removeBtn.dataset.order = index;
            const pName = document.createElement('div');
            pName.classList.add('project-name');
            pName.innerText = project.name;
            projectDiv.append(pName);
            projectDiv.append(editBtn);
            projectDiv.append(removeBtn);
            projectList.append(projectDiv);
            editBtn.addEventListener('click', editProjectName);
            removeBtn.addEventListener('click', removeProject);
        });
    }

    function assignProjectId() {
        myProjects.forEach((project, index) => {
            project.id = index;
        });
    }
    
    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById('name').value;
        const newProject = new Project(projectName);
        addNewProject(newProject);
        clearCurrentProjects();
        displayProjectNames();
        assignProjectId();
        newProjectForm.reset();
    });
})();

const displayProject = (() => {
    const projectList = document.querySelector('.project-list');
    const projectContent = document.querySelector('.project-content');
    const projectTodoContent = document.querySelector('.project-todo-content');
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
        pcName.innerText = e.target.innerText;
        pcDiv.append(pcName);
        projectContent.append(pcDiv);
        displayTodoList();
    }
    projectList.addEventListener('click', loadProject);
})();

const displayTodoList = () => {
    const newTodoForm = document.getElementById('newTodoForm');
    const projectTodoContent = document.querySelector('.project-todo-content');
    const todoForm = document.querySelector('.modal-form');

    function clearCurrentTodos() {
        projectTodoContent.innerHTML = '';
    }

    function editTodo(e) {
        let index = e.target.parentNode.dataset.order;
        currentProject.deleteTodo();
        newTodoForm.style.display = 'block';
    }
    
    function removeTodo(e) {
        let index = e.target.parentNode.dataset.order;
        currentProject.deleteTodo();
        clearCurrentTodos();
        displayTodo();
    }

    function generateElement(element, type, elemTxt, className) {
        let newEl = document.createElement(element);
        if (type !== '') {
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
            todoDiv.classList.add('todo-div');
            todoDiv.dataset.order = index;
            const editTodoBtn = document.createElement('button');
            const removeTodoBtn = document.createElement('button');
            editTodoBtn.classList.add('todo-edit-btn');
            removeTodoBtn.classList.add('todo-remove-btn');
            editTodoBtn.innerHTML = '<i class="far fa-edit"></i>';
            removeTodoBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
            let todoTitle = generateElement('div', '', todo.title, 'tdT');
            let todoDescription = generateElement('div', '', todo.description, 'tdDesc');
            let todoDueDate = generateElement('div', 'Due Date', todo.dueDate, 'tdDate');
            let todoPriority = generateElement('div', 'Priority', todo.priority, 'tdP');
            todoDiv.append(todoTitle);
            todoDiv.append(todoDescription);
            todoDiv.append(todoDueDate);
            todoDiv.append(todoPriority);
            todoDiv.append(editTodoBtn);
            todoDiv.append(removeTodoBtn);
            projectTodoContent.append(todoDiv);
            editTodoBtn.addEventListener('click', editTodo);
            removeTodoBtn.addEventListener('click', removeTodo);
        });
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tdTitle = document.getElementById('title').value;
        const tdDescription = document.getElementById('description').value;
        const tdDueDate = document.getElementById('dueDate').value;
        const tdPriority = document.getElementById('priority').value;
    
        const newTodo = new Todo(tdTitle, tdDescription, tdDueDate, tdPriority);
        currentProject.addNewTodo(newTodo);
        clearCurrentTodos();
        displayTodo();
        todoForm.reset();
    });

};



export {renderProjectForm, hideAddButton, displayTodoList, currentProject};