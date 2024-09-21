// RUN THESE COMMANDS TO MAKE A CLUSTER LOCALLY
// THEN RUN THE EXPRESS SERVER

// docker pull mongo
// docker run -p 27017:27017 -d --name test mongo

import express from "express";
import mongoose from "mongoose";

import model from "./userModel.js";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mongoose.connect("mongodb://localhost:27017")
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.status(200).send("users");
});

app.post("/users", (req, res) => {
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newEmail = req.body.email;
    const newAge = parseInt(req.body.age);

    if(!newFirstName | !newLastName | !newEmail | !newAge) {
        return res.status(404).json({ message: "Please fill all the details" });
    }

    const newUser = new model({
        id: (Math.random(Math.floor())*100).toFixed(2),
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        age: newAge
    });

    newUser.save().then(
        users => res.status(201).send(users)
    ).catch(err => res.status(404).json({ message: err.message }));

});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${ PORT }`);
});