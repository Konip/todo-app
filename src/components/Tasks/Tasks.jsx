import React from 'react'
import "./Tasks.scss"
import editSvg from '../../assets/img/edit.svg'
import axios from 'axios'
import { AddTasksForm } from './AddTasksForm'
import { Task } from './Task'
import { Link } from 'react-router-dom';


export const Tasks = ({ list, onEditTitle, oneAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {

    const editTitle = () => {
        const netTitle = window.prompt('Название списка', list.name)
        if (netTitle) {
            onEditTitle(list.id, netTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: netTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }

    return (
        <div className="tasks">

            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img src={editSvg} alt="edit" onClick={editTitle} />
                </h2>
            </Link>


            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}

                {list.tasks &&
                    list.tasks.map(task =>
                    (
                        <Task key={task.id} list={list} {...task} onCompleteTask={onCompleteTask}
                            onRemoveTask={onRemoveTask} onEditTask={onEditTask}
                        />
                    ))
                }
                <AddTasksForm key={list.id} list={list} oneAddTask={oneAddTask} />
            </div>
        </div>
    )
}
