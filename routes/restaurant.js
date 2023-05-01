const express = require("express");
const { Restaurant } = require("../models/restaurent.mode");
const fs = require('fs');const { ObjectId } = require("mongodb");
 4
// const ObjectId = require('mongodb').ObjectId;

const restaurantrRouter = express.Router();

restaurantrRouter.get('/api/restaurants',async(req,res)=>{
    try {
        let rest = await Restaurant.find();
        res.status(200).send({"All Resturants":rest})

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

restaurantrRouter.get('/api/restaurants/:id', async (req, res) => {
    let id=req.params.id
    try {
        let rest = await Restaurant.find({'_id': id});
        res.status(200).send({"Single Resturants":rest})

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

restaurantrRouter.get('/api/restaurants/:id/menu', async (req, res) => {
    let id =  new ObjectId(req.params.id);
    console.log(id);
    try {
        let rest = await Restaurant.findById(id);
        res.status(201).send(rest.menu);
        

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

// Post
restaurantrRouter.post('/api/restaurants/:id/menu', async (req, res) => {
    let payload = req.body;
    console.log(payload);
    let id = new ObjectId(req.params.id);
    console.log(id);
    try {
        let rest = await Restaurant.findByIdAndUpdate(id, { $push: { menu: payload } });
        res.send(rest);
        console.log(rest);
        // let data = new Restaurant(newData);
        // await data.save();
        // res.status(201).send({ "msg":"Menu updated",menu:data})
        

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
});

restaurantrRouter.delete('/api/restaurants/:id/menu/:id', async (req, res) => {
    // let payload = req.body;
    // console.log(payload);
    // let id =  new ObjectId(req.params.id);
    let id=req.params.id
    try {
         await Restaurant.findByIdAndDelete({'_id':id},);
         res.status(201).send({ "msg":"Menu deleted from Restaurant"})
        // let data = new Restaurant(newData);
        // await data.save();
        // res.status(201).send({ "msg":"Menu updated",menu:data})
        

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})



restaurantrRouter.post('/api/restaurants', async(req,res) => {
    let {name,address,menu } = req.body;
    try {
        let newRest = new Restaurant({ name, address,menu });
        await newRest.save()
        res.status(201).send({"Message": "Restaurants added Successfully",'rs': newRest});
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

module.exports={restaurantrRouter}