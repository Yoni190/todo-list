export default class Project {
    constructor(name){
        this.name = name;
        this.lists = [];
    }

    addList(list){
        this.lists.push(list);
    }

    displayLists(){
        this.lists.forEach((list)=>{
            console.log(list.title)
        })
    }
}

