import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Admin as AdminLayOut } from './layouts';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import { getAdminAuth } from 'store/actions/admin/adminList';

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
    BoardList as BoardListAdmin,
    BoardRegistration as NoticeRegistrationAdmin,
    BoardUpdate as BoardUpdateAdmin,
    SignIn as SignInAdmin,
    NoticeList as NoticeListAdmin
} from './views/Admin';

const Routes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);

    const userSession = useSelector(state => state.session, '') || '';
    const userAuth = userSession.authenticated;

    useEffect(() => {
        dispatch(getAdminAuth());
    }, [dispatch]);

    const adminSession = useSelector(state => state.adminAuth, '') || '';
    const adminAuth = adminSession.authenticated;

    const GoToUserSignPage = () => <Redirect to="/sign-in" />;
    const GoToAdminSignPage = () => <Redirect to="/admin/sign-in" />;

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
                isAllow={true}
                user={true}
            />

            <RouteWithLayout
                component={QnAView}
                exact
                layout={MainLayout}
                path="/qna"
                isAllow={true}
                user={true}
            />
            <RouteWithLayout
                component={AboutJobView}
                exact
                layout={MainLayout}
                path="/aboutJob"
                isAllow={true}
                user={true}
            />
            <RouteWithLayout
                component={TalkLifeView}
                exact
                layout={MainLayout}
                path="/talkLife"
                isAllow={true}
                user={true}
            />
            <RouteWithLayout
                component={BoardView}
                exact
                layout={MainLayout}
                path="/boardView/:bno"
                isAllow={true}
                user={true}
            />
            
            <RouteWithLayout
                component={BoardInsertView}
                exact
                layout={MainLayout}
                path="/boardInsert"
                user={true}
                isAllow={userAuth}
                fallback={GoToUserSignPage}
            />

            <RouteWithLayout
                component={BoardUpdateView}
                exact
                layout={MainLayout}
                path="/boardUpdate/:bno"
                user={true}
                isAllow={userAuth}
                fallback={GoToUserSignPage}
            />
            
            {userAuth ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignInView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-in"
                    isAllow={true}
                    user={true}
                />
            }
            {userAuth ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignUpView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-up"
                    isAllow={true}
                    user={true}
                />
            }
             
            <RouteWithLayout
                component={SettingView}
                exact
                layout={MainLayout}
                path="/setting"
                user={true}
                isAllow={userAuth}
                fallback={GoToUserSignPage}
            />

            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
                isAllow={true}
                user={true}
            />

            {adminAuth ? 
                <Redirect exact from="/" to="/not-found" />
                :
                <RouteWithLayout
                    component={SignInAdmin}
                    exact
                    layout={MinimalLayout}
                    path="/admin/sign-in"
                    isAllow={true}
                    admin={true}
                />
            }

            <RouteWithLayout 
                component={DashboardAdmin}
                exact
                layout={AdminLayOut}
                path="/admin"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={AdminRegistration}
                exact
                layout={AdminLayOut}
                path="/admin-registration"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={AdminList}
                exact
                layout={AdminLayOut}
                path="/admin-list"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={AdminUpdate}
                exact
                layout={AdminLayOut}
                path="/admin-update/:id"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={MemberListAdmin}
                exact
                layout={AdminLayOut}
                path="/memberList"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={MemberRegistration}
                exact
                layout={AdminLayOut}
                path="/member-registration"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={MemberUpdateAdmin}
                exact
                layout={AdminLayOut}
                path="/member-update/:id"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={BoardListAdmin}
                exact
                layout={AdminLayOut}
                path="/boardList"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={NoticeRegistrationAdmin}
                exact
                layout={AdminLayOut}
                path="/notice-registration"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={BoardUpdateAdmin}
                exact
                layout={AdminLayOut}
                path="/board-update/:id"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />    

            <RouteWithLayout 
                component={NoticeListAdmin}
                exact
                layout={AdminLayOut}
                path="/noticeList"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />     

            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;