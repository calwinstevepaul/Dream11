import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'
import UserMatchInner from './UserMatchInner'
export class UserMatch extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             match:[]
        }
    }
    componentDidMount(){
        this.getMatch()
    }
    getMatch=()=>{
        authApi.get("/getdata/match").then(res=>{
            this.setState({
                match:res.data
            })
        })
    }
    
    render() {
        return (
            <div className="match">
                {this.state.match.map(data=>{
                    return <UserMatchInner data={data}/>
                })}
            </div>
        )
    }
}

export default UserMatch
