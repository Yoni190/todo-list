export default class Project {
    constructor(name){
        this.name = name;
        this.lists = [];
    }

    addList(list){
        this.lists.push(list);
    }

    deleteList(list){
        this.lists.splice(this.lists.indexOf(list), 1);
    }

    displayLists(){
        this.lists.forEach((list)=>{
            console.log(list.title)
        })
    }
}

