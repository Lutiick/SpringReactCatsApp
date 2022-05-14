import React, { Component } from 'react';
import CatGallery from "./CatGallery";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import EditForm from "./EditForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import store from "../service/store";
import {Provider} from "react-redux";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true}>
                        <Provider store={store}>
                            <CatGallery/>
                        </Provider>
                    </Route>
                    <Route path='/cats/edit/:id' component={EditForm}/>
                    <Route path='/login' component={LoginForm} />
                    <Route path='/register' component={RegisterForm} />
                </Switch>
            </Router>
        )
    }
}

export default App;