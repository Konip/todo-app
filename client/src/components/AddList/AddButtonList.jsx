import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import closeSvg from '../../assets/img/close.svg';
import {Badge} from '../Badge/Badge';
import {List} from '../List/List';
import {createList, getLists} from '../../http/listAPI'
import "./AddButtonList.scss";
import db from '../../assets/db.json';
import {Context} from "../../index";

export const AddList = () => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState('#C9D1D3')
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const colors  = db.colors

    const {lists} = useContext(Context)

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].hex)
        }
    }, [])

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].hex)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Браток давай текст')
            return
        }

        setIsLoading(true)
        createList(inputValue, selectedColor)
            .then(() => {
                getLists().then(data => lists.setLists(data))
                onClose()
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
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                  <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                              </svg>
                          ),
                          name: 'Добавить список',
                      }
                  ]}
            />

            {visiblePopup &&
            <div className="add-list__popup">
                <img onClick={onClose} className='add-list__popup-close-btn' src={closeSvg} alt="close btn"/>

                <input className="field" placeholder="Название списка"
                       value={inputValue} onChange={e => setInputValue(e.target.value)}/>

                <div className="add-list__popup-colors">
                    {colors.map(({hex}) => (
                            <Badge onClick={() => selectColor(hex)} key={hex}
                                   hex={hex} className={selectedColor === hex && 'active'}/>
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