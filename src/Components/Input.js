import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import UserContext from "../Context/user-context";

const Input = () => {
  const ctx = useContext(UserContext);

  const [handle, setHandle] = useState("");

  const handleChange = (e) => {
    setHandle(e.target.value);
  };

  const handleSubmit = async (e) => {
    ctx.setCurrentUser(e, handle);
    setHandle("");
  };

  return (
    <>
      <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Codeforces Handle"
          variant="outlined"
          onChange={handleChange}
          value={handle}
        />

        <Button
          onClick={handleSubmit}
          style={{ padding: "1rem", margin: "0 1rem" }}
          variant="contained"
        >
          Find
        </Button>
      </form>
    </>
  );
};

export default Input;
