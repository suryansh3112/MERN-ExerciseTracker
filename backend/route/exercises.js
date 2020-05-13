const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.get("/",function(req,res){
    
    Exercise.find( function (err,exercises){
        if(!err)
            res.send(exercises);
        else 
            res.send(err);
    })
})

router.post("/add", (req,res)=>{
    const newExercise = new Exercise({
        username: req.body.username,
        description : req.body.description,
        duration : req.body.duration,
        date :   req.body.date
    })

    newExercise.save(err=>{
        if(!err)
            res.send("Added exercise Successfully.");
        else
            res.send(err);    
    })
});


router.route("/:id")

.get(function(req,res){

    Exercise.findById(req.params.id , function(err,exercise){
        res.send(exercise);
    })
})

.delete(function(req,res){
    Exercise.findByIdAndRemove(req.params.id , err=>{
        if(!err)
            res.send("Deleted Successfully.");
        else 
            res.send(err);
    })
})

.put((req,res)=>{
    
    Exercise.findByIdAndUpdate(req.params.id,
        {
        username: req.body.username,
        description : req.body.description,
        duration : req.body.duration,
        date :   req.body.date
        },
        {overwrite : true  },
        err=>{
            if(!err)
                res.send("Updated Successfully.");
            else
                res.send(err);
        }

    )
})

.patch((req,res)=>{

    Exercise.findByIdAndUpdate(
        req.params.id,
        {$set : req.body },
        err=>{
            if(!err)
                res.send("Updated Successfully.");
            else
                res.send(err);
        }

    )

});

module.exports = router;