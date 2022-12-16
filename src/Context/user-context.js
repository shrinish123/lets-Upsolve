import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = React.createContext({
  user: {},
  setCurrentUser: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

  const setCurrentUser = async (e, handle) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      setUser(res.data.result[0]);
      localStorage.setItem("user", JSON.stringify(res.data.result[0]));
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data.comment, toast.POSITION.TOP_RIGHT);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setCurrentUser: setCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
