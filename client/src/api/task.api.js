// client/src/api/tasksApi.js
import axios from 'axios'

const projectsApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/projects/'
})

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export const getAllTasks = async () => {
    return await tasksApi.get('/')
}

export const createTask = async (task) => {
    return await tasksApi.post('/', task)
}

export const deleteTask = async (id) => {
    return await tasksApi.delete(`${id}/`)
}

export const updateTask = async (id, task) => {
    return await tasksApi.put(`${id}/`, task)
}

export const getTask = async (id) => {
    return await tasksApi.get(`${id}/`)
}

// Acciones personalizadas (según tus @action del backend)
export const getPendingTasks = async () => {
    return await tasksApi.get('pending/')
}

export const markTaskDone = async (id) => {
    return await tasksApi.post(`${id}/mark_done/`)
}




export const getAllProjects = async () => {
    return await projectsApi.get('/')
}

export const createProject = async (project) => {
    return await projectsApi.post('/', project)
}

export const deleteProject = async (id) => {
    return await projectsApi.delete(`${id}/`)
}

export const updateProject = async (id, project) => {
    return await projectsApi.put(`${id}/`, project)
}

export const getProject = async (id) => {
    return await projectsApi.get(`${id}/`)
}

// Acción personalizada del backend
export const getLateTasks = async (projectId) => {
    return await projectsApi.get(`${projectId}/late_tasks/`)
}
