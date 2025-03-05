import {projects} from "./index.js"

const display = (()=>{
    const container = document.querySelector('#projects');

    for(let i = 0; i < projects.length; i++){
        const card = document.createElement('div');
        card.className = 'cards';

        const projectTitle = projects[i].name;
        card.innerHTML = projectTitle;
        container.appendChild(card);
    }

})();