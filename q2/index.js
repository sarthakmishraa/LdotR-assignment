import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(cors());
app.use(express.json());

let users = [
    {
        id: 1,
        firstName: "Sarthak",
        lastName: "Mishra",
        email: "msarthak785@gmail.com",
        age: 24
    },
    {
        id: 2,
        firstName: "Ayushman",
        lastName: "Vashistha",
        email: "ayushman@vashistha.com",
        age: 25
    },
    {
        id: 3,
        firstName: "Shishir",
        lastName: "Saxena",
        email: "shishir@saxena.com",
        age: 26
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Please visit /users route for all user details</h1>")
});

app.get("/users", (req, res) => {
    res.status(200).send(users);
});

app.listen(PORT, () => {
    console.log(`Express server running on port: ${ PORT }`);
});