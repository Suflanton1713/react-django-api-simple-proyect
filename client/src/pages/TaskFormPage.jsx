import {useForm} from 'react-hook-form'
import {useEffect} from 'react'
import {CreateTask} from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteTask, getTask, updateTask } from '../api/task.api'
import toast from 'react-hot-toast'
export function TaskFormPage() {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)

   
    const onSubmit = handleSubmit(async (data) => {
     
        if (params.id) {
            await updateTask(params.id, data)
            toast.success('Task updated successfully', {position: 'bottom-right',
                style: {backgroundColor: '#333', color: '#fff'}
                })
        } else {
            await CreateTask(data)
            toast.success('Task created successfully',
                {position: 'bottom-right',
                style: {backgroundColor: '#333', color: '#fff'}
                }
            )
        }
        navigate('/tasks')
    })

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                console.log('obteniendo datos')
                const res = await getTask(params.id)
                console.log(res)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
            }
        }
        loadTask()
    }, [params.id])

    return (
      <div><form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Write a title'
        {...register('title', {required: true  })}
        />
        {errors.title && <span>This field is required</span>}
        <textarea placeholder='Write a description' rows="3"
        {...register('description', {required: true  })}
        ></textarea>
        {errors.description && <span>This field is required</span>}
        <button type='submit'>Save</button>
        </form>
       {
        params.id && (
            <button onClick={ async () => {
                const confirm = window.confirm("Are you sure you want to delete this task?")
                if (confirm) {
                    await deleteTask(params.id)
                    toast.success('Task deleted successfully', {position: 'bottom-right',
                        style: {backgroundColor: '#333', color: '#fff'}
                        })
                    navigate('/tasks')
                }}}
                >Delete</button>
        )
       }
        </div>
    )
  }
  