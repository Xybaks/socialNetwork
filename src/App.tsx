import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {StoreType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";



// точка входа - index.tsx - куда передан  самописный компонент App с данными ot store.ts
// BrowserRouter  необходим для отрисовки   Route,  предназначенного для перехода между компонентами SPA
// Header -  компонент отрисовки  шапки  SPA
// Profile - компонент " Профиль"
// DialogsContainer -  компонент-контейнер "Диалоги"
// News - "Новости"
// Music - "Музыка"
// Settings - "Настройки"
type PropsType = {
    store: StoreType
}

const App: React.FC<PropsType>=(props) =>{
// можно теперь из пропсов вытягивать state  через getState()
// const state = props.store.getState()
debugger
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar friends={props.store.getState().sidebar.friends}
                />
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={() => <Profile store={props.store}/>}/>
                    <Route path='/messages' render={() => <DialogsContainer store={props.store}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
