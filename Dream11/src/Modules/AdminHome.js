import React, { Component } from 'react'
import Navbar from './Comp/Navbar'
import AddTeam from './Comp/AddTeam'
import AddMatch from './Comp/AddMatch'
import AdminMatch from './Comp/AdminMatch'



export class AdminHome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            page:1

        }
    }
    
    changePage=(value)=>{
        this.setState({
            page:value
        })
    }
    renderSwitch(param) {
        switch(param) {
          case 1:return <AdminMatch/>
          case 2:return <AddTeam/>
          case 3:return <AddMatch/>
          default:return <AdminMatch />
        }
    }
    render() {
        return (
            <div className="home">
                <Navbar changePage={this.changePage} {...this.props}/>  
                <div className="body">
                    {this.renderSwitch(this.state.page)}
                </div>                            
            </div>
        )
    }
}

export default AdminHome
