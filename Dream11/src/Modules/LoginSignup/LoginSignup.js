import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './LoginSignup.css'

import LoginDiv from './components/LoginDiv'
import SignupDiv from './components/SignupDiv'

export class LoginSignup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginSignup:true
        }
    }
    
    changeLoginSignup=(value)=>{
        this.setState({
            loginSignup:value
        })
    }
    
    render() {
         
        return (
            <div className="login-signup">
                {this.state.loginSignup?
                <LoginDiv  
                    changeLoginSignup={this.changeLoginSignup} 
                    {...this.props}
                />
                :
                <SignupDiv 
                    changeLoginSignup={this.changeLoginSignup}
                />
                }
            </div>
        )
    }
}

export default withRouter (LoginSignup)
