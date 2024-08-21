import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './dashboard.jsx';
import "./App.css"

function App() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
}

export default App;