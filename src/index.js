class List {
    constructor(title, description, dueDate, priority, status){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = stauts;
    }

    display() {
        console.log(`Title: ${this.title}, Description: ${this.description}, Due Date: ${this.dueDate}, Priority: ${this.priority}, Status: ${this.status}`);
    }
}
