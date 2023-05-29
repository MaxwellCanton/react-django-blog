import {
    GET_NOTE_LIST_SUCCESS,
    GET_NOTE_LIST_FAIL,
    GET_NOTE_BY_ID_SUCCESS,
    GET_NOTE_BY_ID_FAIL,
    GET_RATES_BY_MOVIE_SUCCESS,
    GET_RATES_BY_MOVIE_FAIL,
    GET_WATCHLIST_SUCCESS,
    GET_WATCHLIST_FAIL,
} from '../actions/types';

const initialState = {
    note_list: null,
};

export default function note(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_NOTE_LIST_SUCCESS:
            return {
                ...state,
                note_list: payload.notes,
            }
        case GET_NOTE_LIST_FAIL:
            return {
                ...state,
                note_list: null,
            }
        case GET_NOTE_BY_ID_SUCCESS:
            return {
                ...state,
                detail_note: payload.note,
            }
        case GET_NOTE_BY_ID_FAIL:
            return {
                ...state,
                detail_note: null,
            }
        case GET_RATES_BY_MOVIE_SUCCESS:
            return {
                ...state,
                movie_rates: payload.movie_rates,
            }
        case GET_RATES_BY_MOVIE_FAIL:
            return {
                ...state,
                movie_rates: null,
            }
        case GET_WATCHLIST_SUCCESS:
            return {
                ...state,
                movies_list: payload.movies_list,
            }
        case GET_WATCHLIST_FAIL:
            return {
                ...state,
                movies_list: null,
            }
        default:
            return state
    }
}