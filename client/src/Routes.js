import React, { useState, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
    Dashboard as DashboardView,
    NotFound as NotFoundView,
    QnA as QnAView,
    AboutJob as AboutJobView,
    TalkLife as TalkLifeView,
    SignIn as SignInView,
    SignUp as SignUpView,
    Setting as SettingView,
    BoardView,
    BoardInsert as BoardInsertView,
    BoardUpdate as BoardUpdateView
} from './views';

import {post} from 'axios';

const Routes = () => {

    const [auth, setAuthenticated] = useState({
        authenticated : false
    });
    
    useEffect(() => {
        
        getSession()
          .then(res => {
              console.log(res.data);
            setAuthenticated({
                authenticated: res.data === -1 ? false : true
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
                component={QnAView}
                exact
                layout={MainLayout}
                path="/qna"
            />
            <RouteWithLayout
                component={AboutJobView}
                exact
                layout={MainLayout}
                path="/aboutJob"
            />
            <RouteWithLayout
                component={TalkLifeView}
                exact
                layout={MainLayout}
                path="/talkLife"
            />
            <RouteWithLayout
                component={BoardView}
                exact
                layout={MainLayout}
                path="/boardView"
            />

            {auth.authenticated ? 
                <RouteWithLayout
                    component={BoardInsertView}
                    exact
                    layout={MainLayout}
                    path="/boardInsert"
                />
                :
                <Redirect exact from="/" to="/not-found" />
            }

            {auth.authenticated ? 
                <RouteWithLayout
                    component={BoardUpdateView}
                    exact
                    layout={MainLayout}
                    path="/boardUpdate"
                />
                :
                <Redirect exact from="/" to="/not-found" />
            }

            
            {auth.authenticated ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignInView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-in"
                />
            }
            {auth.authenticated ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignUpView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-up"
                />
            }
             
            <RouteWithLayout
                component={SettingView}
                exact
                layout={MainLayout}
                path="/setting"
            />

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