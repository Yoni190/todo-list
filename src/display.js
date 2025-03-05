import {projects} from "./index.js"

const display = (()=>{
    const container = document.querySelector('#projects');
    const nav = document.querySelector('ul');

    for(let i = 0; i < projects.length; i++){
        const card = document.createElement('div');
        card.className = 'cards';

        // const projectTitle = projects[i].name;
        // card.innerHTML = projectTitle;
        // container.appendChild(card);

        const projectLink = document.createElement('a');
        const projectList = document.createElement('li');

        projectLink.href = '#';
        projectLink.innerHTML = projects[i].name;

        projectList.appendChild(projectLink);
        nav.appendChild(projectList);
    }

})();