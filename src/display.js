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
                card.innerHTML = list.title;
                lists.appendChild(card);
            })
        })

        projectList.appendChild(projectTab);
        nav.appendChild(projectList);
    }

})();