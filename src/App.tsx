import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {rootStateType} from "./redux/state";



// точка входа - index.tsx - куда передан  самописный компонент App с данными ot state.ts
// BrowserRouter  необходим для отрисовки   Route,  предназначенного для перехода между компонентами SPA
// Header -  компонент отрисовки  шапки  SPA
// Profile - компонент " Профиль"
// Dialogs - "Диалоги"
// News - "Новости"
// Music - "Музыка"
// Settings - "Настройки"

type Apptype ={
    state:rootStateType
    addPost:(postMessage: string) => void
}

const App: React.FC<Apptype>=(props) =>{
    // let friends = props.state.sidebar.navbar.friends
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar friends={props.state.sidebar.friends} />
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={() => <Profile
                        state={props.state.profilePage}
                        addPost={props.addPost} />}/>
                    <Route path='/messages' render={() => <Dialogs state={props.state.dialogsPage} />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
