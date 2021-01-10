import React from "react";
import classNames from "classnames";
import { Badge } from "../Badge/Badge";

import "./List.scss";


export const List = ({ items, isRemovable, className, onClick }) => {
  return (
    <ul onClick={onClick} className="list">
      {
        items.map((i, index) => (
          <li key={index} className={classNames(i.className,{'active' : i.active})}>
            <i>{i.icon ? i.icon : <Badge color={i.color}/>}</i>
            <span>{i.name}</span>
          </li>
        ))
      }
    </ul>

  )


};
