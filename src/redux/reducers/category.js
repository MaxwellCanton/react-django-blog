import {
    GET_CATEGORY_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAIL,
    GET_NOTES_BY_CATEGORY_SUCCESS,
    GET_NOTES_BY_CATEGORY_FAIL,
} from '../actions/types';

const initialState = {
    category_list: null,
    movies_by_category: null,
};

export default function category(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                category_list: payload.categories,
            }
        case GET_CATEGORY_LIST_FAIL:
            return {
                ...state,
                category_list: null,
            }
        case GET_NOTES_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                movies_by_category: payload.movies_by_category,
            }
        case GET_NOTES_BY_CATEGORY_FAIL:
            return {
                ...state,
                movies_by_category: null,
            }
        default:
            return state
    }
}


