import React,{useState,useEffect} from 'react'
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Tags = () => {
   

   const [checked ,setChecked] = useState([]);
   
   const [problems,setProblems] = useState([]);

   const tags = [
     'greedy', 
     'implementation',
     'math',
     'constructive algorithms',
     'sortings',
     'strings',
     'brute force',
     'data structures',
     'number theory',
     'dp',
     'two pointers',
     'combinatorics',
     'binary search',
     'geometry',
     'dfs and similar',
     'graphs',
     'trees',
     'games',
     'bitmasks'
   ]

   const handleToggle = (value) => {
       
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
   }
    
   useEffect(()=> {

    const getProblems =async() => {
      
      let tagString = '';
 
      for(let tag of checked) {
         const modifiedTag = tag.replace(' ', '%20') + ';';
         tagString += modifiedTag;
      }
       
      try{
       const resProblems = await axios.get(`https://codeforces.com/api/problemset.problems?tags=${tagString}`);
       setProblems(resProblems.data.result.problems);
      }
      catch(err){
       console.log(err);
      }
       
    }

     getProblems();
   },[checked]);

   

   const Item = styled(Paper)(() => ({
    textAlign: 'center',
    margin:'2rem'
  }))
   
  return (
    <>
     <Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Item>{customList(tags,handleToggle,checked)}</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
          <EnhancedTable problems={problems}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Tags;



const customList = (tags,handleToggle,checked) => (
  <Paper sx={{ width: '25rem', height: '35rem', overflow: 'auto' }}>
    <List dense component="div" role="list">
      {tags.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;

        return (
          <ListItem
            key={value}
            role="listitem"
            button
            onClick={()=> {handleToggle(value)}}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                inputProps={{
                  'aria-labelledby': labelId,
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


export const EnhancedTable = ({problems}) => {

 console.log(problems);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleClick = (e,problem) => {
    e.preventDefault();
    window.open(`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,'_blank');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - problems.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead/>

            <TableBody>
              
              {problems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((problem, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      style = {{cursor: 'pointer'}}
                      onClick={(event) => handleClick(event, problem)}
                      tabIndex={-1}
                      key={problem.name}
                    >
                      <TableCell align="left">{`${problem.contestId}${problem.index}`}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row">
                        {problem.name}
                      </TableCell>
                      <TableCell align="left">{problem.rating}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: '2rem',
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={problems.length}
          rowsPerPage={rowsPerPage}
          // TO DO 
          // fix the option to change pages as per availablity // right now there is ui ,but not working 
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}

export const EnhancedTableHead = ()=> {
  
  const headCells = [
    {
      id : 'problem id',
      label: 'Problem ID'
    },
    {
      id : 'problem',
      label: 'Problem'
    },
    {
      id : 'rating',
      label: 'Problem Rating'
    }
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'normal'}
          >
            {headCell.label}

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
