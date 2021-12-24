import React, {useContext} from 'react'
import "./Tasks.scss"
import editSvg from '../../assets/img/edit.svg'
import {AddTasksForm} from './AddTasksForm'
import {Task} from './Task'
import {Link, useHistory} from 'react-router-dom';
import {Context} from "../../index";
import {renameLists, getLists} from '../../http/listAPI'
import {observer} from "mobx-react-lite";

export const Tasks = observer(({list, tasks, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {

    const {lists} = useContext(Context)
    const history = useHistory();

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
            renameLists(list.id, newTitle)
                .then(() => {
                    getLists().then(data => lists.setLists(data))
                    history.push(`/lists/${list.id}`)
                })
                .catch(() => {
                    alert('Не удалось обновить название списка')
                })
        }
    }

    return (
        <div className="tasks">

            <Link to={`/lists/${list.id}`}>
                <h2 style={{color: list.color}} className="tasks__title">
                    {list.name}
                    <img src={editSvg} alt="edit" onClick={editTitle}/>
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && tasks && !tasks.length && <h2>Задачи отсутствуют</h2>}

                {tasks &&
                tasks.map(task =>
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
