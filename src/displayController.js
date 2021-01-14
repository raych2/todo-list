import {myProjects, newProjectForm, Project} from './projectItem.js';

const projects = document.querySelector('.project-content');

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
    projects.innerHTML = '';
}

const displayProjects = () => {
    myProjects.forEach(project => {
        const projectDiv = document.createElement('div');
        let pName = document.createElement('div');
        pName.classList.add('project-name');
        pName.textContent = project.name;
        projectDiv.append(pName);
        projects.append(projectDiv);
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