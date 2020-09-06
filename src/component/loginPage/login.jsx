import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/formsControl/formsControl";
import {connect} from "react-redux";
import classes from '../../common/formsControl/formsControl.module.css';
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import LoggedInContainer from "../loggedIn/loggedInContainer";







const Login = (props) => {
    const onSubmit = (formData) =>{
        props.login(formData.email, formData.password, formData.rememberMe)
    }


    if(props.isAuth){
       return <LoggedInContainer/>
    }

    return (
        <container className={classes.container}>
            <h1>Linked<span className={classes.span}>in</span></h1>
            <h2>Welcome Back</h2>
            <p>Don't miss your next opportunity. Sign in to stay updated on your professional world.</p>
            <LoginReduxForm onSubmit={onSubmit}/>
        </container>
    )
}

const maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field className={classes.input} validate={[required, maxLength30]} component={Input}  placeholder={'Email'} name={'email'}/></div>
            <div><Field className={classes.input} validate={[required, maxLength30]}  component={Input} placeholder={'Password'} type={'password'} name={'password'}/></div>
            { props.error && <div className={classes.formSummaryError}>
                {props.error}
            </div>}
            <div className={classes.flex}><Field  component={Input} type={'checkbox'} name={'rememberMe'}/> <div>remember me</div></div>

            <div>
                <button className={classes.button}>Sign in</button>
            </div>

        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);

