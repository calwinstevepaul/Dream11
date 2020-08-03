import React, { Component } from 'react'
import LoginSignup from './Modules/LoginSignup/LoginSignup'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './Modules/Comp/PrivateRoute';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLogin:localStorage.getItem('token')?true:false,
       isAdmin:false
    }
  }
  componentDidMount(){
    this.setIsAdmin()
  }
  setIsAdmin=()=>{
    this.setState({
      isAdmin:JSON.parse(localStorage.getItem('admin'))
    })
  }

  changeLoginState=(value)=>{
    this.setState({
      isLogin:value
    })
  }
  
  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginSignup changeLoginState={this.changeLoginState} currentLoginState={this.state.isLogin} setIsAdmin={this.setIsAdmin}/>
          </Route>

          <Route path="/home">
            <PrivateRoute changeLoginState={this.changeLoginState} currentLoginState={this.state.isLogin} isAdmin={this.state.isAdmin}/>
          </Route>
        </Switch>
      </Router>
        
      </div>
    )
  }
}

export default App
