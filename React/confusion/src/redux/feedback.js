import * as ActionTypes from './ActionTypes';

export const Feedback = (state = {
    errMess: null,
    feedback: []
}, action) => {
    switch(action.type) {
         case ActionTypes.ADD_FEEDBACK:
            return {...state, isLoading: false, errMess: null, feedback: action.payload}
        case ActionTypes.COMMENTS_FAILD:
            return {...state, isLoading: false, errMess: action.payload, feedback: []}
        default:
            return state;
    }
}