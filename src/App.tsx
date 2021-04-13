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
import {RootReduxStateType} from "./redux/redux-store";
import {connect} from "react-redux";
import PreLoader from "./components/common/PreLoader/PreLoader";
import {initializeApp} from "./redux/appReducer";

// точка входа - index.tsx - куда передан компонент AppStartComponent с данными ot store.ts


// BrowserRouter  необходим для отрисовки   Route,  предназначенного для перехода между компонентами SPA
// HeaderContainer -  компонент-контейнер отрисовки  шапки  SPA
// Profile - компонент " Профиль"
// DialogsContainer -  компонент-контейнер "Диалоги"
// News - "Новости"
// Music - "Музыка"
// Settings - "Настройки"

class App extends React.Component<AppPropsType, {}> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <PreLoader/>
        else return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar
                    />
                    <div className='app-wrapper-content'>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/messages' render={() => <DialogsContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                    </div>
                </div>
            </BrowserRouter>

        );
    }

}

type AppPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: RootReduxStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})
type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}


export default connect(mapStateToProps, {initializeApp})(App);
