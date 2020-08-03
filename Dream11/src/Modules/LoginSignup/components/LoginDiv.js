import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../LoginSignup.css'
import {plainApi} from '../../../apiCall'
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';


export class LoginDiv extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loginName:'',
            loginPassword:'',           
            errormsg:''            
        }
    }
   
    eventHandle=(e)=>{
        let value = e.target.value
        if (e.target.name === "loginName") {
            value = e.target.value.toLowerCase();
        }
        this.setState({
            [e.target.name]: value
        })
    }    

    submit=(e)=>{
        e.preventDefault();
        plainApi.post("/auth/login",{
            loginName:this.state.loginName, 
            loginPassword:this.state.loginPassword,
            

        })
        .then((res)=>{
            console.log("res",res.data)
            if(res.data.message === "login successful") {
                localStorage.setItem("token",JSON.stringify(res.data.token))
                localStorage.setItem("admin",JSON.stringify(res.data.isAdmin))
                this.props.setIsAdmin()
                this.props.changeLoginState(true)
                this.props.history.push('/home')
            }
        }).catch(e=>{
            if(e.response)
            swal({icon:"error",text:e.response.data})     
      
            
        })
       
    }


    responseGoogle = (response) => {
        plainApi.post("/auth/loginOAth",{
            loginName:response.profileObj.email, 
        }).then((res)=>{
            console.log("res",res.data)
            if(res.data.message === "login successful") {
                localStorage.setItem("token",JSON.stringify(res.data.token))
                localStorage.setItem("admin",JSON.stringify(res.data.isAdmin))
                this.props.setIsAdmin()
                this.props.changeLoginState(true)
                this.props.history.push('/home')
            }
        }).catch(e=>{
            if(e.response)
            swal({icon:"error",text:e.response.data})     
      
            
        })
    }

    
    oAuthErr = (e)=>{
        console.log(e)
        swal({text : e.error, icon:"error" })

    }
   

    
    render() {

        return (
            <div >
                <div className="login-signup-div">
                    
                    <div>
                        <h1 className='logo-img' >Login</h1>
                    </div>
                    <div className="login-signup-div-inner">
                       <form onSubmit={(e)=>this.submit(e)}>
                            {this.state.err
                                ?
                                    <p className='error'>{this.state.err}</p>
                                :
                                    <></>
                            }
                            <input 
                                type="email" 
                                className="login-signup-div-input" 
                                placeholder="Email" 
                                name="loginName" 
                                onChange={(e)=>this.eventHandle(e)} 
                                value={this.state.loginName} 
                                maxlength="40" 
                                minLength="3" 
                                required
                            />
                            <input 
                                type="password" 
                                className="login-signup-div-input" 
                                placeholder="Password" 
                                name="loginPassword" 
                                onChange={(e)=>this.eventHandle(e)} 
                                value={this.state.loginPassword} 
                                maxlength="40" 
                                minLength="3" 
                                required
                            />
                            
                            <button 
                                type="submit" 
                                className="login-signup-div-button-2" 
                            >Log In</button> 
                             <GoogleLogin
                                clientId="321951855539-qhcqph6e97i8ii9p0rlsgm3tt4jrrn5r.apps.googleusercontent.com"
                                buttonText="login"
                                onSuccess={(res)=>this.responseGoogle(res)}
                                onFailure={(e)=>this.oAuthErr(e)}
                            />                          
                       </form>
                    </div>                   

                   
                </div>
                <div className="login-signup-div-switch">
                    <p className="login-signup-div-para">Don't have an account? </p>
                    <button 
                        className="login-signup-div-button" 
                        onClick={()=>this.props.changeLoginSignup(false)}
                    >Signup</button>
                </div>
            </div>
        )
    }
}

export default withRouter (LoginDiv)  