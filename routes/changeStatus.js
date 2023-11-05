var express = require('express');
var router = express.Router();
const {connection}=require('../database/connection');

router.get('/',(req,response,next)=>{
    const status=req.query.status;
    const id=req.query.id;

    connection.query(`UPDATE portfolio SET status='${status}' WHERE Id=${id}`,(err,res)=>{
        if(err) throw err;
        else{
            const responseData = { message: 'updated'};
            response.status(200).json(responseData);
        }
    })
})
module.exports = router;