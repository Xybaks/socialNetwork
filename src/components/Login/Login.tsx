import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {RootReduxStateType} from "../../redux/redux-store";
import style from "../common/FormsControls/FormsControls.module.css"

type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <Field
                placeholder="Email"
                name={"email"}
                component={Input}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                placeholder="Password"
                name={"password"}
                component={Input}
                validate={[required]}
                type="password"
            />
        </div>
        <div>
            <Field type="checkbox" name={"rememberMe"} component={"input"}/>
        </div>
        {error &&
        <div className={style.formSummaryError}>
            Error
        </div>
        }
        <button>LogIn</button>
    </form>
}

//оборачивание нашей формы с помощью reduxForm
const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)


type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <div>Just do it! ^^</div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: RootReduxStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);

