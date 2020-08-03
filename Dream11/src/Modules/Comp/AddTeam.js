import React, { Component } from 'react'
import InputBox from '../ReuseComp/InputBox'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'

export class AddTeam extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            logo:[],
            TeamName:"",
            Player1:"",
            Player2:"",
            Player3:"",
            Player4:"",
            Player5:"",
        }
    }
    eventHandle=(e)=>{
        let value = e.target.value
       
        this.setState({
            [e.target.name]: value
        })
    }
    
    submit=()=>{
        const formdata=new FormData();
        formdata.append("logo",this.state.logo);
        formdata.append("TeamName",this.state.TeamName);
        formdata.append("Player1",this.state.Player1);
        formdata.append("Player2",this.state.Player2);
        formdata.append("Player3",this.state.Player3);
        formdata.append("Player4",this.state.Player4);
        formdata.append("Player5",this.state.Player5);

        let config={
            headers: {
                'content-type': 'multipart/form-data',
        
            }
        }
        authApi.post("/update/addTeam",formdata,config)
        .then(res=>{
            console.log("add Product admin = ");
            swal({icon:"success",text:"Team Added"})

        })
        .catch(()=>{
            swal({icon:"error",text:"Error in Adding Team"})

        })

       
    }
    
    render() {
        return (
            <div className="moderators">
                <div className="moderators-inner">
                    <strong>
                        <h3>Add a Team</h3>
                    </strong>
                    <div className="text-field">
                        <label>Team Logo : </label>
                        <input type="file" className="inputbox-1"  onChange={(e)=>this.setState({logo:e.target.files[0]})}/>
                    </div>
                    <div className="text-field">
                        <label>Team Name : </label>
                        <InputBox  placeholder="Team Name" name="TeamName" type="text" value={this.state.TeamName} onChange={this.eventHandle} />
                    </div>

                    <div className="text-field">
                        <label>Player 1(Captain) : </label>
                        <InputBox  placeholder="Player1(captain)" name="Player1" type="text" value={this.state.Player1} onChange={this.eventHandle} />
                    </div>
                    <div className="text-field">
                        <label>Player 2 : </label>
                        <InputBox  placeholder="Player 2" name="Player2" type="text"  value={this.state.Player2} onChange={this.eventHandle} />
                    </div>
                    <div className="text-field">
                        <label>Player 3 : </label>
                        <InputBox  placeholder="Player 3" name="Player3" type="text"  value={this.state.Player3} onChange={this.eventHandle} />
                    </div> <div className="text-field">
                        <label>Player 4 : </label>
                        <InputBox  placeholder="Player 4" name="Player4" type="text"  value={this.state.Player4} onChange={this.eventHandle} />
                    </div> <div className="text-field">
                        <label>Player 5 : </label>
                        <InputBox  placeholder="Player 5" name="Player5" type="text"  value={this.state.Player5} onChange={this.eventHandle} />
                    </div>
                    
                    <button onClick={()=>this.submit()} className="button">Add Team</button>
                </div>
            </div>
        )
    }
}

export default AddTeam
