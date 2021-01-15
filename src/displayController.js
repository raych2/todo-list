import {myProjects, newProjectForm, Project} from './projectItem.js';

const projectList = document.querySelector('.project-list');

const renderTodoForm = () => {
    const newTodoForm = document.getElementById('newTodoForm');
    const addBtn = document.querySelector('.add-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    
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

const addNewProject = (project) => {
    myProjects.push(project);
}

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
        pName.textContent = project.name;
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

export {renderTodoForm, renderProjectForm};