import React from "react";
import classNames from "classnames";
import { Badge } from "../Badge/Badge";
import removeSvg from '../../assets/img/remove.svg'
import axios from 'axios'

import "./List.scss";


export const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem, }) => {

  const removeList = (i) => {
    if (window.confirm("удалить?")) {
      axios.delete('http://localhost:3001/lists/' + i.id).then(() => {
        onRemove(i.id)
      })

    }
  }

  return (
    <ul onClick={onClick} className="list">
      {
        items.map((i, index) => (
          <li key={index} className={classNames(i.className,
            {
              active: i.active
                ? i.active
                : activeItem && activeItem.id === i.id
            })}

            onClick={onClickItem ? () => onClickItem(i) : null}
          >
            <i>{i.icon ? i.icon : <Badge color={i.color.name} />}</i>
            <span>{i.name}{i.tasks && ` (${i.tasks.length})`}</span>

            { isRemovable &&
              <img className='list__remove-icon' src={removeSvg} alt="remove" onClick={() => removeList(i)} />}
          </li>
        ))
      }
    </ul>

  )


};
