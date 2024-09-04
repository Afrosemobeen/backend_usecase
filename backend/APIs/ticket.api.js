const exp = require('express')
const ticketApp = exp.Router()
const { bookTicket, getBookedTickets } = require('../controllers/ticket.controller')
const auth = require('../utils/auth')
ticketApp.get('/gettickets/:id',auth,getBookedTickets)
ticketApp.post('/bookticket',auth,bookTicket)

module.exports=ticketApp
