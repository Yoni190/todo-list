import {projects} from "./index.js"
import Project from "./project.js"

const displayProjects = ()=>{
    const lists = document.querySelector('#lists');
    const nav = document.querySelector('ul');


    //nav.innerHTML = '<li><button id="create-todo">Create todo</button></li><li><button id="create-project">Create Project</button></li><li><h3>Projects</h3></li>';


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
            project.lists.forEach((list)=>{
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `Title: ${list.title} <br> Due Date: ${list.dueDate}`;
                lists.appendChild(card);
            })
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);
        
    }
}

const display = (()=>{
    displayProjects();

        

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

        //No access to project class
        const createProject = document.querySelector('#project-creation');
        createProject.addEventListener('click', ()=>{
            const projectTitle = document.querySelector('#project-title').value;
            const newProject = new Project(projectTitle);
            projects[projectTitle] = newProject;
            displayProjects();
            projectDialog.close();
        })

})();

