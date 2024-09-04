const exp = require('express')
const movieApp = exp.Router()

const{getMovie,searchMovie,deleteMovie, addMovie, updateTicketStatus}=require('../controllers/movie.controller')

const auth = require('../utils/auth')
movieApp.get('/all',getMovie)
movieApp.get('/movies/search/:moviename',searchMovie)
movieApp.delete('/:moviename/delete',auth,deleteMovie)
movieApp.post('/add',auth,addMovie) 
movieApp.post('/update/:title',auth,updateTicketStatus)

module.exports=movieApp