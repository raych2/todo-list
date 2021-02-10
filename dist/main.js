/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderProjectForm": () => /* binding */ renderProjectForm,
/* harmony export */   "hideAddButton": () => /* binding */ hideAddButton,
/* harmony export */   "displayProjectNames": () => /* binding */ displayProjectNames
/* harmony export */ });
/* harmony import */ var _projectItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectItem.js */ "./src/projectItem.js");
/* harmony import */ var _todoItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoItem.js */ "./src/todoItem.js");



const projectList = document.querySelector('.project-list');
const projectFormModal = document.getElementById('newProjectForm');
const newProjectForm = document.querySelector('.project-modal-form');
const projectContent = document.querySelector('.project-content');
const projectTodoContent = document.querySelector('.project-todo-content');
const newTodoForm = document.getElementById('newTodoForm');
const todoForm = document.querySelector('.modal-form');
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
        projectFormModal.style.display = "none";
    }
}
    
function clearCurrentProjects() {
    projectList.innerHTML = '';
}

function editProjectName(e) {
    let index = e.target.parentNode.dataset.order;
    _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.splice(index, 1);
    projectFormModal.style.display = 'block';
    localStorage.setItem('myProjects', JSON.stringify(_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects));
}
    
function removeProject(e) {
    let index = e.target.parentNode.dataset.order;
    _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.splice(index, 1);
    localStorage.setItem('myProjects', JSON.stringify(_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects));
    clearCurrentProjects();
    displayProjectNames();
}
    
const displayProjectNames = () => {
    projectList.innerHTML = '';
    _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.forEach((project, index) => {
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

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = document.getElementById('name').value;
    const newProject = new _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.Project(projectName);
    (0,_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.addNewProject)(newProject);
    clearCurrentProjects();
    displayProjectNames();
    (0,_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.assignProjectId)();
    newProjectForm.reset();
});

function loadProject(e) {
    for (let project of _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects) {
        if(project.name === e.target.innerText) {
            let index = project.id;
            currentProject = _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects[index];
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
    displayTodo();
}
projectList.addEventListener('click', loadProject);

function clearCurrentTodos() {
    projectTodoContent.innerHTML = '';
}

function editTodo(e) {
    let index = e.target.parentNode.dataset.order;
    currentProject.deleteTodo();
    newTodoForm.style.display = 'block';
    localStorage.setItem('myProjects', JSON.stringify(_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects));
}
    
function removeTodo(e) {
    let index = e.target.parentNode.dataset.order;
    currentProject.deleteTodo();
    localStorage.setItem('myProjects', JSON.stringify(_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects));
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

    const newTodo = new _todoItem_js__WEBPACK_IMPORTED_MODULE_1__.Todo(tdTitle, tdDescription, tdDueDate, tdPriority);
    currentProject.addNewTodo(newTodo);
    localStorage.setItem('myProjects', JSON.stringify(_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects));
    clearCurrentTodos();
    displayTodo();
    todoForm.reset();
});



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _projectItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectItem */ "./src/projectItem.js");



const initialize = (() => {
    (0,_projectItem__WEBPACK_IMPORTED_MODULE_1__.retrieveProjects)();
    (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayProjectNames)();
    (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.hideAddButton)();
    (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.renderProjectForm)();
})();

/***/ }),

/***/ "./src/projectItem.js":
/*!****************************!*\
  !*** ./src/projectItem.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myProjects": () => /* binding */ myProjects,
/* harmony export */   "newProjectForm": () => /* binding */ newProjectForm,
/* harmony export */   "Project": () => /* binding */ Project,
/* harmony export */   "addNewProject": () => /* binding */ addNewProject,
/* harmony export */   "retrieveProjects": () => /* binding */ retrieveProjects,
/* harmony export */   "assignProjectId": () => /* binding */ assignProjectId
/* harmony export */ });
/* harmony import */ var _todoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoItem */ "./src/todoItem.js");


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
    deleteTodo(index) {
        this.todoList.splice(index, 1);
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
defaultProject.addNewTodo(new _todoItem__WEBPACK_IMPORTED_MODULE_0__.Todo('First Todo', 'Example', new Date().toLocaleDateString('en-CA'), 'High'));
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
                let spTodo = new _todoItem__WEBPACK_IMPORTED_MODULE_0__.Todo(spTodoTitle, spTodoDescription, spTodoDueDate, spTodoPriority);
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



/***/ }),

/***/ "./src/todoItem.js":
/*!*************************!*\
  !*** ./src/todoItem.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myTodos": () => /* binding */ myTodos,
/* harmony export */   "Todo": () => /* binding */ Todo
/* harmony export */ });


class Todo {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        //this.dueDate = format(parseISO(dueDate), 'MM/dd/yyyy');
        this.priority = priority;
    }
}

//default todo list
const myTodos = [];




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map