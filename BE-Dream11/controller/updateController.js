var model=require('../models')


class updateController{
  async addTeam(url,TeamName, Player1, Player2, Player3, Player4, Player5){
  
    var team = await model.team.create({
      logo:url,
      teamName:TeamName     
    })
    var teamId = team.dataValues.id
    var playerNames = [Player1, Player2, Player3, Player4, Player5]

    playerNames.map(data=>{
      return model.player.create({
        teamId:teamId,
        playerName:data
      })

    })
    return team

  }

  async addMatch(matchDateTime, homeTeamId, awayTeamId){
    return model.match.create({
      matchDateTime,
      homeTeamId, 
      awayTeamId
    })
  }

  async addtoselected(userId, playerId, teamId, matchId){
    return model.selected.create({
      userId:userId, 
      playerId:playerId, 
      teamId:teamId, 
      matchId:matchId
    })
  }
  
  async removefromselected(userId,id){
    await model.selected.destroy({
      where:{
        id:id,
        userId:userId
      }
    })
    let x = {status:true}
    return x
  }

  async bet(userId,playerId, teamId, matchId){
    return model.bet.create({
      userId:userId,
      playerId:playerId,
      teamId:teamId,
      matchId:matchId,
    })
  }

  async points(userId,playerScore,matchId){

    // ADDING PLAYERS SCORE IN POINTS TABLE
    let value
    for (let key in playerScore) { 
      if (playerScore.hasOwnProperty(key)) { 
          value = playerScore[key]; 
          console.log(key, value); 
          await model.point.create({
            playerId:key,
            points:value,
            matchId:matchId
          })

      } 
    }

    // CHANGING MATCH STATE OVER
    await model.match.update({
      isOver:true
    },{
      where:{
        id:matchId
      }
    }
    )

    // CALCULATING USER POINTS
    let x = await model.user.findAll({
      where:{
        isAdmin:false
      },
      attributes:["id","name"],
      include:[{
        model:model.bet,
        where:{
          matchId:matchId
        },
        attributes:["playerId","matchId"],
        include:[{
          model:model.player,
          attributes:["id"],
          include:[{
            model:model.point,
            attributes:["points"]
          }]
        }]
      }]
    })
    
    x.map(data=>{
      var points=[]
      var sum = 0
      data.dataValues.bets.map(bets=>{
        points.push(bets.player.points[0].points)
        sum = sum + bets.player.points[0].points
      })
      model.userPoint.create({
        userId:data.id,
        matchId:matchId,
        points:sum
      })
      // console.log(points)
      // console.log(sum)
      // console.log("matchId",matchId)
      // console.log("userId",data.id)
      
    })
    return {status:"success"}


  }

  
 
}


module.exports = () => {
    return new updateController();
  };
   