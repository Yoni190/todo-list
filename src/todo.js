class Todo {

    createList(title, description, dueDate, priority, status){
        return List.new(title, description, dueDate, priority, status);
    }

    setComplete(list){
        list.stat('Completed');
    }
}