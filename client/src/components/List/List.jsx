import React, {useContext} from "react";
import classNames from "classnames";
import {Badge} from "../Badge/Badge";
import removeSvg from '../../assets/img/remove.svg'
import {deleteLists, getLists} from '../../http/listAPI'
import {toJS} from "mobx";
import "./List.scss";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";


export const List = observer(({items, isRemovable, onClick, onClickItem, activeItem}) => {

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

    // console.log(toJS((items)))
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

                    onClick={onClickItem ? () => onClickItem(i) : null}
                >
                    {/*<i>{i.icon ? i.icon : <Badge color={i.color.name}/>}</i>*/}
                    <span>{i.name}{i.tasks && `(${i.tasks.length})`}</span>

                    {isRemovable &&
                    <img className='list__remove-icon' src={removeSvg} alt="remove" onClick={() => removeList(i.id)}/>}
                </li>
            ))
            }
        </ul>
    )
})
