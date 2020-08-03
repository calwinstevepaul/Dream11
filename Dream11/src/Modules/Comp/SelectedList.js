import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'

export class SelectedList extends Component {
    
    removeFromSelected=(id)=>{
        console.log(id)
        authApi.post("/update/removefromselected",{
            id:id
        }).then(res=>{
            swal({icon:"success",text:"Removed from selected!"}) 
            this.props.getSelectedItems()  
        })

    }
    render() {
        return (
          <tr>
              <td>
                    {this.props.data.player.playerName}
              </td>
              <td>
                    {this.props.data.team.teamName}
              </td>

              <td>
                    {this.props.data.matchId}

              </td>

              <td>
                   <button onClick={()=>this.removeFromSelected(this.props.data.id)} className="closeBtn"><i class="fas fa-times"></i> </button>
              </td>

             
          </tr>
            
        )
    }
}

export default SelectedList
