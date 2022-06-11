import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from 'react-redux-form';
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import { Feedback } from "./feedback";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initialFeedback } from "./forms";

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            feedback: Feedback,
            ...createForms({
                feedback: initialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}