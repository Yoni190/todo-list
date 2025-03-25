export const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
}