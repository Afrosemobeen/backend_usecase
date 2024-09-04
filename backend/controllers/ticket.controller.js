const {Ticket} = require('../models/ticket.model')
const {Movie} = require('../models/movie.model')

const bookTicket = async(req,res)=>{
    const{title,theatre,seats,seatnum}=req.body
    try{
        let movie = await Movie.findOne({title:title})
        if(!movie){
            return res.status(404).send({message:"Movie not found"})
        }
        if(movie.availabletickets<seats){
            return res.status(404).send({message:"Not enough tickets available"})

        }
        let ticket = await Ticket.create({
            title,theatre,seats,seatnum,userId:req.id
            
        })
        movie.availabletickets-=seats;
        movie.availabletickets=movie.availabletickets<=0?movie.status='SOLD OUT' : movie.status='BOOK ASAP'
        await Movie.updateOne({title:title},movie)
        res.status(200).send({message:"Tickets booked",payload:ticket})
    }
    catch(error){
       res.status(500).send(error)
    }
}
    const getBookedTickets=async(req,res)=>{
        const {id}=req.params.id
    try{
        const ticket = await Ticket.find({userId:id})
        res.status(200).send({message:'Tickets Found',details:ticket})
    }
    catch(error){
        res.status(500).send(error)
     }
    }

    module.exports={bookTicket,getBookedTickets}