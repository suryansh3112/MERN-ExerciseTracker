const router = require("express").Router();
const User = require("../models/user.model");


router.get("/",function(req,res){

    User.find({},(err,users)=>{
       if(!err)
            if(users.length===0)
            res.send("empty");
            else
            res.send(users);
       else
            res.send(err);
    })
   
});

router.post("/add",function(req,res){
    
    const newUser = new User({
        username : req.body.username
    })

    newUser.save(err=>{
        if(!err)
            res.send("User added.");
        else
            res.send(err);    
    });
    
});

module.exports = router;