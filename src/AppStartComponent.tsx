import React from 'react';
import store from "./redux/redux-store";
import { Provider} from "react-redux";
import App from "./App";


const AppStartComponent = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}
export default AppStartComponent
