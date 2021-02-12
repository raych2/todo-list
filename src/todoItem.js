class Todo {
    constructor (title, description, dueDate, priority, completed, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = id;
    }
}

//default todo list
const myTodos = [];

export {myTodos, Todo};