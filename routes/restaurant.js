const express = require("express");
const { Restaurant } = require("../models/restaurent.mode");
const fs=require('fs')

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
    let id=req.params.id
    try {
        let rest = await Restaurant.find({ '_id': id });
        for (let el of rest) {
            res.status(200).send({"Single Resturants":el.menu})
        }
        // console.log(menu);
        

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

// Post

restaurantrRouter.post('/api/restaurants/:id/menu', async (req, res) => {
    let id = req.params.id
    let payload = req.body;
    try {
        let rest = await Restaurant.find({ '_id': id });
        console.log(rest);
            // let data = el.menu.push(payload);
            // let newData = Restaurant({data});
            // await newData.save();
            // res.status(201).send("Menu updated")
        // }

        

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