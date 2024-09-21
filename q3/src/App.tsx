import { useState, useEffect } from "react";

interface usersType {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  age: number
}

function App() {
  const [users, setUsers] = useState<usersType[] | null>(null);
  
  // Run q2's express server 
  // BE runs on port 3000
  // FE(this) runs on port 5173
  
  const BE_URL = "http://localhost:3000/users";

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(BE_URL).then(res => res.json());
        setUsers(response);
      }
      catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);
  return (
    <>
      <div>
        {
          users?.map((user) => (
            <div key={user.id}>
              <li>{ user.firstName } { user.lastName } is { user.age }</li>
              <p>Email: { user.email }</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
