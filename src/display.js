import {projects} from "./index.js"

const display = (()=>{
    const lists = document.querySelector('#lists');
    const nav = document.querySelector('ul');

    for(let i = 0; i < Object.keys(projects).length; i++){
        

        // const projectTitle = projects[i].name;
        // card.innerHTML = projectTitle;
        // container.appendChild(card);

        const projectTab = document.createElement('button');
        const projectList = document.createElement('li');

        projectTab.innerHTML = Object.values(projects)[i].name;

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
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);
    }

})();