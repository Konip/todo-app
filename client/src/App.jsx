import React, {useEffect, useContext} from 'react';
import {Route, useHistory, Switch} from 'react-router-dom';
import "./App.css";
import {AddList} from "./components/AddList/AddButtonList";
import {List} from "./components/List/List";
import {Tasks} from './components/Tasks/Tasks';
import {getLists, renameLists} from './http/listAPI'
import {deleteTask, renameTask, completedTask} from './http/taskAPI'
import {Context} from "./index";
import {observer} from "mobx-react-lite";


const App = observer(() => {

        let history = useHistory();
        const {lists} = useContext(Context)
        const [all, setAll] = React.useState(false)

        useEffect(() => {
            getLists().then(data => lists.setLists(data))
        }, [])

        const setActiveList = (id) => {
            if (id) {
                lists.setActiveItem(id)
                history.push(`/lists/${id}`)
            } else {
                lists.setActiveItem([])
                history.push(`/`)
                setAll(true)
            }
        }

        const onRemoveTask = (taskId) => {
            if (window.confirm('Вы действительно хотите удалить задачу?')) {

                deleteTask(taskId)
                    .then(() => {
                        getLists().then(data => {
                            lists.setLists(data)
                            lists.setActiveItem(lists.activeList.id)
                        })
                    })
            }
        }

        const onEditTask = (taskId, text) => {
            const newTaskText = window.prompt('Текст задачи', text)
            if (!newTaskText) return

            renameTask(taskId, newTaskText)
                .then(() => {
                    getLists().then(data => {
                        lists.setLists(data)
                        lists.setActiveItem(lists.activeList?.id)
                    })
                })
                .catch(() => {
                    alert('Не удалось изменить задачу')
                })
        }

        const onCompleteTask = (taskId, status) => {
            completedTask(taskId, status)
                .then(() => {
                    getLists().then(data => {
                        lists.setLists(data)
                        if (lists.activeList.id) {
                            lists.setActiveItem(lists.activeList.id)
                        }
                    })
                })
                .catch(() => {
                    alert('Не удалось изменить задачу')
                })
        }


        const editTitle = (name, id) => {
            const newTitle = window.prompt('Название списка', name)
            if (newTitle) {
                renameLists(id, newTitle)
                    .then(() => {
                        getLists().then(data => {
                            lists.setLists(data)
                            if (lists.activeList) {
                                lists.setActiveItem(lists.activeList.id)
                                history.push(`/lists/${lists.activeList.id}`)
                            }
                        })
                    })
                    .catch(() => {
                        alert('Не удалось обновить название списка')
                    })
            }
        }

        return (
            <div className="todo">
                <div className="todo__sidebar">
                    <List
                        setActiveList={setActiveList}
                        items={[
                            {
                                active: history.location.pathname === '/',
                                icon: (
                                    <svg width="18"
                                         height="18"
                                         viewBox="0 0 18 18"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                                            fill="black"/>
                                    </svg>
                                ),
                                name: 'Все задачи',
                            }
                        ]}
                    />

                    {lists.lists ?
                        <List items={lists.lists} isRemovable activeItem={lists.activeList}
                              setActiveList={setActiveList}
                        /> : 'Загрузк...'
                    }

                    <AddList/>
                </div>

                <div className="todo__tasks">
                    <Switch>
                        <Route exact path='/'>
                            {
                                lists.lists.map(list => (
                                    <Tasks key={list.id} list={list}
                                           withoutEmpty onRemoveTask={onRemoveTask} onEditTask={onEditTask}
                                           onCompleteTask={onCompleteTask} all={all} editTitle={editTitle}
                                    />
                                ))
                            }
                        </Route>

                        <Route path="/lists/:id">
                            {lists.activeList &&
                            <Tasks list={lists.activeList} editTitle={editTitle}
                                   onRemoveTask={onRemoveTask} onEditTask={onEditTask} onCompleteTask={onCompleteTask}
                            />}
                        </Route>

                        <Route path="*">
                            {() => history.push('/')}
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
)

export default App;