import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'
import SelectedList from './SelectedList'


export class Selected extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedItems:[]
        }
    }
    componentDidMount(){
        this.getSelectedItems()
    }
    getSelectedItems=()=>{
        authApi.get("/getdata/selected").then(res=>{
            this.setState({
                selectedItems:res.data
            })
        })
    }

    submit=async (playerId, teamId, matchId, cartId)=>{
       
        try{

            await authApi.post("/update/bet",{
                playerId, teamId, matchId
               
            })
            await authApi.post("/update/removefromselected",{
                id:cartId
            })
            swal({icon:"success",text:"Bidding done !!"})   
            this.getSelectedItems()
        }
        catch(e){
            console.log(e)
            swal({icon:"error",text:" Bidding is not done"})   

        }

        
    }
    
    render() {
        return (
            <div className="info">
                <div className="info-inner"> 
                    <table>
                        <tr>
                            <th>
                                PLAYER NAME 
                            </th>
                            <th>
                                TEAM
                            </th>                               
                            <th>
                                MATCH
                            </th>
                            
                            <th>
                                REMOVE PLAYER
                            </th>
                        </tr>

                        {this.state.selectedItems.map(data=>{
                            return <SelectedList data={data} getSelectedItems={this.getSelectedItems} />
                        })}
                        
                        


                    </table>  
                    <div className="cart-btn">
                        <button onClick={()=>{
                            if(this.state.selectedItems.length === 0){
                                swal({icon:"error",text:"Your list is empty"})   
                            }
                            else if(this.state.selectedItems.length >=6){
                                swal({icon:"error",text:"You don not have enough money"})   

                            }
                            else{
                                
                                this.state.selectedItems.map((data)=>this.submit(data.player.id, data.team.id, data.matchId, data.id))
                            }
                            }} 
                            className="button">Bet</button>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default Selected
