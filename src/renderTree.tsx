import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {rootStateType} from './redux/state'
import {addPost} from './redux/state'


 export const renderTree =(state:rootStateType)=>{
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 addPost={addPost}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
export default renderTree