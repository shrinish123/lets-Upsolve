import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import EnhancedTable from "../Components/EnhancedTable";

const Tags = () => {
  const [checked, setChecked] = useState([]);

  const [problems, setProblems] = useState([]);

  const tags = [
    "greedy",
    "implementation",
    "math",
    "constructive algorithms",
    "sortings",
    "strings",
    "brute force",
    "data structures",
    "number theory",
    "dp",
    "two pointers",
    "combinatorics",
    "binary search",
    "geometry",
    "dfs and similar",
    "graphs",
    "trees",
    "games",
    "bitmasks",
  ];

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    const getProblems = async () => {
      let tagString = "";

      for (let tag of checked) {
        const modifiedTag = tag.replace(" ", "%20") + ";";
        tagString += modifiedTag;
      }

      try {
        const resProblems = await axios.get(
          `https://codeforces.com/api/problemset.problems?tags=${tagString}`
        );
        setProblems(resProblems.data.result.problems);
      } catch (err) {
        console.log(err);
      }
    };

    getProblems();
  }, [checked]);

  const Item = styled(Paper)(() => ({
    textAlign: "center",
    margin: "2rem",
  }));

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Item>{customList(tags, handleToggle, checked)}</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <EnhancedTable problems={problems} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Tags;

const customList = (tags, handleToggle, checked) => (
  <Paper sx={{ width: "25rem", height: "35rem", overflow: "auto" }}>
    <List dense component="div" role="list">
      {tags.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;

        return (
          <ListItem
            key={value}
            role="listitem"
            button
            onClick={() => {
              handleToggle(value);
            }}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value}`} />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  </Paper>
);
