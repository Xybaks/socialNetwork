import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";

type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder="Login" name={"login"} component={"input"}/>
        </div>
        <div>
            <Field placeholder="Password" name={"password"} component={"input"}/>
        </div>
        <div>
            <Field type="checkbox" name={"rememberMe"} component={"input"}/>
        </div>
        <button>LogIn</button>
    </form>
}


const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)

const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return <div>
        <h1>LOGIN</h1>
        <div>Just do it! ^^</div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;