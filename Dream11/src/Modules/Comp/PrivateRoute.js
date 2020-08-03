import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import AdminHome from '../AdminHome';


function PrivateRoute(props) {        
    return (
        props.currentLoginState?
        <Route path="/home">
            {props.isAdmin?<AdminHome {...props} />:<Home {...props}/>}            
        </Route>
        : 
        <Redirect to='/' />   
    )
}
export default PrivateRoute