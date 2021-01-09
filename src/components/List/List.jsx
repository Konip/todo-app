import React from "react";
import "./List.scss"

export const List = ({ items }) => {
  return (
    <ul class="list">
      {
        items.map(i => (
          <li className={i.active && 'active'}>
            <i>{i.icon ? i.icon: <i className={`badge badge--${i.color}`}></i>}</i>
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
