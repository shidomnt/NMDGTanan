import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from "react-router-dom";
import NotFound from './NotFound';
import IP from './IP';
import Header from '../Layout/Header'
import App from './App';
import Lichtruc from './Lichtruc';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Header/>
                        <div className='container'>
                            <Switch>
                                <Route exact path="/" component={IP} />
                                <Route exact path="/Lichtruc" component={Lichtruc} />
                                <Route exact path= "*" component={NotFound}></Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
