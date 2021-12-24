import cn from 'classnames';
import React from 'react';
import './Badge.scss';


export const Badge = ({ hex, onClick, className }) => {
    return (
        <i onClick={onClick}
            className={cn('badge', className)}
            style={{ backgroundColor: hex }}
        ></i>
    )
}