var express = require('express');
var router = express.Router();
const multer = require("multer");
const {connection}=require('../database/connection');

var storage=multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,"./public/images/");
  },
  filename:function(req,file,cb){
      cb(null,Date.now()+file.originalname)
  }
})

var upload = multer({ storage });

router.post('/',upload.single('image'),(req,response,next)=>{
    var name=req.body.updatename;
    var position=req.body.updateposition;
    var description=req.body.updatedescription;
    var id=req.body.proid;

    if(req.file){
        connection.query(`UPDATE team SET name='${name}',position='${position}',description='${description}',photo='${req.file.filename}' where Id=${id}`,(err,res)=>{
            if(err) throw err;
            else{
                response.redirect(`http://localhost:3000/team.html`)
            }
        })
    }
    else{
        connection.query(`UPDATE team SET name='${name}',position='${position}',description='${description}' where Id=${id}`,(err,res)=>{
            if(err) throw err;
            else{
                response.redirect(`http://localhost:3000/team.html`)
            }
        })
    }
  })
  module.exports = router;