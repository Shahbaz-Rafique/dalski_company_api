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

router.post('/',upload.array('allImages', 30),(req,response,next)=>{
    const name=req.body.name;
    const category=req.body.category;
    const time=req.body.time;
    const client=req.body.client;
    const value=req.body.value;
    const link=req.body.link;
    const scope=req.body.scope;
    const files = req.files;

    const data={
        name:name,
        category:category,
        period:time,
        client:client,
        value:value,
        link:link,
        scope:scope,
        thumbnail:req.files[0].filename,
        status:"active",
    }
    let count=0;
    connection.query('INSERT into portfolio SET ?',data,(err,res)=>{
        if(err) throw err;
        else{
            console.log(files.length);
            for (const file of files) {
                const datas={
                    projectId:res.insertId,
                    image:file.filename,
                }
                connection.query('INSERT into images SET ?',datas,(err,res)=>{
                    if(err) throw err;
                    else{
                        console.log("added");
                    }
                })
            }
            response.redirect('http://localhost:3000/portfolio.html')
        }
    })
})
module.exports = router;