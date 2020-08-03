import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'
import InputBox from '../ReuseComp/InputBox'

export class AdminMatchInner extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            model:false,
            playerScore:{}
        }
    }

    eventHandle=(e)=>{
        let value = e.target.value
       
        this.setState({
            playerScore:{...this.state.playerScore,[e.target.name]: value}
        })
    } 
   
    submit=(matchId)=>{
        console.log(this.state.playerScore)
        console.log(Object.keys(this.state.playerScore).length)
        if(Object.keys(this.state.playerScore).length < 10){
            swal({icon:"error",text:"Please fill all the input box"})   

        }
        else{
            authApi.post("/update/points",{
                playerScore:this.state.playerScore,
                matchId
            }).then(res=>{
                swal({icon:"success",text:"Added in selected list!"})   
                this.setState({model:false})
                this.props.getMatch()
            })  
        }
    }

    render() {
        return (
            <>
                <div onClick={()=>this.setState({model:true})} className="match-card">
                    <div className="match-card-1">
                        <div className="match-card-1-1">
                            HOME
                        </div>
                        <div className="match-card-1-2">
                            <img src={this.props.data.homeTeam.logo} alt="logo" width="100px"/>
                            {this.props.data.homeTeam.teamName}
                        </div>
                    </div>
                    <div className="match-card-1">
                        <div className="match-card-2-1">
                            AWAY
                        </div>
                        <div className="match-card-1-2">
                            {this.props.data.awayTeam.teamName}
                            <img src={this.props.data.awayTeam.logo} alt="logo" width="100px"/>

                        </div>

                    </div>
                    
                </div>

                {this.state.model
                ?
                    <>
                        <div onClick={()=>this.setState({model:false})} className="close">

                        </div>
                        <div className="player-selection-model">
                            <div className="player-selection-model-inner">
                                <div className="player-selection-model-inner-1">
                                    <div>
                                        <img src={this.props.data.homeTeam.logo} alt="logo" width="100px"/>

                                    </div>
                                    
                                    <h3>PLAYING SQUAD</h3>
                                    <div className="squad">
                                        {this.props.data.homeTeam.players.map(player=>{
                                            return(
                                                <div className="squad-inner-2">
                                                    <p>{player.playerName}</p> 
                                                    <input className="inputbox-1" placeholder="Score" name={player.id} type="number"  onChange={(e)=>this.eventHandle(e)} />

                                                </div>

                                            )
                                        })}
                                    </div>

                                    

                                </div>
                                <div  className="player-selection-model-inner-mid">
                                    <button className="button" onClick={()=>this.submit(this.props.data.id)}>Submit</button>
                                    <h2>VS</h2>
                                </div>
                                <div className="player-selection-model-inner-2">
                                    <div>
                                        <img src={this.props.data.awayTeam.logo} alt="logo" width="100px"/>                                   

                                    </div>

                                    <h3>PLAYING SQUAD</h3>
                                    <div className="squad">
                                        {this.props.data.awayTeam.players.map(player=>{
                                            return(
                                                <div className="squad-inner-2"> 
                                                    <p>{player.playerName}</p> 
                                                    <input className="inputbox-1"  placeholder="Score" name={player.id} type="number"  onChange={(e)=>this.eventHandle(e)} />
                                                </div>
                                            ) 
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                :
                    <></>
                }

            </>
        )
    }
}

export default AdminMatchInner
