import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import{ ContestProblems} from './ContestProblems';
const ContestSearch = () => {
  
    const [contestName,setContestName] = useState("");
    const [contestProblems,setContestProblems] = useState([]);
    const [isSubmitted,setSubmitStatus] = useState(false);
    const handleContestChange = (e) => {        
        setContestName(e.target.value);
        setSubmitStatus(false);
      }
      const TableItem = styled(Paper)(() => ({
        padding: '2rem',
        margin:'2rem',
      }));
   
      const handleContestSubmit =async (e) => {
        let contestRes = await axios.get(" https://codeforces.com/api/contest.list?gym=false");
        let contestList = contestRes.data.result;
        contestList = contestList.filter((contest) => contest.name === contestName && contest.phase === "FINISHED");  
        console.log(contestList); 
        try{
        const problemsres = await axios.get(`https://codeforces.com/api/problemset.problems?tags=`);
        let problemsArr = problemsres.data.result.problems;
        problemsArr = problemsArr.filter((problem)=> problem.contestId === contestList[0].id);
        console.log(problemsArr);
        problemsArr.reverse();
        setContestProblems(problemsArr);
        
        }
        catch(err){
            console.log(err);
        }
        setSubmitStatus(true);      
      }

      return (
        <>
          <form style = {{textAlign:'center'}} onSubmit={handleContestSubmit}>
          <TextField id="outlined-basic" 
             label="Contest Name" 
             variant="outlined"
             onChange={handleContestChange}
             value ={contestName} />

            <Button onClick={handleContestSubmit} style={{padding: '1rem', margin : '0 1rem'}} variant="contained">Find Contest</Button>

          </form>
          {contestName.length > 0 && isSubmitted === true &&
          (<>
          <Box >
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TableItem>
                {<ContestProblems contestName = { contestName} contestProblems = { contestProblems}/>}
              </TableItem>
            </Grid>
    
          </Grid>
      </Box></>)}
        </>
    );
}


export default ContestSearch