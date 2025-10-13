import {useEffect, useState} from 'react'
import {getAllTasks} from '../api/task.api'
import {TaskCard} from './TaskCard'

export function TaskList() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
       async function loadTasks(){
            const res = await getAllTasks()
            console.log(res)
            setTasks(res.data)
        }
        loadTasks()
    }, [])
  return (
    
    <div>
        <div>TaskList</div>
        {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
        ))}
        <hr />
    </div>
  )
}

