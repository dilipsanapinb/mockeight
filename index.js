const express = require('express');

const { connection } = require("./config/db");
const { userRouter } = require('./routes/user');
const { restaurantrRouter } = require('./routes/restaurant');
const { orderRouter } = require('./routes/order');

require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Welcome")
})

app.use('/user', userRouter)
app.use('/restaurant', restaurantrRouter);
app.use("/order",orderRouter)

app.listen(process.env.PORT, async() => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log({"Error": error.message});
    }
    console.log(`Server listening on port ${process.env.PORT}`);
})