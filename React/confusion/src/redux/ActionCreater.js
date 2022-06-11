import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) =>{
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment   
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(res => {
                if(res.ok) return res;
                else {
                    let error = new Error('Error ' + res.status + ': ' + res.statusText);
                    error.res = res;
                    throw error;
                }
            },
                error => {
                    let errMess = new Error(error.message);
                    throw errMess;
            })
        .then(res => res.json())
        .then(res => dispatch(addComment(res)))
        .catch(error => {
            console.log('Post comment : ', error.message);
            alert('Your Comment Couild not be Posted\n Error ' + error.message);
        })

}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(res => {
            if(res.ok) return res;
            else {
                let error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
        },
            error => {
                let errMess = new Error(error.message);
                throw errMess;
            })
        .then(res => res.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFaild(error.message)));
        
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFaild = (errmess) => ({
    type: ActionTypes.DISHES_FAILD,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
}); 

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(res => {
                if(res.ok) return res;
                else {
                    let error = new Error('Error ' + res.status + ': ' + res.statusText);
                    error.res = res;
                    throw error;
                }
            },
                error => {
                    let errMess = new Error(error.message);
                    throw errMess;
                })
        .then(res => res.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFaild(error.message)));

}

export const commentsFaild = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILD,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
}); 

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(res => {
                if(res.ok) return res;
                else {
                    let error = new Error('Error ' + res.status + ': ' + res.statusText);
                    error.res = res;
                    throw error;
                }
            },
                error => {
                    let errMess = new Error(error.message);
                    throw errMess;
                })
        .then(res => res.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFaild(error.message)));

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFaild = (errmess) => ({
    type: ActionTypes.PROMOS_FAILD,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
}); 

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
        .then(res => {
            if(res.ok) return res;
            else {
                let error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
        },
            error => {
                let errMess = new Error(error.message);
                throw errMess;
            })
        .then(res => res.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFaild(error.message)));
        
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADER_LOADING
});

export const leadersFaild = (errmess) => ({
    type: ActionTypes.LEADER_FAILD,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADER,
    payload: leaders
}); 

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
})

export const postFeedback = (firstname, lastname, telnum, email, agree, 
    contactType, message) => (dispatch) =>{
            const newFeedback = {
                                    firstname: firstname,
                                    lastname: lastname,
                                    telnum: telnum,
                                    email: email,
                                    agree: agree,
                                    contactType: contactType,
                                    message: message,
                                };
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(res => {
                if(res.ok) return res;
                else {
                    let error = new Error('Error ' + res.status + ': ' + res.statusText);
                    error.res = res;
                    throw error;
                }
            },
                error => {
                    let errMess = new Error(error.message);
                    throw errMess;
            })
        .then(res => res.json())
        .then(res => dispatch(addFeedback(res)))
        .catch(error => {
            console.log('Post feedback : ', error.message);
            alert('Your feedback Couild not be Posted\n Error ' + error.message);
        })   
}