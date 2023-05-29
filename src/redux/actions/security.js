import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT
});

export const login = (post) => {

    const res = client.post("/api/login", post).catch(err  => {
        return err.response.data
    });
    return res;
}


export const logout = () => {

    const res = client.post("/api/logout").catch(err  => {
        return err.response.data
    });
    return res;
}


export const registerAccount = (post) => {

    const res = client.post("/api/register", post).catch(err  => {
        return err.response.data["data"]
    });
    return res;
}