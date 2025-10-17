import axios from 'axios'

const graphqlApi = axios.create({
    baseURL: 'http://localhost:8000/graphql/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Ejemplo de consulta GraphQL (GET todas las tareas)
export const getAllTasksGraphQL = async () => {
    const query = `
        query {
            allTasks {
                id
                title
                description
                done
                priority
                dueDate
                project {
                    id
                    name
                    category
                }
            }
        }
    `
    const response = await graphqlApi.post('', { query })
    return response.data.data.allTasks
}

// Ejemplo de mutación (crear tarea)
export const createTaskGraphQL = async (task) => {
    const mutation = `
        mutation CreateTask($title: String!, $description: String!, $projectId: ID!) {
            createTask(title: $title, description: $description, projectId: $projectId) {
                task {
                    id
                    title
                    description
                    done
                }
            }
        }
    `
    const variables = {
        title: task.title,
        description: task.description,
        projectId: task.project
    }

    const response = await graphqlApi.post('', { query: mutation, variables })
    return response.data.data.createTask.task
}
