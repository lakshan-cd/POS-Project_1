const {Users} = require("../models")
const {sign} = require("jsonwebtoken")

const logIn = (req,res) =>{
       console.log(req.body)
    Users.findOne({Where:{email: req.email}}).then((results) =>{
               if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "User Not Found"
                })
               }else if(results.user_password === req.body.user_password){
                results.user_password = undefined;
                const jsontoken = sign({result:results},"pos@1234",{expiresIn: "3h" });
                return res.status(200).json({
                    success: 1,
                    token: jsontoken,
                    results: results
                })
               }
    })
}
module.exports ={logIn}