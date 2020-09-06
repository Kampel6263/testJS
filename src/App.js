import React from 'react';

import './App.css';
import Login from "./component/loginPage/login";
import Preloader from "./common/preloader/preloader";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <div>
               <Login/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    initialized: state.app.initialized
})

export default  connect(mapStateToProps, {initializeApp})(App);
