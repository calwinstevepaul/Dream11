import React, { Component } from 'react'
import InputBox from '../ReuseComp/InputBox'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'

export class AddMatch extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            dateTime:"",
            homeTeam:"",
            awayTeam:"",
            teams:[]
        }
    }
    componentDidMount(){
        this.getTeams()
    }
    getTeams=()=>{
        authApi.get("/getdata/teams")
        .then(res=>{
            this.setState({
                teams:res.data
            })
        })
        .catch(()=>{
            swal({icon:"error",text:"Error in getting team data"})

        })

    }
    eventHandle=(e)=>{
        let value = e.target.value
       
        this.setState({
            [e.target.name]: value
        })
    }

    submit=()=>{
        if(this.state.homeTeam === this.state.awayTeam || this.state.dateTime === ""){
            swal({icon:"error",text:"Fill all the data and select a diffrent Home and Away team"})

        }
        else{
            authApi.post("/update/addMatch",{
                matchDateTime:this.state.dateTime,
                homeTeam:this.state.homeTeam,
                awayTeam:this.state.awayTeam,
    
            })
            .then(res=>{
                console.log("add Product admin = ");
                swal({icon:"success",text:"Match Added"})
    
            })
            .catch(()=>{
                swal({icon:"error",text:"Error in Adding Match"})
    
            })
        }
    }


    render() {
        return (
            <div className="moderators">
            <div className="moderators-inner">
                <strong>
                    <h3>Create a Match</h3>
                </strong> 
                <div className="text-field">
                    <label>Date and Time</label>
                    <InputBox  placeholder="Date and Time" name="dateTime" type="datetime-local" value={this.state.dateTime} onChange={this.eventHandle} />
                </div>

                <div className="addMatch-teams">
                    <div className="text-field-2">
                        <label><strong>Home Team</strong></label>
                        <select className="inputbox-1" onChange={(e)=>this.setState({homeTeam:e.target.value})}>
                            <option>Select a team</option>
                            {this.state.teams.map(data=>{
                                return <option value={data.id}>{data.teamName}</option>
                            })}
                        </select>
                    </div>
                    <h3>VS</h3>
                    <div className="text-field-2">
                        <label><strong>Away Team</strong></label>
                        <select className="inputbox-1" onChange={(e)=>this.setState({awayTeam:e.target.value})}>
                            <option>Select a team</option>
                            {this.state.teams.map(data=>{
                                return <option value={data.id}>{data.teamName}</option>
                            })}
                        </select>
                    </div> 
                </div>
               
                
                <button onClick={()=>this.submit()} className="button">Create Match</button>
            </div>
        </div>
        )
    }
}

export default AddMatch
