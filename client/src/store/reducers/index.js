import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import brdSessionReducer from './brdSessionReducer';
import replyListReducer from './replyListReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    brdSession: brdSessionReducer,
    replyList: replyListReducer
});

export default rootReducer;