import {projects} from "./index.js"
import Project from "./project.js"
import List from "./index.js"

//Stuff to add
/*
1. Done: Message inside an empty project
2. Done: Ability to delete todos
3. Done: Color based on priority
4. Expand a selected todo to see details
5. Done: Ability to edit todos
6. Load todos in the project after creating them without clicking on the button
7. Separate to more classes


*/


const displayProjects = ()=>{
    const lists = document.querySelector('#lists');
    const nav = document.querySelector('ul');



    for(let i = 0; i < Object.keys(projects).length; i++){
        const projectTab = document.createElement('button');
        const projectList = document.createElement('li');


        
        projectTab.innerHTML = Object.values(projects)[i].name;

        //Does not allow repetition of projects
        const children = nav.childElementCount;
        if(children - 3 > i){
            continue;
        }
        

        projectTab.addEventListener('click', ()=>{
            const project = projects[projectTab.innerHTML];
            lists.textContent = '';

            if(project.lists.length == 0){
                lists.innerHTML = "Your project is empty! Create some todos";
            }

            project.lists.forEach((list)=>{
                const card = document.createElement('div');
                const deleteButton = document.createElement('button');
                const editButton = document.createElement('button');

                editButton.className = 'edit-list';
                editButton.innerHTML = 'Edit';

                deleteButton.className = 'delete-list';
                deleteButton.innerHTML = 'Delete';

                card.className = 'card';

                addDeleteFunctionality(deleteButton, list, project);
                addEditFunctionality(editButton, list, project);

                card.innerHTML = `Title: ${list.title} <br> Due Date: ${list.dueDate} <br>`;
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

                card.addEventListener('click', ()=>{
                    expandCard(card, lists);
                });
            })
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);

        
    }
}

const expandCard = (card, lists) => {
    console.log(lists.children);
    const cards = []

    const listChildren = lists.children;

    for(let i = 0; i < listChildren.length; i++){
        if(listChildren[i] != card){
            cards.push(listChildren[i]);
            listChildren[i].parentNode.removeChild(listChildren[i]);
            card.style.width = '100vh'
            i = 0;
        }
    }

    if(listChildren[0] != card){
        cards.push(listChildren[0]);
        listChildren[0].parentNode.removeChild(listChildren[0]);
    }
}

const changeProject = (oldProject, newProject, list) => {
    oldProject.deleteList(list);
    projects[newProject].addList(list);
}

//Edit Todos
const addEditFunctionality = (editButton, list, project) => {
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
            console.log("Edited");
            todoDialog.close();
        })

        cancelButton.addEventListener('click', ()=>{
            todoForm.appendChild(createButton);
            todoTitle.value = '';
            todoDescription.value = '';
        })

        todoDialog.showModal();
    })
}

//Delete Todos
const addDeleteFunctionality = (deleteButton, list, project) => {
    deleteButton.addEventListener('click', ()=>{
        project.deleteList(list);
    })

}
const populateSelectProject = () => {
    const projectDrop = document.querySelector('#project-selection');
    projectDrop.innerHTML = '';
    

    Object.keys(projects).forEach((project) => {
        const option = document.createElement('option');
        option.innerHTML = project.charAt(0).toUpperCase() + project.slice(1);
        option.value = project;
        projectDrop.appendChild(option);
    })
}

const display = (()=>{
    displayProjects();
    populateSelectProject();

    
        

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
            const projectTitle = document.querySelector('#project-title').value;
            const newProject = new Project(projectTitle);
            projects[projectTitle] = newProject;
            displayProjects();
            populateSelectProject();
            //Clear the title input after project creation
            document.querySelector('#project-title').value = '';
            projectDialog.close();
        })

        const createTodo = document.querySelector('#todo-creation');
        createTodo.addEventListener('click', ()=>{
            const todoInput = document.querySelectorAll('.todo-input');

            const todoTitle = document.querySelector('#todo-title').value;
            const todoDescription = document.querySelector('#description').value;
            const todoDate = document.querySelector('#dueDate').value;
            const todoPriority = document.querySelector('#priorities').value;
            const todoProject = document.querySelector('#project-selection').value;

            const newList = new List(todoTitle, todoDescription, todoDate, todoPriority);
            projects[todoProject].addList(newList);

            todoInput.forEach((todo)=>{
                todo.value = '';
            });
            todoDialog.close();
        });



})();



