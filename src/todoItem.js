import { parseISO, format } from 'date-fns';

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


export {myTodos, Todo};