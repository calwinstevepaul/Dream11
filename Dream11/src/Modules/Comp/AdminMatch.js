import React, { Component } from 'react'
import AdminMatchInner from './AdminMatchInner'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'
export class AdminMatch extends Component {
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
                    return <AdminMatchInner data={data} getMatch={this.getMatch} />
                })}
            </div>
        )
    }
}

export default AdminMatch
