const router = require("express").Router();
const bcrypt =require('bcrypt')
var jwt = require("jsonwebtoken");
var middleware = require('../middlewar/middlewar')



class getData {

  constructor(getdatacontroller) {

    this.controller = getdatacontroller
    this.init();
  }

  init() {
    
    router.get("/teams",middleware,(req,res)=>{
      this.controller.getTeams()
      .then(result=>{
        res.send(result)
      })
    })

    router.get("/match",middleware,(req,res)=>{
      this.controller.getMatch()
      .then(result=>{
        res.send(result)
      })
      
    })
    
  
    router.get("/selected",middleware,(req,res)=>{
      const id = req.user
      this.controller.getSelected(id)
      .then(result=>{
        res.send(result)
      })
    })

    router.get("/bet",(req,res)=>{
      const id = req.user
      this.controller.getBet(id)     
      .then(result=>{
        console.log(result)
        res.send(result)
      })
      .catch(e=>{
        console.log(e,"error")
      })
    })

    router.get("/result",middleware,(req,res)=>{
      const id = req.user
      this.controller.getResult(id)
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
  return new getData(controller);
};
  