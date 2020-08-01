import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import brdSessionReducer from './brdSessionReducer';
import replyListReducer from './replyListReducer';
import adminListReducer from './adminListReducer';
import adminFilterReducer from './adminFilterReducer';
import adminListPageReducer from './adminListPageReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    brdSession: brdSessionReducer,
    replyList: replyListReducer,
    adminList: adminListReducer,
    adminFilter: adminFilterReducer,
    adminListPage: adminListPageReducer
});

export default rootReducer;