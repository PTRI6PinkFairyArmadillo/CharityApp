import React from "react";
import { Provider } from 'react-redux';
import store from './store';
import * as ReactDOMClient from 'react-dom';

import App from "./App"

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
    <Provider store = {store}>
        <App />
    </Provider>
);