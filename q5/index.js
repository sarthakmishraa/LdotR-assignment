// RUN THESE COMMANDS TO MAKE A CLUSTER LOCALLY
// THEN RUN THE EXPRESS SERVER

// docker pull mongo
// docker run -p 27017:27017 -d --name test mongo

import express from "express";
import mongoose from "mongoose";

import model from "./usersSchema.js";

const app = express();
const PORT = process.env.PORT | 3000;

mongoose.connect("mongodb://localhost:27017")
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).send("<h1>Hello from express, go to /users/{email} to access a user specific user </h2>")
});

app.get("/users/:email", (req, res) => {
    const inputEmail = req.params.email;

    if(!inputEmail) {
        return res.status(404).json({ message: "Email not entered" });
    }

    model.find({ email: inputEmail }).then(function (error, docs) {
        if(error) {
            console.log(error);
        }

        return res.status(200).send(docs);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`);
});