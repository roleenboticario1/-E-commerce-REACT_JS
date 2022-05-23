import React from 'react';
import {BrowserRouter as Router, Route , Switch , Redirect} from 'react-router-dom';
import axios from 'axios';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import AdminPrivateroute from './AdminPrivateRoute';
import PublicRoute from './PublicRoute';

axios.defaults.baseURL = 'http://localhost:8000/'; //for not repeating for every url
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

//interceptors request is use check the token if come or not.
axios.interceptors.request.use(function (config){
   const token = localStorage.getItem('auth_token');
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
});

function App() {
  return (
     <div className="App">
         <Router>
            <Switch>
                //una dapat to
                <AdminPrivateroute  path="/admin" name="Admin"/>
                <PublicRoute path="/" name="Home" />
                <Route path="/login">
                 {localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register">
                 {localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Register />}
                </Route>       
            </Switch>
        </Router>
     </div>
  );
}

export default App;
