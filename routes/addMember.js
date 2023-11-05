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
    var name=req.body.name;
    var position=req.body.position;
    var description=req.body.description;
    var image=req.file.filename;
    
    const data={
        name:name,
        position:position,
        description:description,
        photo:image,
    }

    connection.query('INSERT INTO team SET ?',data,(err,res)=>{
        if(err) throw err;
        else{
            response.redirect(`https://my-dalski-web.netlify.app/team.html`)
        }
    })
  })
  module.exports = router;