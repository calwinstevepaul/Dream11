const router = require("express").Router();
var jwt = require("jsonwebtoken");
var middleware = require('../middlewar/middlewar')
const multer=require('multer');
const path = require("path")

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
    cb(null,"AUDIO-" + Date.now() + path.extname(file.originalname));
    
   
  }
});

const upload = multer({
  storage: storage
});


class update {

  constructor(updatecontroller) {
    this.controller = updatecontroller
    this.init();
  }

  init() {


    router.post("/addTeam", middleware,upload.single("logo"), (req, res) =>{
      var { TeamName, Player1, Player2, Player3, Player4, Player5,} =req.body
      let str=req.file.path
      let newstr=str.slice(6)
     
      var url ="http://localhost:9000/"+newstr
      this.controller.addTeam(
        url,TeamName, Player1, Player2, Player3, Player4, Player5
      ).then(result => {
        res.send(result);
      });
      
    })


    router.post("/addMatch", middleware, (req, res) =>{
      var { matchDateTime, homeTeam, awayTeam} =req.body    
     
      this.controller.addMatch(
        matchDateTime, homeTeam, awayTeam
      ).then(result => {
        res.send(result);
      });
      
    })

    router.post("/addtoselected",middleware,(req, res) => {
      const {playerId, teamId, matchId} = req.body;
      const userId = req.user      

      this.controller.addtoselected(userId, playerId, teamId, matchId).then(result=>{
        res.send(result)
      })
    })

    router.post("/removefromselected",middleware,(req, res) => {
      const {id} = req.body;
      const userId = req.user      

      this.controller.removefromselected(userId,id).then(result=>{
        res.send(result)
      })
    })


    router.post("/bet",middleware,(req, res) => {
      const { playerId, teamId, matchId} = req.body;
      const userId = req.user      

      this.controller.bet(userId,playerId, teamId, matchId).then(result=>{
        res.send(result)
      })
    })

    router.post("/points",(req, res) => {
      const { playerScore,matchId} = req.body;
      const userId = req.user      
      console.log(matchId,"router",req.body)
      this.controller.points(userId,playerScore,matchId)
      .then(result=>{
        res.send(result)
      })
    })


  }

  getRouter() {
    return router;
  }
  }
  
  module.exports = controller => {
    return new update(controller);
  };
  