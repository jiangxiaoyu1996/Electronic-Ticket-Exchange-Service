import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import promise from 'redux-promise';
import * as serviceWorker from './serviceWorker';

import SignIn from "./containers/sign-in/container";
import Login from "./containers/login/container";
import Profile from "./containers/profile/container";
import Search from "./containers/search/container";
import Event from "./containers/event/container";
import Main from "./components/main";
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const myApp = (
    <div>
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/event" component={Event}/>
                        <Route path="/sign-in" component={SignIn}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Main}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    </div>
);

ReactDOM.render(myApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

