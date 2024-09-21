import { useState, useEffect } from "react";
import axios from "axios";

interface userType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
}

export const Users = () => {
    const [fName, setFName] = useState<string | null>(null);
    const [lName, setLName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [age, setAge] = useState<string | null>(null);
    const [users, setUsers] = useState<userType[] | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/users", {
            id: parseInt((Math.random()*100).toString()),
            firstName: fName,
            lastName: lName,
            email: email,
            age: age
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
            
            window.location.reload();
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getUsers = async () => {
          try {
            const usersData = await fetch("http://localhost:3000/users").then(res => res.json());
            setUsers(usersData);
          }
          catch(error) {
            console.log(error);
          }
        }
    
        getUsers();
    }, []);
    return(
        <div>
            <h1>Users</h1>
            {
                users?.map((user) => (
                <div key={ user.id }>
                    <li>{ user.firstName } { user.lastName } is { user.age }. Email: { user.email }</li>
                </div>
                ))
            }
            <h1>Add your details</h1>
            <form onSubmit={ handleSubmit }>
                <input required onChange={ (e) => setFName(e.target.value) } type="text" placeholder="Enter your first name" />
                <input required onChange={ (e) => setLName(e.target.value) } type="text" placeholder="Enter your last name" />
                <input required onChange={ (e) => setEmail(e.target.value) } type="text" placeholder="Enter your email" />
                <input required onChange={ (e) => setAge(e.target.value) } type="text" placeholder="Enter your age" />
                <input type="submit" />
            </form>
        </div>
    )
}