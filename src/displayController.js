import { myProjects, Project, addNewProject, addNewTodo, deleteTodo } from './projectItem.js';
import { Todo, myTodos } from './todoItem';

const renderTodoForm = () => {
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
    const newProjectForm = document.querySelector('.project-modal-form');
    
    function clearCurrentProjects() {
        projectList.innerHTML = '';
    }
    
    function removeProject(e) {
        let index = e.target.parentNode.dataset.order;
        myProjects.splice(index, 1);
        clearCurrentProjects();
        displayProjects();
    }
    
    const displayProjects = () => {
        myProjects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            const removeBtn = document.createElement('button');
            projectDiv.classList.add('project-div');
            removeBtn.classList.add('project-remove-btn')
            removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
            let pName = document.createElement('div');
            pName.dataset.order = index;
            pName.classList.add('project-name');
            pName.innerText = project.name;
            projectDiv.append(pName);
            projectDiv.append(removeBtn);
            projectList.append(projectDiv);
            removeBtn.addEventListener('click', removeProject);
        });
    }
    
    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById('name').value;
        const newProject = new Project(projectName);
        addNewProject(newProject);
        clearCurrentProjects();
        displayProjects();
        newProjectForm.reset();
    });
})();

const displayProjectContent = (() => {
    const projectList = document.querySelector('.project-list');
    const projectContent = document.querySelector('.project-content');
    const pName = document.querySelector('.project-name');
    function loadProject(e) {
        const pcDiv = document.createElement('div');
        pcDiv.classList.add('pc-div');
        const pcName = document.createElement('div');
        const addBtn = document.querySelector('.add-btn');
        addBtn.addEventListener('click', renderTodoForm());
        pcName.innerText = e.target.innerText;
        pcDiv.append(pcName);
        pcDiv.append(addBtn);
        projectContent.append(pcDiv);
    }
    projectList.addEventListener('click', loadProject);
})();

const displayTodoList = (() => {
    const projectTodoContent = document.querySelector('.project-todo-content');
    const todoForm = document.querySelector('.modal-form');

    function clearCurrentTodos() {
        projectTodoContent.innerHTML = '';
    }

    function removeTodo(e) {
        let index = e.target.parentNode.dataset.order;
        deleteTodo();
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
        for(let project of myProjects) {
            project.todoList.forEach((todo, index) => {
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-div');
                todoDiv.dataset.order = index;
                const removeTodoBtn = document.createElement('button');
                removeTodoBtn.classList.add('todo-remove-btn');
                removeTodoBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
                let todoTitle = generateElement('div', '', todo.title, 'tdT');
                let todoDescription = generateElement('div', '', todo.description, 'tdDesc');
                let todoDueDate = generateElement('div', 'Due Date', todo.dueDate, 'tdDate');
                let todoPriority = generateElement('div', 'Priority', todo.priority, 'tdP');
                todoDiv.append(todoTitle);
                todoDiv.append(todoDescription);
                todoDiv.append(todoDueDate);
                todoDiv.append(todoPriority);
                todoDiv.append(removeTodoBtn);
                projectTodoContent.append(todoDiv);
                removeTodoBtn.addEventListener('click', removeTodo);
            });
        }
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const tdTitle = document.getElementById('title').value;
        const tdDescription = document.getElementById('description').value;
        const tdDueDate = document.getElementById('dueDate').value;
        const tdPriority = document.getElementById('priority').value;
    
        const newTodo = new Todo(tdTitle, tdDescription, tdDueDate, tdPriority);
        addNewTodo(newTodo);
        clearCurrentTodos();
        displayTodo();
        todoForm.reset();
    });

})();



export {renderProjectForm, displayProjectContent};