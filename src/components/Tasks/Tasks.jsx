import React from 'react'
import "./Tasks.scss"
import editSvg from '../../assets/img/edit.svg'

export const Tasks = ({ list, }) => {


    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                <img src={editSvg} alt="edit" />
            </h2>
            <div className="tasks__items">
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
            </div>
        </div>
    )
}
