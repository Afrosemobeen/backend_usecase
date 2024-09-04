const mongoose = require('mongoose')
const ticketSchema = new mongoose.Schema({
    title:{
       type:String,
       required:true
   },
    theatre:{
       type:String,
       required:true
   },
    seatnum:[String],
    seats:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        ref:'User',

    }

})

const Ticket = mongoose.model('ticket',ticketSchema)

module.exports ={Ticket}