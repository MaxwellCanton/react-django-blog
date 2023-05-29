import axios from 'axios';
import {
  GET_NOTE_LIST_FAIL,
  GET_NOTE_LIST_SUCCESS,
  GET_NOTE_BY_ID_FAIL,
  GET_NOTE_BY_ID_SUCCESS,
  GET_RATES_BY_MOVIE_SUCCESS,
  GET_RATES_BY_MOVIE_FAIL,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAIL
} from "./types";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT
});

export const return_notes = () => async dispatch => {

  try {
    const res = await client.get("/notes/api");

    if(res.status === 200){
      dispatch({type: GET_NOTE_LIST_SUCCESS, payload: res.data});
    }else{
      dispatch({type: GET_NOTE_LIST_FAIL});
    }

  } catch (error) {
    dispatch({type: GET_NOTE_LIST_FAIL});
  }

}

export const return_note_by_id =  (note_id) => async dispatch => {

  try {

    const res = await client.get(`/notes/api/${note_id}`);

    if(res.status === 200){
      dispatch({type: GET_NOTE_BY_ID_SUCCESS, payload: res.data});
    }else{
      dispatch({type: GET_NOTE_BY_ID_FAIL});
    }

  } catch (error) {
    dispatch({type: GET_NOTE_BY_ID_FAIL});
  }

}


export const create_movie = (post) => {

    const res = client.post("/notes/api/", post);
}


export const delete_movie = (id) => {

  client.delete(`/notes/api/${id}`);

} 


export const update_movie = (post, id) => {

    client.put(`/notes/api/${id}`, post);
    
}


export const return_rates_by_movie = (movie_id) => async dispatch => {

  try {
    const res = await client.get(`/notes/api/rates_movie/${movie_id}/`);
    if(res.status === 200){
      dispatch({type: GET_RATES_BY_MOVIE_SUCCESS, payload: res.data});
    }else{
      dispatch({type: GET_RATES_BY_MOVIE_FAIL});
    }

  } catch (error) {
    dispatch({type: GET_RATES_BY_MOVIE_FAIL});
  }

}


export const create_rate = async () => {
  const response = await client.post("/notes/api/rate/", {value : document.getElementById("rate_number").value, review: document.getElementById("rate_description").value, movie :document.getElementById("rate_movie").value})
    return response.data['success']
  
}


export const return_watchlist = () => async dispatch => {

  try {
    const res = await client.get(`/notes/api/watchlist/`);
    if(res.status === 200){
      dispatch({type: GET_WATCHLIST_SUCCESS, payload: res.data});
    }else{
      dispatch({type: GET_WATCHLIST_FAIL});
    }

  } catch (error) {
    dispatch({type: GET_WATCHLIST_FAIL});
  }

}


export const add_movie_watchlist = async (movie_id) => {

  const res = await client.post(`/notes/api/watchlist/`, {movie:movie_id});
  return res.data['success']
}