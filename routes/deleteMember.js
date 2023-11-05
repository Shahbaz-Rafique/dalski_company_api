const express=require('express');
const router=express.Router();
const {connection}=require('../database/connection');

router.post('/',(req,response)=>{
    const id=req.query.id;
    connection.query(`DELETE FROM team WHERE Id=${id}`,(err,res)=>{
        if(err) throw err;
        else{
                const responseData = { message: 'deleted'};
                response.status(200).json(responseData);
        }
   })
})
module.exports=router;