import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Admin as AdminLayOut } from './layouts';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';

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

import {
    Dashboard as DashboardAdmin,
    MemberList as MemberListAdmin,
    MemberRegistration,
    MemberUpdate as MemberUpdateAdmin,
    AdminRegistration,
    AdminList,
    AdminUpdate,
} from './views/Admin';

const Routes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);

    const session = useSelector(state => state.session, []) || [];
    const authenticated = session.authenticated;

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
                path="/boardView/:bno"
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
                    path="/boardUpdate/:bno"
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

            <RouteWithLayout 
                component={DashboardAdmin}
                exact
                layout={AdminLayOut}
                path="/admin"
            />

            <RouteWithLayout 
                component={MemberListAdmin}
                exact
                layout={AdminLayOut}
                path="/memberList"
            />

            <RouteWithLayout 
                component={AdminRegistration}
                exact
                layout={AdminLayOut}
                path="/admin-registration"
            />

            <RouteWithLayout 
                component={AdminList}
                exact
                layout={AdminLayOut}
                path="/admin-list"
            />

            <RouteWithLayout 
                component={AdminUpdate}
                exact
                layout={AdminLayOut}
                path="/admin-update/:id"
            />

            <RouteWithLayout 
                component={MemberRegistration}
                exact
                layout={AdminLayOut}
                path="/member-registration"
            />

            <RouteWithLayout 
                component={MemberUpdateAdmin}
                exact
                layout={AdminLayOut}
                path="/member-update/:id"
            />

            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;