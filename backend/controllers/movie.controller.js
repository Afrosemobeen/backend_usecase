const {Movie} = require('../models/movie.model')

const getMovie = async(req,res)=>{
    try{
    const movie = await Movie.find()
    res.status(200).send({message:'Working',payload:movie})
}
catch(error){
    res.status(500).send(error)
 }
}
const searchMovie = async(req,res)=>{
    try{
    const regex = new RegExp(req.params.moviename,'i')
    const movie = await Movie.find({title:regex})
    res.status(200).send({message:'Working',payload:movie})
}
catch(error){
    res.status(500).send(error)
 }
}
const deleteMovie = async(req,res)=>{
    try{
    const title = req.params.moviename
    // const id = parseInt(req.params.id)
    // console.log('params',req.params,title,id)
    const movie = await Movie.deleteOne({title:title})

    res.status(200).send({message:'Movie deleted',payload:movie})
}
catch(error){
    res.status(500).send(error)
 }
}
const addMovie = async(req,res)=>{
    try{
    const{title,theatre,totaltickets}=req.body;
    let movie = await Movie.create({title,theatre,totaltickets,availabletickets:totaltickets})
res.status(200).send('Added movie successfully')
}
catch(error){
    res.status(500).send(error)
 }
}
const updateTicketStatus = async(req,res)=>{
    try{
    const{title}=req.params;
    const {ticket} = req.body;
    let movie = await Movie.findOne({title:title});
if(!movie){
    return res.status(404).send({message:'Movie not found'})

}
    movie.availabletickets -=ticket;
movie.availabletickets= movie.availabletickets<=0?movie.status='SOLD OUT':movie.status='BOOK ASAP'
await Movie.updateOne({title:title},movie)
res.status(200).send({payload:movie})
}
catch(error){
    res.status(500).send(error)
 }
}
module.exports={updateTicketStatus,getMovie,searchMovie,deleteMovie,addMovie}