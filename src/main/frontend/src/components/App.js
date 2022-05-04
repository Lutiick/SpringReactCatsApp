import React, { Component } from 'react';
import CatGallery from "./CatGallery";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import EditForm from "./EditForm";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={CatGallery}/>
                    <Route path='/cats/edit/:id' component={EditForm}/>
                </Switch>
            </Router>
        )
    }
}

export default App;