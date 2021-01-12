import React from 'react'
import "./Tasks.scss"
import editSvg from '../../assets/img/edit.svg'
import axios from 'axios'
import { AddTasksForm } from './AddTasksForm'


export const Tasks = ({ list, onEditTitle }) => {

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

            <h2 onClick={editTitle} className="tasks__title">
                {list.name}
                <img src={editSvg} alt="edit" />
            </h2>

            <div className="tasks__items">
                {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    list.tasks.map(task =>
                    (
                        <div key={task.id} className="tasks__items-row">
                            <div className="checkbox">
                                <input id={`taks-${task.id}`} type="checkbox" />
                                <label htmlFor={`taks-${task.id}`}>
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </label>
                            </div>
                            <input readOnly value={task.text} />
                        </div>
                    ))
                }
                <AddTasksForm />
            </div>
        </div>
    )
}
