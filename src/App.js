import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import store from './store'
import { Provider } from 'react-redux';
import DetailNoteComponent from './components/DetailNoteComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HeaderComponent  from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import BodyComponent from './components/BodyComponent';
import CreateMovieReviewComponent from './components/CreateMovieReviewComponent';
import UpdateMovieReviewComponent from './components/UpdateMovieReviewComponent';
import { LoginComponent } from './components/LoginComponent';
import MoviesByCategoryComponent from './components/MoviesByCategoryComponent';
import { useState, useEffect } from 'react';
import { RegisterComponent } from './components/RegisterComponent';
import WatchlistComponent from './components/WatchlistComponent';
import {PageNotFound} from './components/PageNotFound';

import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT
});

function App() {
  
  const [statusLogin, setStatusLogin] = useState(false);

  useEffect(() => {
    client.post("/api/check/login").then(response => {
      setStatusLogin(response.data);
    });
  }, []);

  return (
    <ChakraProvider >
      <Provider store={store}>
        <div className='App'>
          <HeaderComponent statusLogin={statusLogin} setStatusLogin={setStatusLogin}/>
            <Routes>
              <Route path="/" element={<BodyComponent/>}/>
              <Route path="/notes/api/movies_category/:id" element={<MoviesByCategoryComponent/>}/>
              <Route path="/notes/api/:id" element={<DetailNoteComponent statusLogin={statusLogin} />}/>
              <Route path="/notes/api/create" element={<CreateMovieReviewComponent/>}/>
              <Route path="/notes/api/update/:id" element={<UpdateMovieReviewComponent/>}/>
              <Route path="/notes/api/login" element={<LoginComponent setStatusLogin={setStatusLogin}/>}/>
              <Route path="/notes/api/register" element={<RegisterComponent/>}/>
              <Route path="/notes/api/watchlist" element={<WatchlistComponent/>}/> 
              <Route path="*" element={<PageNotFound />} />
              
            </Routes>
          <FooterComponent/>
        </div>
      </Provider>
    </ChakraProvider>
  );

}

export default App;
