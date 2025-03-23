import Project from "./project.js"
import "./style.css"


//Change array to object and assign the name of the project as the key
export const projects = {};

export default class List {

    //Future Note: Find way to insert class instance to a project inside this class
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
const test = new Project('test');
const empty = new Project('empty');
projects[empty.name] = empty;
projects[inbox.name] = inbox;
projects[test.name] = test;

// projects.push(inbox);
// projects.push(test);
// projects.push(inbox);
// projects.push(test);
// projects.push(inbox);
// projects.push(test);

const list1 = new List('Jog', "Jog in the morning", 'Tomorrow', 'low');
const list2 = new List('Shopping', "Go buy fruits", 'Today', 'medium');
const list3 = new List('Read', "Read 2 articles", 'Afternoon', 'high');

inbox.addList(list1)
inbox.addList(list2)
inbox.addList(list3)



test.addList(list3)

