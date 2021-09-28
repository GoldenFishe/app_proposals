import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import Main from './pages/Main/Main';
import reportWebVitals from './reportWebVitals';
import {store} from "./store";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
