import React from "react";

const Login = () => {
    return <div>
        <h1>LOGIN</h1>
        <div>Just do it! ^^</div>
        <LoginForm/>
    </div>
}

const LoginForm = () => {
    return <form>
        <div>
            <input placeholder="login"/>
        </div>
        <div>
            <input placeholder="password"/>
        </div>
        <div>
            <input type="checkbox"/>
        </div>
        <button>LogIn</button>
    </form>
}

export default Login