import React, { useState, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
    Dashboard as DashboardView,
    NotFound as NotFoundView,
    BoardList as BoardListView,
    SignIn as SignInView,
    SignUp as SignUpView
} from './views';
import {post} from 'axios';

const Routes = () => {

    const [auth, setAuthenticated] = useState({
        authenticated : true
    });
    
    useEffect(() => {
        
        getSession()
          .then(res => {
            setAuthenticated({
                authenticated: res.data === "" ? false : true
            });
          });
    }, []);

    const getSession = () => {
        return post('member/session', null);
    }

    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/dashboard"
            />
            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
            />

            <RouteWithLayout
                component={BoardListView}
                exact
                layout={MainLayout}
                path="/boardList"
            />
            {auth.authenticated ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignInView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-in"
                />}
            {auth.authenticated ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignUpView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-up"
                />}
            

            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />
            

            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;