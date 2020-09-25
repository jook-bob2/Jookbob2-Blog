import React, { useEffect, useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { post } from 'axios';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Admin as AdminLayOut } from './layouts';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import { getAdminAuth } from 'store/actions/admin/adminList';

import {
    Dashboard as DashboardView,
    NotFound as NotFoundView,
    BoardList as BoardListView,
    SignIn as SignInView,
    SignUp as SignUpView,
    Setting as SettingView,
    BoardView,
    BoardInsert as BoardInsertView,
    BoardUpdate as BoardUpdateView,
    NoticeView
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
    NoticeRegistration as NoticeRegistrationAdmin,
    BoardUpdate as BoardUpdateAdmin,
    SignIn as SignInAdmin,
    NoticeList as NoticeListAdmin,
    NoticeUpdate as NoticeUpdateAdmin,
    MenuList as MenuListAdmin,
    BoardKinds
} from './views/Admin';

const Routes = () => {
    const dispatch = useDispatch();

    const [pathFlag, setFlag] = useState(0);

    const [boardKind, setBoardKind] = useState({
        path: []
    });

    useEffect(() => {
        post(`/board/getBoardKind`)
            .then(res => {
                const pathList = Array.from(res.data.pathList);
                setBoardKind({
                    path: pathList
                });
                setFlag(1);
            })
            .catch(err => {
                throw(err);
            });
    }, []);

    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getAdminAuth());
    }, [dispatch]);

    const userSession = useSelector(state => state.session, '') || '';
    const userAuth = userSession.authenticated;

    const adminSession = useSelector(state => state.adminAuth, '') || '';
    const adminAuth = adminSession.authenticated;

    const GoToUserSignPage = () => <Redirect to="/sign-in" />;
    const GoToAdminSignPage = () => <Redirect to="/admin/sign-in" />;

    const mappingRoute = (paths) => {
        return paths.map((path, index) => {
            return <RouteWithLayout
                key={index}
                component={BoardListView}
                exact
                layout={MainLayout}
                path={path.brdText}
                group={path.showText}
                isAllow={true}
                user={true}
            />;
        })
    };

    return (
        <Switch>
            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/"
                isAllow={true}
                user={true}
            />

            {Array.isArray(boardKind.path) && boardKind.path.length !== 0 ? mappingRoute(boardKind.path) : null}

            <RouteWithLayout
                component={BoardView}
                exact
                layout={MainLayout}
                path="/boardView/:bno"
                isAllow={true}
                user={true}
            />

            <RouteWithLayout
                component={NoticeView}
                exact
                layout={MainLayout}
                path="/noticeView/:noticeNo"
                isAllow={true}
                user={true}
            />
            
            <RouteWithLayout
                component={BoardInsertView}
                exact
                layout={MainLayout}
                path="/boardInsert/:brdCode"
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
                group="회원 정보 수정"
                boardUse={false}
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

            {/* Admin Router Area*/}

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
                component={MenuListAdmin}
                exact
                layout={AdminLayOut}
                path="/front-menuList"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />

            <RouteWithLayout 
                component={BoardKinds}
                exact
                layout={AdminLayOut}
                path="/boardKind-list"
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

            <RouteWithLayout 
                component={NoticeUpdateAdmin}
                exact
                layout={AdminLayOut}
                path="/notice-update/:id"
                fallback={GoToAdminSignPage}
                isAllow={adminAuth}
                admin={true}
            />     

            {pathFlag !== 0 ? <Redirect to="/not-found" /> : null}
        </Switch>
    );
};

export default Routes;