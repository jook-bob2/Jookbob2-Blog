import React from 'react';
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

const Routes = (props) => {
    const { authenticated } = props;

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

            {authenticated ? 
                <RouteWithLayout
                    component={BoardInsertView}
                    exact
                    layout={MainLayout}
                    path="/boardInsert"
                />
                :
                null
            }

            {authenticated ? 
                <RouteWithLayout
                    component={BoardUpdateView}
                    exact
                    layout={MainLayout}
                    path="/boardUpdate"
                />
                :
                null
            }

            
            {authenticated ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignInView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-in"
                />
            }
            {authenticated ? 
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