import React from "react";
import classNames from "classnames";
import { Badge } from "../Badge/Badge";
import removeSvg from '../../assets/img/remove.svg'

import "./List.scss";


export const List = ({ items, isRemovable, onClick, onRemove }) => {

  const removeList = (i) => {
    if (window.confirm("удалить?")) {
      onRemove(i)
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {
        items.map((i, index) => (
          <li key={index} className={classNames(i.className, { 'active': i.active })}>
            <i>{i.icon ? i.icon : <Badge color={i.color} />}</i>
            <span>{i.name}</span>

            { isRemovable &&
              <img className='list__remove-icon' src={removeSvg} alt="remove" onClick={() => removeList(i)} />}
          </li>
        ))
      }
    </ul>

  )


};
