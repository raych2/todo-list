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
/* harmony export */   "displayProjectContent": () => /* binding */ displayProjectContent
/* harmony export */ });
/* harmony import */ var _projectItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectItem.js */ "./src/projectItem.js");
/* harmony import */ var _todoItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoItem */ "./src/todoItem.js");



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

const displayProjectList = (() => {
    const projectList = document.querySelector('.project-list');
    const newProjectForm = document.querySelector('.project-modal-form');
    
    function clearCurrentProjects() {
        projectList.innerHTML = '';
    }
    
    function removeProject(e) {
        let index = e.target.parentNode.dataset.order;
        _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.splice(index, 1);
        clearCurrentProjects();
        displayProjects();
    }
    
    const displayProjects = () => {
        _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.forEach((project, index) => {
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
        const newProject = new _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.Project(projectName);
        (0,_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.addNewProject)(newProject);
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
        (0,_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.deleteTodo)();
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
        for(let project of _projectItem_js__WEBPACK_IMPORTED_MODULE_0__.myProjects) {
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
    
        const newTodo = new _todoItem__WEBPACK_IMPORTED_MODULE_1__.Todo(tdTitle, tdDescription, tdDueDate, tdPriority);
        (0,_projectItem_js__WEBPACK_IMPORTED_MODULE_0__.addNewTodo)(newTodo);
        clearCurrentTodos();
        displayTodo();
        todoForm.reset();
    });

})();





/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _displayController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController.js */ "./src/displayController.js");


const initialize = (() => {
    (0,_displayController_js__WEBPACK_IMPORTED_MODULE_0__.renderProjectForm)();
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
/* harmony export */   "addNewTodo": () => /* binding */ addNewTodo,
/* harmony export */   "deleteTodo": () => /* binding */ deleteTodo
/* harmony export */ });
/* harmony import */ var _todoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoItem */ "./src/todoItem.js");


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