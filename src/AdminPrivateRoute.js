import axios from 'axios';
import React, {useState, useEffect} from  'react';
import {Route, Redirect } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


function AdminPrivateRoute({...rest}){
   
   const history = useHistory();

   const [authenticated, setAuthenticated ] = useState(false);
   const [loading, setLoading ] = useState(true);

   useEffect(()=>{
       axios.get('/api/checkingAuthenticated').then( res => {
           if(res.status === 200)
           {
            setAuthenticated(true);
           }
           //for loading
           setLoading(false)
       });
       
       return () => {
             setAuthenticated(false);
       };
   }, []);
  

  //when you are not loggin you cant acccess /admin/dashboard
   axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401 )
        {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push('/')
        }
        return Promise.reject(err);
   });
   
   
   axios.interceptors.response.use(function (response){
             return response;
        }, function (error){
            if(error.response.status === 403) //Access Denied
            {  
                swal("Forbidden", error.response.data.message, "warning");
                history.push('/403');
            }
            else if(error.response.status === 404)
            {
                swal("404 Error", "Url/Page Not Found", "warning");
                history.push('/404');
            }

            return Promise.reject(error);
        }   
   );
   
    //for loading
   if(loading){
       return  <h1>Loading...</h1>
   }

   return (
            <Route {...rest}
                render = { ({props, location}) => 
                 authenticated ? 
                (<MasterLayout {...props} />) : 
                (<Redirect to={{pathname: "/login", state : {from: location} }} />)
                }
            />
   )

}

export default AdminPrivateRoute;