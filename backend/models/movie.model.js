const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
 
    title:{
     type:String,
     required:true
 },
    theatre:{
     type:String,
     required:true
 },
    totaltickets:{
     type:Number,
     required:true
 },
    availabletickets:{
     type:Number,
     required:true
 },
    status:{
        type:String,
         enum:['BOOK ASAP','SOLD OUT']
    }
 })
 const Movie = mongoose.model('movie',movieSchema)


module.exports ={Movie}