import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import 'antd/dist/antd.css'

import rootReducer from "./rootReducer";
import Main from './pages/Main/Main';
import reportWebVitals from './reportWebVitals';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
