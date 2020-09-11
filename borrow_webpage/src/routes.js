import React from 'react';
import { App } from './Views/App/index';
import { Group } from './Views/Group/index';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    < App/>
                </Route>
                <Route exact path="/users/createuser">
                    < Group/>
                </Route>
            </Switch>
        </div>
    );
};