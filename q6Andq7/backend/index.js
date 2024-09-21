import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let users = [
    {
        id: 1,
        firstName: "Sarthak",
        lastName: "Mishra",
        email: "msarthak785@gmail.com",
        age: 24
    },
];

app.get("/", (req, res) => {
    res.status(200).send("<h2>go to /users</h2>")
});

app.get("/users", (req, res) => {
    res.status(200).send(users);
});

app.post("/users", (req, res) => {
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newEmail = req.body.email;
    const newAge = req.body.age;

    if(!newFirstName | !newLastName | !newEmail | !newAge) {
        return res.status(404).json({ message: "Please fill all the fields" });
    }
    
    const newUser = {
        id: users.length + 1,
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        age: newAge,
    };

    users = [...users, newUser];

    res.status(200).send(users);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`);
});