
const express = require('express');
const { User } = require('../models/user.model');

const bcrypt = require('bcrypt');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post("/api/register", async(req,res) => {
    let { name, email, password, address } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(400).send({ "Error": err.message });
            } else {
                let newUser = new User({ name, email, password:hash, address })
                await newUser.save();
                res.status(201).send({ "Message": "User Register Successfully", "user": newUser })
            }
        });
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})


userRouter.post("/api/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ 'email': email });
    let hashPassword = user.password;
    try {
        bcrypt.compare(password, hashPassword, function (err, result) {
            if (result) {
                var token = jwt.sign({ userId: user._id }, process.env.key);
                 res.status(201).send({ "Message": "User LOgin Successfully", "token": token })
            } else {
                res.status(400).send({ "Error": err.message });
                console.log(err);
            }
        });
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
}
)

userRouter.patch('/api/user/:id', async(req, res) => {
    let id = req.params.id;
    console.log(id);
try {
    let user = await User.find({ _id: id });
    // let hashPassword=user.password
    console.log(user);
    res.send(user)
} catch (error) {
    res.status(400).send({ "Error": error.message });
        console.log(error);
}
})


// userRouter.patch('/api/user/:id/reset', async (req,res) => {
//     let id = req.params.id;
//     console.log(id);
//     let { currentPassword, newPassword } = req.body;
//     let user = await User.findOne({ '_id': id });
//     let hashPassword=user.password
//     console.log(user);
//         //     try {
//         //         bcrypt.compare(currentPassword, hashPassword, function (err, result) {
//         //             if (result) {
//         //                 bcrypt.hash(newPassword, 5, async function (err, hash) {
//         //                     if (err) {
//         //                         res.status(400).send({ "Error": err.message });
//         //                     } else {
//         //                         new User.findByIdAndUpdate({_id:id},{password: hash })
//         //                         res.status(204).send({ "Message": "Passowrd Updated Successfully"})
//         //                     }
//         //                 });
//         //             } else {
//         //                  res.status(400).send({ "Error": err.message });
//         //         console.log(err);
//         //             }
//         //         });
//         // } catch (error) {
//         //     res.status(400).send({ "Error": error.message });
//         //         console.log(error);
//         // }

// });

module.exports={userRouter}