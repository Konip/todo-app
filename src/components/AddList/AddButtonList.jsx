import React, { useState, useEffect } from 'react';
import { Badge } from '../Badge/Badge';
import { List } from '../List/List';
import closeSvg from '../../assets/img/close.svg'
import axios from 'axios'

import "./AddButtonList.scss";



export const AddList = ({ colors, oneAddList }) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(3)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [])

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

        setIsLoading(true)
        axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name
            const listObj = { ...data, color: { name: color, } }
            oneAddList(listObj)
            onClose()
            setIsLoading()
        })
            .catch(() => {
                alert('Ошибка при добавление списка')
            })
            .finally(() => {
                setIsLoading(false)
            })
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

                    <button disabled={isLoading} className='button' onClick={addList}>
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>

                </div>}
        </div>

    )

}