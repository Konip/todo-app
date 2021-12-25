import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ListStore from './store/ListStore'
import './index.scss';

export const Context = React.createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        lists: new ListStore(),
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
    , document.getElementById('root')
);

