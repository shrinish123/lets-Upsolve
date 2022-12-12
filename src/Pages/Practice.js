import React,{useState,useEffect} from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import axios, { AxiosHeaders } from 'axios';
import { StepButton } from '@mui/material';

import { EnhancedTable} from './Tags';

const Practice = () => {


  const user = JSON.parse(localStorage.getItem('user'));
  const {rating,handle} = user;

  const [level,setLevel] = useState(1);
  const [problems,setProblems] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Level 1','Level 2','Level 3'];

  //level1 -- > rating%100 >  +100 
  // level2 > +200
  //level3 > +300

  const TableItem = styled(Paper)(() => ({
    padding: '2rem',
    margin:'2rem',
  }));


  useEffect(()=> {

    const getProblems = async() => {

      try{
  
        const startRange = (rating - rating%100) + (level-1)*100;
        const endRange = startRange + 100;
  
        const problemsres = await axios.get(`https://codeforces.com/api/problemset.problems?tags=`);
        let problemsArr = problemsres.data.result.problems;
        problemsArr = problemsArr.filter((problem)=> problem.rating >= startRange && problem.rating <= endRange);
     
        setProblems(problemsArr);
        
  
      }catch(err){
         console.log(err);
      }
    }

     getProblems();
  },[level,rating]);

  const [solvedProblems,setSolvedProblems] = useState([]);
  useEffect(()=> {
    
    const getSolvedProblems = async() => {
      try {
        const submissions = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
        const submissionsArr = submissions.data.result;
        const acSubmissions = submissionsArr.filter(submission => submission.verdict === "OK");
        const solvedProblemsArr = acSubmissions.map(acSubmission => acSubmission.problem.contestId+acSubmission.problem.index);
        setSolvedProblems(solvedProblemsArr);
      } catch(err) {
        console.log(err);
      }
    }
 
    getSolvedProblems();
  },[handle]);

  return (
    <>
     <Box >
    
      <div style={{padding : "64px"}}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={()=> {setLevel(index); setActiveStep(index)}}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </div> 
        
        <Grid item xs={12}>
          <TableItem>
            <EnhancedTable problems={problems} solvedProblems={solvedProblems}/>
          </TableItem>
        </Grid>
    </Box>

    </>
  )
}

export default Practice