import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import SignIn from "./components/sign-in";
import Login from "./components/login";
import Main from "./components/main";
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const myApp = (
    <div>
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Switch>
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

