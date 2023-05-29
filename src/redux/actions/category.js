import axios from 'axios';
import {
    GET_CATEGORY_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAIL,
    GET_NOTES_BY_CATEGORY_SUCCESS,
    GET_NOTES_BY_CATEGORY_FAIL,
} from "./types";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT
});


export const return_categories = () => async dispatch => {

    try {
        const res = await client.get("/notes/api/categories/");
        if(res.status === 200){
            dispatch({type: GET_CATEGORY_LIST_SUCCESS, payload: res.data});
        }else{
            dispatch({type: GET_CATEGORY_LIST_FAIL});
        }

    } catch (error) {
        dispatch({type: GET_CATEGORY_LIST_FAIL});
    }

}

export const return_notes_by_category = (category_id) => async dispatch => {

    try {
      const res = await client.get(`/notes/api/movies_category/${category_id}`);
      if(res.status === 200){
        dispatch({type: GET_NOTES_BY_CATEGORY_SUCCESS, payload: res.data});
      }else{
        dispatch({type: GET_NOTES_BY_CATEGORY_FAIL});
      }
  
    } catch (error) {
      dispatch({type: GET_NOTES_BY_CATEGORY_FAIL});
    }
  
}