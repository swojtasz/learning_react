import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([
    {
      name: "Szymon",
      age: 5,
      id: "i1",
    },
    {
      name: "Anna",
      age: 6,
      id: "i2",
    },
  ]);

  const addUserHandler = (userName, userAge) => {
    setUsersList((prevState) => {
      return [
        ...prevState,
        { name: userName, age: userAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
