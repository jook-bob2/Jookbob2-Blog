import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import brdSessionReducer from './brdSessionReducer';
import replyListReducer from './replyListReducer';
import adminListReducer from './admin/adminListReducer';
import adminFilterReducer from './admin/adminFilterReducer';
import adminListPageReducer from './admin/adminListPageReducer';
import memberListReducer from './admin/memberListReducer';
import memberFilterReducer from './admin/memberFilterReducer';
import memberListPageReducer from './admin/memberListPageReducer';
import boardListReducer from './admin/boardListReducer';
import boardFilterReducer from './admin/boardFilterReducer';
import boardListPageReducer from './admin/boardListPageReducer';
import adminAuthReducer from './admin/adminAuthReducer';
import noticeListReducer from './admin/noticeListReducer';
import noticeFilterReducer from './admin/noticeFilterReducer';
import noticeListPageReducer from './admin/noticeListPageReducer';
import menuListReducer from './admin/menuListReducer';
import menuFilterReducer from './admin/menuFilterReducer';
import menuListPageReducer from './admin/menuListPageReducer';
import boardKindsListReducer from './admin/boardKindsListReducer';
import boardKindsFilterReducer from './admin/boardKindsFilterReducer';
import boardKindsListPageReducer from './admin/boardKindsListPageReducer';
import frontBoardListReducer from './front/frontBoardListReducer';
import frontBoardListPageReducer from './front/frontBoardListPageReducer';
import frontBoardFilterReducer from './front/frontBoardFilterReducer';
import frontViewMemberReducer from './front/frontViewMemberReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    brdSession: brdSessionReducer,
    replyList: replyListReducer,
    adminList: adminListReducer,
    adminFilter: adminFilterReducer,
    adminListPage: adminListPageReducer,
    memberList: memberListReducer,
    memberFilter: memberFilterReducer,
    memberListPage: memberListPageReducer,
    boardList: boardListReducer,
    boardFilter: boardFilterReducer,
    boardListPage: boardListPageReducer,
    adminAuth: adminAuthReducer,
    noticeList: noticeListReducer,
    noticeFilter: noticeFilterReducer,
    noticeListPage: noticeListPageReducer,
    frontBoardList: frontBoardListReducer,
    frontBoardListPage: frontBoardListPageReducer,
    frontBoardFilter: frontBoardFilterReducer,
    menuList: menuListReducer,
    menuFilter: menuFilterReducer,
    menuListPage: menuListPageReducer,
    boardKindsList: boardKindsListReducer,
    boardKindsFilter: boardKindsFilterReducer,
    boardKindsListPage: boardKindsListPageReducer,
    frontViewMember: frontViewMemberReducer
});

export default rootReducer;