const bcrypt =require('bcrypt')
var model=require('../models')


class authcontroller{
    async signup(signupName, signupEmail, signupPassword, phoneNumber, address){
        let hash = await bcrypt.hashSync(signupPassword, 10);
       var x= await model.user.create({
        name: signupName,
        email: signupEmail,
        password: hash,
        phoneNumber:phoneNumber.toString(),
        address:address,
        isAdmin:false,

        })
        
        return x
    }    

    async login(loginName,loginpassword){
        let result=await model.user.findAll({
            where:{
                email:loginName
            }
            
        })
        return(result)
    }
   
}


module.exports = () => {
    return new authcontroller();
  };
  