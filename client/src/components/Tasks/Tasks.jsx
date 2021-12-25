import React, {useContext} from 'react'
import "./Tasks.scss"
import editSvg from '../../assets/img/edit.svg'
import {AddTasksForm} from './AddTasksForm'
import {Task} from './Task'
import {Link} from 'react-router-dom';
import {observer} from "mobx-react-lite";

export const Tasks = observer(({list, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask, editTitle, all}) => {

    return (
        <div className="tasks">
            {list.id &&
            <>
                <Link to={!all ? `/lists/${list.id}` : ''}>
                    <h2 style={{color: list.color}} className="tasks__title">
                        {list.name}
                        <img src={editSvg} alt="edit" onClick={() => editTitle(list.name, list.id)}/>
                    </h2>
                </Link>
            </>
            }

            <div className="tasks__items">
                {!withoutEmpty && !list.tasks && <h2>Задачи отсутствуют</h2>}

                {list.tasks &&
                list.tasks.map(task =>
                    (
                        <Task key={task.id} {...task} onCompleteTask={onCompleteTask}
                              onRemoveTask={onRemoveTask} onEditTask={onEditTask}
                        />
                    ))
                }
                <AddTasksForm key={list.id} list={list}/>
            </div>
        </div>
    )
})
