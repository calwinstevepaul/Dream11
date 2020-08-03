import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'

export class Result extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             result:null,
             userData:[]
        }
    }
    
    componentDidMount(){
        this.getResult()
    }
    getResult(){
        authApi.get("/getdata/result").then(res=>{
            this.setState({
                result:res.data.status,
                userData:res.data.userData[0]
            })
        })
    }
    render() {
        return (
            <div className="info">
                <div className="info-inner">
                    <table>
                        <tr>
                            <th>MATCH</th>
                            <th>POINTS</th>
                            <th>MATCH STATUS</th>
                        </tr>
                        <tr>
                            <td>{this.state.userData.matchId}</td>
                            <td>{this.state.userData.points}</td>
                            <td>{this.state.result === null? <></>:this.state.result === true ? <div className="selected">WON</div> : <div className="rejected">LOST</div>} </td>
                        </tr>

                        
                    </table>
                </div>
                
            </div>
        )
    }
}

export default Result
