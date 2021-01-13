import React, { useState, useEffect } from 'react';
import "./App.css";
import { AddList } from "./components/AddList/AddButtonList";
import { List } from "./components/List/List";
import { Tasks } from './components/Tasks/Tasks';
import axios from 'axios'
import { Route, useHistory } from 'react-router-dom';



function App() {

    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setactiveItem] = useState(null)
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
            setLists(data)
        })

        axios.get('http://localhost:3001/colors').then(({ data }) => {
            setColors(data)
        })
    }, [])

    const oneAddList = (obj) => {
        const newList = [...lists, obj]
        setLists(newList)
    }
    const oneAddTask = (listId, taskObj) => {
        const newList = lists.map(i => {
            if (i.id === listId) {
                i.tasks = [...i.tasks, taskObj]
            }
            return i
        })
        setLists(newList)

    }
    const oneEditListTitle = (id, title) => {
        const newList = lists.map(i => {
            if (i.id === id) {
                i.name = title
            }
            return i
        })
        setLists(newList)
    }
    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Вы действительно хотите удалить задачу?')) {
            const newList = lists.map(i => {
                if (i.id === listId) {
                    i.tasks = i.tasks.filter(task => task.id !== taskId)
                }
                return i
            })
            setLists(newList)
            axios.delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => {
                    alert('Не удалось удалить задачу')
                })
        }
    }
    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Текст задачи', taskObj.text)

        if(!newTaskText){
            return
        }
        
        const newList = lists.map(i => {
            if (i.id === listId) {
                i.tasks = i.tasks.map(task => {
                    if (task.id === taskObj.id) {
                        task.text = newTaskText
                    }
                    return task
                })
            }
            return i
        })
        setLists(newList)
        axios.patch('http://localhost:3001/tasks/' + taskObj.id, { text: newTaskText })
            .catch(() => {
                alert('Не удалось изменить задачу')
            })

    }

    return (
        <div className="todo" >
            <div className="todo__sidebar">

                {/* шапка sidebar */}
                <List
                    onClickItem={item => {
                        history.push(`/`)
                    }}

                    items={[
                        {
                            active: true,
                            icon: (
                                <svg width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                                        fill="black" />
                                </svg>
                            ),
                            name: 'Все задачи',
                        }
                    ]} />

                {/* список задач */}
                {lists ?
                    <List items={lists} isRemovable={true}
                        onClickItem={item => {
                            history.push(`/lists/${item.id}`)
                            setactiveItem(item)
                        }}

                        activeItem={activeItem}
                        onRemove={id => {
                            const newLists = lists.filter(list => list.id !== id)
                            setLists(newLists)
                        }}
                    /> : 'Загрузк...'
                }

                {/* добавить задачу */}
                <AddList oneAddList={oneAddList} colors={colors} />
            </div>

            <div className="todo__tasks">
                <Route exact path='/'>
                    {lists &&
                        lists.map(list => (
                            <Tasks key={list.id} list={list} onEditTitle={oneEditListTitle} oneAddTask={oneAddTask}
                                withoutEmpty
                            />
                        ))
                    }
                </Route>

                <Route path='/lists/:id'>
                    {lists && activeItem &&
                        <Tasks activeItem={activeItem} onEditTitle={oneEditListTitle} oneAddTask={oneAddTask}
                            onRemoveTask={onRemoveTask} onEditTask={onEditTask}
                        />}
                </Route>
            </div>
        </div>
    )
}


export default App;