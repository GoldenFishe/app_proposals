import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Main from './pages/Main/Main';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <StrictMode>
        <Main/>
    </StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
