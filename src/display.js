import {projects} from "./index.js"

const display = (()=>{
    const container = document.querySelector('#projects');
    const nav = document.querySelector('ul');

    for(let i = 0; i < Object.keys(projects).length; i++){
        const card = document.createElement('div');
        card.className = 'cards';

        // const projectTitle = projects[i].name;
        // card.innerHTML = projectTitle;
        // container.appendChild(card);

        const projectTab = document.createElement('button');
        const projectList = document.createElement('li');

        projectTab.innerHTML = Object.values(projects)[i].name;

        projectTab.addEventListener('click', ()=>{
            
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);
    }

})();