import React, { useState} from 'react';
import axios from 'axios'

const UserContext = React.createContext({
  user: {},
  setCurrentUser: () => {},
  
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

 
  const setCurrentUser =async (e,handle) => {
    e.preventDefault();

    try{
        const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
        setUser(res.data.result[0]);
        localStorage.setItem('user',JSON.stringify(res.data.result[0]));
    }
    catch(err){
        console.log(err);
    }
   
   }
  
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