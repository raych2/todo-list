import { parseISO, format } from 'date-fns';

class Todo {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(parseISO(dueDate), 'MM/dd/yyyy');
        this.priority = priority;
    }
}

//default todo list
const myTodos = [];


export {myTodos, Todo};