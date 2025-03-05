import Project from "./project.js"

class List {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "Not Completed";
    }
    
    setComplete(){
        this.status = "Completed";
    }

    display() {
        console.log(`Title: ${this.title}, Description: ${this.description}, Due Date: ${this.dueDate}, Priority: ${this.priority}, Status: ${this.status}`);
    }
}

const inbox = new Project('inbox');

const list1 = new List('Jog', "Jog in the morning", 'Tomorrow', 1);
const list2 = new List('Shopping', "Go buy fruits", 'Today', 2);
const list3 = new List('Read', "Read 2 articles", 'Afternoon', 1);

inbox.addList(list1)
inbox.addList(list2)
inbox.addList(list3)

inbox.displayLists()

