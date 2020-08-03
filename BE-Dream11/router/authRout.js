const router = require("express").Router();
const bcrypt =require('bcrypt')
var jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");


class auth {

    constructor(authcontroller) {
      this.controller = authcontroller
      this.init();
    }
    passwordGenerator(len){
      const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const num = '0123456789'
      const rand = [upper, num]
        let password = ''
        for (let i=0; i<len; i++){
            const selected = rand[Math.floor(Math.random()*2)]
            password = password+ selected[Math.floor(Math.random()*selected.length)]
        }
        return password
   
    }
  
    init() {
      router.post("/signup",(req, res) => {
        const signupPassword = this.passwordGenerator(5);
        const { signupName, signupEmail, phoneNumber, address } = req.body;
        

        this.controller.signup(
          signupName,
          signupEmail,
          signupPassword,
          phoneNumber, 
          address
        ).then(result=>{
            const msg = {
              to: signupEmail,
              from: "dream11@gmail.com",
              subject: 'Dream11 username and password',
              html: `
                <p>
                  hello, ${signupName}<br><br>
                 
                  Your username and password is mentioned below.               
                </p>
                <br>
                <table border='1'>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                  </tr>
                  <tr>
                    <td>${signupEmail}</td>
                    <td>${signupPassword}</td>
                  </tr>
                </table>
                
                <p>
                Tech Team
                <br>
                <b>Swiggy</b>
                </p>` ,
      
            };
            sgMail.send(msg).catch(()=>res.status(401).send({errMsg: "sgMail error"}));
            res.send({ success: true,result})
        })
        .catch((e)=>{
            res.status(400).send({errMsg: "signup error"})

        })
        
      });
  
      router.post('/login',(req,res)=>{
        const {loginName,loginPassword}= req.body;

        console.log(loginName,loginPassword)
        this.controller.login(
          loginName,
          loginPassword
        ).then((result)=>{
            if (result.length == 0) {
                res.status(400).send("invalid user");
                console.log("invalid user");
              } else {
                var passwordDB = result[0].dataValues.password;
                bcrypt.compare(loginPassword, passwordDB, function(err, re) {
                  if (re == true) {
                    var token = jwt.sign(
                      { id: result[0].dataValues.id },
                      "calwin123",
                      { expiresIn: "1h" }
                    );
        
                    res.status(200).send({
                      name:result[0].dataValues.name,
                      id:result[0].dataValues.id,
                      token: token,
                      message: "login successful",
                      isAdmin:result[0].dataValues.isAdmin
                    });
        
                  } 
                  else {
                    res.status(400).send("wrong password");
                    console.log("wrong password");
                  }
                });
              }
        })
        
      })

      

      router.post('/loginOAth',(req,res)=>{
        const {loginName}= req.body;

        console.log(loginName)
        this.controller.login(
          loginName,
        ).then((result)=>{
            console.log(result)
            if (result.length == 0) {
                res.status(400).send("invalid user");
                console.log("invalid user");
              } else {
                var token = jwt.sign(
                  { id: result[0].dataValues.id },
                  "calwin123",
                  { expiresIn: "1h" }
                );
                res.status(200).send({
                  name:result[0].dataValues.name,
                  id:result[0].dataValues.id,
                  token: token,
                  message: "login successful",
                  isAdmin:result[0].dataValues.isAdmin
                });
              }
        })
        
      })


      
    }
    
  
    getRouter() {
      return router;
    }
  }
  
  module.exports = controller => {
    return new auth(controller);
  };
  