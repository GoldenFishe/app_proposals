import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'

import {rootReducer} from "./rootReducer";
import Main from './pages/Main/Main';
import reportWebVitals from './reportWebVitals';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
