var express = require('express');
var router = express.Router();
const multer = require("multer");
const {connection}=require('../database/connection');

router.post('/',(req,response,next)=>{
    const name=req.body.updatename;
    const category=req.body.updatecategory;
    const time=req.body.updatetime;
    const client=req.body.updateclient;
    const value=req.body.updatevalue;
    const link=req.body.updatelink;
    const scope=req.body.updatescope;
    const id=req.body.proid;

    connection.query(`UPDATE portfolio SET name='${name}',category='${category}',period='${time}',client='${client}',value='${value}',link='${link}',scope='${scope}' WHERE Id=${id}`,(err,res)=>{
        if(err) throw err;
        else{
            response.redirect('https://my-dalski-web.netlify.app/portfolio.html')
        }
    })
})
module.exports = router;