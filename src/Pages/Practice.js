import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";

import EnhancedTable from "../Components/EnhancedTable";

const Practice = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { rating } = user;

  const [level, setLevel] = useState(1);
  const [problems, setProblems] = useState([]);

  //level1 -- > rating%100 >  +100
  // level2 > +200
  //level3 > +300

  const Item = styled(Paper)(() => ({
    backgroundColor: "#1A2027",
    padding: "2rem",
    color: "white",
    margin: "2rem",
    cursor: "pointer",
    textAlign: "center",
  }));

  const TableItem = styled(Paper)(() => ({
    padding: "2rem",
    margin: "2rem",
  }));

  useEffect(() => {
    const getProblems = async () => {
      try {
        const startRange = rating - (rating % 100) + (level - 1) * 100;
        const endRange = startRange + 100;

        const problemsres = await axios.get(
          `https://codeforces.com/api/problemset.problems?tags=`
        );
        let problemsArr = problemsres.data.result.problems;
        problemsArr = problemsArr.filter(
          (problem) =>
            problem.rating >= startRange && problem.rating <= endRange
        );

        setProblems(problemsArr);
      } catch (err) {
        console.log(err);
      }
    };

    getProblems();
  }, [level, rating]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item
              onClick={() => {
                setLevel(1);
              }}
            >
              Level 1{" "}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              onClick={() => {
                setLevel(2);
              }}
            >
              Level 2
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              onClick={() => {
                setLevel(3);
              }}
            >
              Level 3
            </Item>
          </Grid>

          <Grid item xs={12}>
            <TableItem>
              <EnhancedTable problems={problems} />
            </TableItem>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Practice;
