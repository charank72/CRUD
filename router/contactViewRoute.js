const route=require('express').Router()
const {index,add,edit}=require('../controller/contactView')

route.get('/',index)
route.get('/create',add)
route.get('/edit',edit)

module.exports=route