import React, {useState, useContext} from 'react'
import "./Tasks.scss"
import addSvg from '../../assets/img/add.svg'
import {Context} from "../../index";
import {createTask, getOneTask} from '../../http/taskAPI'

export function AddTasksForm({list}) {

    const [visibleForm, setFormVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {tasks} = useContext(Context)

    const toogleFormVisible = () => {
        setFormVisible(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        if (!inputValue) {
            alert('Браток давай текст')
            return
        }

        const obj = {
            listId: list.id,
            name: inputValue,
            completed: false,
        }

        setIsLoading(true)

        createTask(obj)
            .then(() => {
                getOneTask(list.id).then((data) => {
                    tasks.setTasks(data)
                    toogleFormVisible()
                })
            })
            .catch(() => {
                alert('Ошибка при добавление задачи')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="tasks__form">
            {!visibleForm
                ?
                <div onClick={toogleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="add task"/>
                    <span>Новая задача</span>
                </div>
                :
                <div className='tasks__form--block '>
                    <input value={inputValue} className="field" placeholder="Текст задачи"
                           onChange={e => setInputValue(e.target.value)}/>

                    <button disabled={isLoading} onClick={addTask} className='button'>
                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                    </button>
                    <button onClick={toogleFormVisible} className='button button--grey'> Отмена</button>
                </div>
            }
        </div>
    )
}