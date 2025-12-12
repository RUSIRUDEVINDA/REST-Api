//middleware/errorHandler.js

const { models } = require("mongoose");

module.exports=(err,req,res,next)=>{
    console.error(err); //log server side

    if(res.headersSent){
        return next(err);
        //for unexpected errors return 500
        res.status(err.status || 500).json({
            error:err.message || 'internal server error'
        });
    }
};