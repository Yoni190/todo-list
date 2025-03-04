class Project {
    constructor(name, list){
        this.name = name;
        this.lists.add(list);
    }
}

const inbox = new Project('inbox');