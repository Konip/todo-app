import React from 'react'
import "./Tasks.scss"
import editSvg from '../../assets/img/edit.svg'
import axios from 'axios'
import { AddTasksForm } from './AddTasksForm'
import { Task } from './Task'


export const Tasks = ({ activeItem, onEditTitle, oneAddTask, withoutEmpty, onRemoveTask, onEditTask }) => {

    const editTitle = () => {
        const netTitle = window.prompt('Название списка', activeItem.name)
        if (netTitle) {
            onEditTitle(activeItem.id, netTitle)
            axios.patch('http://localhost:3001/lists/' + activeItem.id, {
                name: netTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }
    const onEdit = () => {

    }

    return (
        <div className="tasks">

            <h2 style={{ color: activeItem.color.hex }} onClick={editTitle} className="tasks__title">
                {activeItem.name}
                <img src={editSvg} alt="edit" />
            </h2>

            <div className="tasks__items">
                {!withoutEmpty && !activeItem.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    activeItem.tasks.map(task =>
                    (
                        <Task key={task.id} activeItem={activeItem} {...task}
                            onRemoveTask={onRemoveTask} onEditTask={onEditTask}
                        />
                    ))
                }
                <AddTasksForm list={activeItem} oneAddTask={oneAddTask} />
            </div>
        </div>
    )
}
