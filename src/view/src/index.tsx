import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk'
import 'antd/dist/antd.css'

import {rootReducer} from "./rootReducer";
import Main from './pages/Main/Main';
import reportWebVitals from './reportWebVitals';
import './index.css';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(rootReducer, composeEnhancers((applyMiddleware(thunk))));

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
