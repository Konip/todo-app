import React from "react";
import "./List.scss";
import classNames from "classnames";

export const List = ({ items, isRemovable, className }) => {
  return (
    <ul className="list">
      {
        items.map((i, index) => (
          <li key={index} className={classNames(i.className,{'active' : i.active})}>
            <i>{i.icon ? i.icon : <i className={`badge badge--${i.color}`}></i>}</i>
            <span>{i.name}</span>
          </li>
        ))
      }
      <li>
        <span></span>
      </li>
    </ul>

  )


};
