import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from 'common/store';

import App from './component';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

render();

export default render;
