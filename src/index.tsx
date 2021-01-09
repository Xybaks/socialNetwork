import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {subscribe, updateNewPostText} from './redux/state'
import {addPost} from './redux/state'
import state from './redux/state'


export const renderTree =()=>{
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 updateNewPostText={updateNewPostText}
                 addPost={addPost}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

renderTree()

subscribe(renderTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export {}