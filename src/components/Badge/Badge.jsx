import React from 'react'
import cn from 'classnames';

import './Badge.scss'

export const Badge = ({ color, onClick,className }) => {
    return (
        <i onClick={onClick} 
        className={cn('badge', { [`badge--${color}`]: color }, className)}></i>
    )
}