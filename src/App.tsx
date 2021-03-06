import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";


// точка входа - index.tsx - куда передан  самописный компонент App с данными ot store.ts
// BrowserRouter  необходим для отрисовки   Route,  предназначенного для перехода между компонентами SPA
// HeaderContainer -  компонент-контейнер отрисовки  шапки  SPA
// Profile - компонент " Профиль"
// DialogsContainer -  компонент-контейнер "Диалоги"
// News - "Новости"
// Music - "Музыка"
// Settings - "Настройки"

const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar
                />
                <div className='app-wrapper-content'>
                    <Route   path='/profile/:userId?'  render={() => <ProfileContainer/>}/>
                    <Route  path='/messages' render={() => <DialogsContainer/>}/>
                    <Route  path='/users' render={() => <UsersContainer/>}/>
                    <Route  path='/news' render={() => <News/>}/>
                    <Route  path='/music' render={() => <Music/>}/>
                    <Route  path='/settings' render={() => <Settings/>}/>
                    <Route  path='/login' render={() => <LoginPage/>}/>
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
