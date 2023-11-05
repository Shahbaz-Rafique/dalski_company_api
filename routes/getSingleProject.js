const express=require('express');
const router=express.Router();
const {connection}=require('../database/connection');

router.get('/',(req,response)=>{
    connection.query(`SELECT * from portfolio WHERE Id=${req.query.Id}`,(err,res)=>{
        if(err) throw err;
        else{
                const responseData = { data: res};
                response.status(200).json(responseData);
        }
   })
})
module.exports=router;