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

const rootReducer = combineReducers({
    session: sessionReducer,
    brdSession: brdSessionReducer,
    replyList: replyListReducer,
    adminList: adminListReducer,
    adminFilter: adminFilterReducer,
    adminListPage: adminListPageReducer,
    memberList: memberListReducer,
    memberFilter: memberFilterReducer,
    memberListPage: memberListPageReducer
});

export default rootReducer;