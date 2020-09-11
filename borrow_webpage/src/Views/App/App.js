import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import ViewGroup from '../../Components/ViewGroup';
import CreateGroupForm from '../../Components/CreateGroupForm';
import * as serviceWorker from '../../serviceWorker';

const App = props => {
    return (
        <div>
            <ViewGroup/>
            <CreateGroupForm/>
        </div>
        );
};

export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
