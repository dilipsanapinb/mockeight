
const express = require('express');
const { Order} = require('../models/orders');

const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

require('dotenv').config();

let orderRouter = express.Router();

orderRouter.get('/api/orders/:id', async (req, res) => {
    let id=req.params.id
    try {
        let order = await Order.find({'_id': id});
        res.status(200).send({"Single Order":order})

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})


orderRouter.post('/api/orders', async (req, res) => {
    let {user,restaurant,items,tottalPrice,deliveryAddress,status} = req.body;
    try {
        let newOrder = new Order({user,restaurant,items,tottalPrice,deliveryAddress,status });
        await newOrder.save()
        res.status(201).send({"Message": "Order added Successfully",'rs': newOrder});
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

orderRouter.patch('/api/orders/:id', async (req, res) => {
    let payload = req.body;
    let id=new ObjectId(req.params.id)
    try {
        let newOrder = await Order.findByIdAndUpdate({'_id':id}, payload);

        res.status(201).send({"Message": "Order Updated Successfully",'rs': newOrder});
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})
module.exports={orderRouter}