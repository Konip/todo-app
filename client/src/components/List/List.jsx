import React, {useContext} from "react";
import classNames from "classnames";
import removeSvg from '../../assets/img/remove.svg'
import {deleteLists, getLists} from '../../http/listAPI'
import "./List.scss";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";


export const List = observer(({items, isRemovable, onClick, setActiveList, activeItem}) => {

    const {lists} = useContext(Context)
    const history = useHistory()

    const removeList = (id) => {
        if (window.confirm("удалить?")) {
            deleteLists(id)
                .then(() => {
                    getLists().then(data => lists.setLists(data))
                    history.push('/')
                })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {items &&
            items.map((i, index) => (
                <li key={index} className={classNames(i.className,
                    {
                        active: i.active
                            ? i.active
                            : activeItem && activeItem.id === i.id
                    })}
                    onClick={setActiveList ? () => setActiveList(i.id) : null}
                >
                    <i>{i.icon && i.icon}</i>
                    <span>{i.name && i.name}</span>

                    {isRemovable &&
                    <img className='list__remove-icon' src={removeSvg} alt="remove" onClick={() => removeList(i.id)}/>}
                </li>
            ))
            }
        </ul>
    )
})
