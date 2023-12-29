const contactRoute=require('express').Router()
const {readAll,readSingle,createContact,updatecontact,deletecontact}=require('../controller/contactController')

contactRoute.get('/all',readAll);
contactRoute.get('/single/:id',readSingle)

//post
contactRoute.post('/add',createContact)

//patch
contactRoute.patch('/update/:id',updatecontact)


//delete
contactRoute.delete('/delete/:id',deletecontact)

module.exports=contactRoute