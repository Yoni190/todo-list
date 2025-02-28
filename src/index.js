class todo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    display() {
        console.log(`Title: ${this.title}, Description: ${this.description}, Due Date: ${this.dueDate}, Priority: ${this.priority}`);
    }
}