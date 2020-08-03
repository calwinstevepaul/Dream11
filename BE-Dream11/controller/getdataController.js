var model=require('../models')
let Op=require('sequelize').Op


class getdataController{
   
  async getTeams(){
    return model.team.findAll()
    
  }
  

  async getMatch(){
    return model.match.findAll({
      where:{
        isOver:false
      },
      include:[
        {

          model:model.team,
          as:"homeTeam",
          include:[{
            model:model.player
          }]
        },
        {

          model:model.team,
          as:"awayTeam",
          include:[{
            model:model.player
          }]
        }
      ]
    })
  }


  async getSelected(id){
    return model.selected.findAll({
      where:{
        userId:id
      },
      include:[{
        model:model.player
      },
      {
        model:model.team
      }]
    })
  }


  async getResult(id){

    let x = await model.userPoint.findAll({
      where:{
        userId:id
      },
      include:[{
        model:model.user
      },{
        model:model.match
      }]
    })

    let maxScore = await model.userPoint.max('points'); 

    if(x[0].dataValues.points === maxScore){
      return {status:true, userData:x}
    }
    else{
      return {status:false, userData:x}
    }
  }




}


module.exports = () => {
    return new getdataController();
  };
  