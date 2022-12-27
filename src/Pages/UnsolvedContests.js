import React from 'react';
import useGetSolvedContests from '../hooks/useGetSolvedContests';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { UnsolvedContestsTable } from './UnsolvedContestsTable';
const UnsolvedContests = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const {handle} = user;
    
    const solvedContests = useGetSolvedContests(handle);
    const [level,setContestLevel] = useState(0);
    const [unsolvedcontests,setUnsolvedContests] = useState([]);
    const [isUnsolved,setUnsolved] = useState(false);
    const Item = styled(Paper)(() => ({
        backgroundColor: '#1A2027',
        padding: '2rem',
        color: 'white',
        margin:'2rem',
        cursor: 'pointer',
        textAlign:'center'
      }));
    
      const TableItem = styled(Paper)(() => ({
        padding: '1rem',
        margin:'1rem',
      }));
      useEffect(() => {
        const divs = ['(Div. 1)','(Div. 2)','(Div. 3)','(Div. 4)','Educational Codeforces Round'] ;
        const getUnsolvedContests = async () => {
            try{
                let contestRes = await axios.get(" https://codeforces.com/api/contest.list?gym=");
                let contestList = contestRes.data.result;
                contestList = contestList.filter((contest) => (contest.name).includes(divs[level]) === true && contest.phase === "FINISHED" && solvedContests.includes(contest.id) === false); 
                setUnsolvedContests(contestList);
                console.log(contestList);
                setUnsolved(true);
            }
            catch(err){
                console.log(err);
            }
        }

        getUnsolvedContests();
    },[level,solvedContests]);
    return(
        <>
         <Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Item onClick={()=> {setContestLevel(0)}}>Div. 1 </Item>
        </Grid>
        <Grid item xs={2}>
          <Item onClick={()=> {setContestLevel(1)}}>Div. 2</Item>
        </Grid>
        <Grid item xs={2}>
          <Item onClick={()=> {setContestLevel(2)}}>Div. 3</Item>
        </Grid>
        <Grid item xs={2}>
          <Item onClick={()=> {setContestLevel(3)}}>Div. 4 </Item>
        </Grid>
        <Grid item xs={2}>
          <Item onClick={()=> {setContestLevel(4)}}>Educational</Item>
        </Grid>
        {unsolvedcontests.length > 0 && isUnsolved === true && (<><Grid item xs={12}>
          <TableItem>
            <UnsolvedContestsTable unsolvedcontests = {unsolvedcontests} />
          </TableItem>
        </Grid></>)}
      </Grid>
    </Box>
        </>
    )
}

export default UnsolvedContests