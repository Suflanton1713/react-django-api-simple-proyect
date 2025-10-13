import { useNavigate } from "react-router-dom"

export function TaskCard({task}) {
    
const navigate = useNavigate()

  return (
    <div>
        <hr />
        <div style={{backgroundColor: '#333', padding: '10px', borderRadius: '5px'}}
        onClick={() => navigate(`/tasks/${task.id}`)}
        ><h1>{task.title}</h1>
                <p>{task.description}</p>
                <p>{task.done}</p>
                </div>
                
           
            </div>
  )
}

