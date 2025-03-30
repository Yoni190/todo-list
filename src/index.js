import {projects} from "./list.js"
import Project from "./project.js"
import List from "./list.js"
import {saveProjects} from "./storage.js"
import {formatDistanceToNow} from "../node_modules/date-fns"

//Stuff to add
/*
1. Done: Message inside an empty project
2. Done: Ability to delete todos
3. Done: Color based on priority
4. Done: Expand a selected todo to see details
5. Done: Ability to edit todos
6. Done: Load todos in the project after creating them without clicking on the button
7. Separate to more classes
8. Improve style


*/


const displayProjects = ()=>{
    if(!localStorage.getItem('projects')){
        setDefaultProjects();
    }
    const lists = document.querySelector('#lists');
    const nav = document.querySelector('ul');
    const storedProjects = JSON.parse(localStorage.getItem('projects'));



    for(let i = 0; i < Object.keys(storedProjects).length; i++){
        const projectTab = document.createElement('button');
        const projectList = document.createElement('li');
        


        
        projectTab.innerHTML = Object.values(storedProjects)[i].name;
        projectTab.id = projectTab.innerHTML;
        

        //Does not allow repetition of projects
        const children = nav.childElementCount;
        if(children - 3 > i){
            continue;
        }
        

        projectTab.addEventListener('click', ()=>{
            loadProjects(projectTab, lists);
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);

        
    }
}

const setDefaultProjects = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
}

const loadProjects = (projectTab, lists) => {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    setPrototypeOfStorage(storedProjects);
    const project = storedProjects[projectTab.innerHTML];
    lists.textContent = '';

    if(project.lists.length == 0){
        lists.innerHTML = "Your project is empty! Create some todos";
    }

    project.lists.forEach((list)=>{
        const card = document.createElement('div');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');

        editButton.className = 'edit-list';
        editButton.id = `edit-${list.title}`;
        editButton.innerHTML = 'Edit';

        deleteButton.className = 'delete-list';
        deleteButton.innerHTML = 'Delete';

        card.className = 'card';

        addDeleteFunctionality(deleteButton, list, project, storedProjects);
        addEditFunctionality(editButton, list, project, storedProjects);

        card.innerHTML = `Title: ${list.title} <br> Due Date: Due in ${list.dueDate} <br>`;
        card.appendChild(deleteButton);
        card.appendChild(editButton);
        lists.appendChild(card);

        card.style.color = 'white';
        if(list.priority == 'low'){
            card.style.backgroundColor = 'green';
        }
        else if(list.priority == 'medium'){
            card.style.backgroundColor = 'orange';
        }
        else {
            card.style.backgroundColor = 'red';
        }

        card.addEventListener('dblclick', ()=>{
            expandCard(card, lists, list);
            const minimizeButton = document.createElement('button');
            minimizeButton.innerHTML = 'Minimize';
            card.appendChild(minimizeButton);

            minimizeButton.addEventListener('click', ()=>{
                card.removeChild(document.querySelector('#card-description'));
                card.removeChild(document.querySelector('#card-priority'));
                card.style.height = '20vh';
                card.removeChild(minimizeButton);
            })
        });
    })
}

const expandCard = (card, lists, list) => {
    card.style.height = '45vh';

    const description = document.createElement('p');
    description.id = 'card-description';
    const priority = document.createElement('p');
    priority.id = 'card-priority';
    description.textContent = `Description: ${list.description}`;
    priority.textContent = `Priority: ${list.priority}`;
    card.appendChild(description);
    card.appendChild(priority);

}


const changeProject = (oldProject, newProject, list) => {
    // oldProject.deleteList(list);
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    setPrototypeOfStorage(storedProjects);
    
    storedProjects[oldProject.name].deleteList(list);
    storedProjects[newProject].addList(list);
    
    saveProjects(storedProjects)
    // localStorage.getItem(JSON.parse('projects'))[newProject].addList(list);
}

//Edit Todos
const addEditFunctionality = (editButton, list, project, storedProjects) => {
    editButton.addEventListener('click', ()=>{
        const createButton = document.querySelector('#todo-creation');
        const cancelButton = document.querySelector('#cancel-list');
        const editedButton = document.createElement('button');
        editedButton.id = 'edit-button';
        editedButton.innerHTML = "Edit Todo";
        editedButton.type = 'button';
        const todoForm = document.querySelector('form');
        const todoDialog = document.querySelector('dialog');

        const todoTitle = document.querySelector('#todo-title');
        todoTitle.value = list.title;
        const todoDescription = document.querySelector('#description');
        todoDescription.value = list.description;
        const todoDate = document.querySelector('#dueDate');
        const todoPriority = document.querySelector('#priorities');
        const todoProject = document.querySelector('#project-selection');

        todoForm.appendChild(editedButton);
        todoForm.removeChild(createButton);
        

        editedButton.addEventListener('click', ()=>{
            list.title = todoTitle.value;
            list.description = todoDescription.value;
            list.dueDate = todoDate.value;
            list.priority = todoPriority.value;
            const previousProject = project;
            const newProject = todoProject.value;
            changeProject(previousProject, newProject, list);
            todoForm.appendChild(createButton);
            todoForm.removeChild(editedButton);
            
            const lists = document.querySelector('#lists');
            const projectTab = document.querySelector(`#${todoProject.value}`);
            loadProjects(projectTab, lists);

            todoTitle.value = '';
            todoDescription.value = '';
            todoDialog.close();
        });

        cancelButton.addEventListener('click', ()=>{
            todoForm.appendChild(createButton);
            todoTitle.value = '';
            todoDescription.value = '';
        });

        

        todoDialog.showModal();
    })
}

//Delete Todos
const addDeleteFunctionality = (deleteButton, list, project, storedProjects) => {
    deleteButton.addEventListener('click', ()=>{
        project.deleteList(list);
        saveProjects(storedProjects);

        const lists = document.querySelector('#lists');
        const projectTab = document.querySelector(`#${project.name}`);
        loadProjects(projectTab, lists);
    })

}
const populateSelectProject = () => {
    const projectDrop = document.querySelector('#project-selection');
    projectDrop.innerHTML = '';
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    

    Object.keys(storedProjects).forEach((project) => {
        const option = document.createElement('option');
        option.innerHTML = project.charAt(0).toUpperCase() + project.slice(1);
        option.value = project;
        projectDrop.appendChild(option);
    })
}

const setPrototypeOfStorage = (storedProjects) => {
    for(const key in storedProjects){
        Object.setPrototypeOf(storedProjects[key], projects['empty'])
    }
}

const display = (()=>{
    displayProjects();
    populateSelectProject();

    const storedProjects = JSON.parse(localStorage.getItem('projects'))
    // console.log(Object.getPrototypeOf(projects['inbox']))
    // console.log(Object.getPrototypeOf(storedProjects['inbox']));

    // console.log(projects)
    // console.log(storedProjects)
    // //console.log(Object.getPrototypeOf(projects))

    
        

        // const projectTitle = projects[i].name;
        // card.innerHTML = projectTitle;
        // container.appendChild(card);

        

        

        

        //create todo
        const todoButton = document.querySelector('#create-todo');
        const todoDialog = document.querySelector('#todo-dialog');
        const form = document.querySelector('form');
        todoButton.addEventListener('click', ()=>{
            todoDialog.showModal();
        })

        const projectButton = document.querySelector('#create-project');
        const projectDialog = document.querySelector('#project-dialog');
        projectButton.addEventListener('click', ()=>{
            projectDialog.showModal();
        })

        const cancelButton = document.querySelectorAll('.cancel');
        cancelButton.forEach((button)=>{
            button.addEventListener('click', ()=>{
                todoDialog.close();
                projectDialog.close();
            })
        });


        
        const createProject = document.querySelector('#project-creation');
        createProject.addEventListener('click', ()=>{
            const storedProjects = JSON.parse(localStorage.getItem('projects'));
            const projectTitle = document.querySelector('#project-title').value;
            const newProject = new Project(projectTitle);
            storedProjects[projectTitle] = newProject;

            
            saveProjects(storedProjects);
            displayProjects();
            populateSelectProject();
            //Clear the title input after project creation
            document.querySelector('#project-title').value = '';
        
            projectDialog.close();
        })

        const createTodo = document.querySelector('#todo-creation');
        createTodo.addEventListener('click', ()=>{
            const storedProjects = JSON.parse(localStorage.getItem('projects'));
            const todoInput = document.querySelectorAll('.todo-input');

            const todoTitle = document.querySelector('#todo-title').value;
            const todoDescription = document.querySelector('#description').value;
            const todoDate = new Date(document.querySelector('#dueDate').value);

            const todoDue = formatDistanceToNow(
                new Date(todoDate.getFullYear(), todoDate.getMonth(), todoDate.getDate())
            );
            const todoPriority = document.querySelector('#priorities').value;
            const todoProject = document.querySelector('#project-selection').value;

            const newList = new List(todoTitle, todoDescription, todoDue, todoPriority);
            setPrototypeOfStorage(storedProjects);
            storedProjects[todoProject].addList(newList);
            saveProjects(storedProjects);

            todoInput.forEach((todo)=>{
                todo.value = '';
            });

            const lists = document.querySelector('#lists');
            const projectTab = document.querySelector(`#${todoProject}`);
            loadProjects(projectTab, lists);


            todoDialog.close();
        });



})();



