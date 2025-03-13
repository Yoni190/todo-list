import {projects} from "./index.js"
import Project from "./project.js"
import List from "./index.js"

//Stuff to add
/*
1. Done: Message inside an empty project
2. Ability to delete todos
3. Color based on priority
4. Expand a selected todo to see details
5. Ability to edit todos
6. Load todos in the project after creating them without clicking on the button


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
                deleteButton.className = 'delete-list';
                deleteButton.innerHTML = 'Delete';
                card.className = 'card';
                card.id = `${project.name}_${list.title}`;

                addDeleteFunctionality(deleteButton, list, project);

                card.innerHTML = `Title: ${list.title} <br> Due Date: ${list.dueDate} <br>`;
                card.appendChild(deleteButton);
                lists.appendChild(card);
            })
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);

        
    }
}

const addDeleteFunctionality = (deleteButtons, list, project) => {
    //const deleteButtons = document.querySelector('.delete-list');
    // deleteButtons.forEach((deleteButton) => {
    //     const card = deleteButton.parentElement;
    //     deleteButton.addEventListener('click', () =>{
    //         const stopIndex = card.id.indexOf('_');
    //         const projectName = card.id.slice(0, stopIndex);
    //         const todoName = card.id.slice(stopIndex);
    //         console.log(`Project is ${projectName}`);
    //         console.log(`Todo is ${todoName}`);

    //         console.log("Suii")
    //     });
    // })
    deleteButtons.addEventListener('click', ()=>{
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
            const todoPriority = document.querySelector('#priority').value;
            const todoProject = document.querySelector('#project-selection').value;

            const newList = new List(todoTitle, todoDescription, todoDate, todoPriority);
            projects[todoProject].addList(newList);

            todoInput.forEach((todo)=>{
                todo.value = '';
            });
            todoDialog.close();
        })

})();

