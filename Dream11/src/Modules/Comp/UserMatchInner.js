import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'


export class UserMatchInner extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            model:false,
            money:500
        }
    }

  
    selectUser=(id,teamId,matchId)=>{
        this.setState({
            money:this.state.money-100
        })
        authApi.post("/update/addtoselected",{
            playerId:id,
            matchId,
            teamId
        }).then(res=>{
            swal({icon:"success",text:"Added in selected list!"})   
        })

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
                                            return <div className="squad-inner">
                                                <p>{player.playerName}</p> <button onClick={()=>this.selectUser(player.id, this.props.data.homeTeam.id, this.props.data.id)} className="button-2">SELECT</button></div>
                                        })}
                                    </div>

                                    

                                </div>
                                <div>
                                        <p>CASH</p>
                                   
                                        <p>Rs {this.state.money}/-</p>
                                   
                                    <h2>VS</h2>
                                </div>
                                <div className="player-selection-model-inner-2">
                                    <div>
                                        <img src={this.props.data.awayTeam.logo} alt="logo" width="100px"/>                                   

                                    </div>

                                    <h3>PLAYING SQUAD</h3>
                                    <div className="squad">
                                        {this.props.data.awayTeam.players.map(player=>{
                                            return <div className="squad-inner"> <button onClick={()=>this.selectUser(player.id, this.props.data.awayTeam.id, this.props.data.id)}    className="button-2">SELECT</button> <p>{player.playerName}</p> </div>
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

export default UserMatchInner
