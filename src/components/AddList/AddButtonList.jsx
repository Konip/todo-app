import React, { useState } from 'react';
import { Badge } from '../Badge/Badge';
import { List } from '../List/List';
import closeSvg from '../../assets/img/close.svg'

import "./AddButtonList.scss";


export const AddList = ({ colors, oneAddList }) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].id)
    }


    const addList = () => {
        if (!inputValue) {
            alert('Браток давай текст')
            return
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name
        oneAddList({ id: Math.random(), name: inputValue, color: color })
        onClose()
    }


    return (
        <div className="add-list">
            <List onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: (
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ),
                        name: 'Добавить список',
                    }
                ]}
            />

            {visiblePopup &&
                <div className="add-list__popup">
                    <img onClick={onClose} className='add-list__popup-close-btn' src={closeSvg} alt="close btn" />

                    <input className="field" placeholder="Название списка"
                        value={inputValue} onChange={e => setInputValue(e.target.value)} />

                    <div className="add-list__popup-colors">
                        {colors.map(color => (
                            <Badge onClick={() => selectColor(color.id)} key={color.id}
                                color={color.name} className={selectedColor === color.id && 'active'} />
                        )
                        )}
                    </div>

                    <button className='button' onClick={addList}>Добавить</button>
                </div>}
        </div>

    )

}