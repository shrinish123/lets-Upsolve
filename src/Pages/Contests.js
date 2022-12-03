import React,{useState,useEffect} from 'react'
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Contests = () => {
   
   const [message,setMessage]= useState('');
   const [toUpsolve,setToUpsolve] =useState([]);


   let contestIds =[];
   let problems = [];
   let solvedProblems = [];

//    const userCtx =  useContext(UserContext);
//    const {user} = userCtx;

   const user = JSON.parse(localStorage.getItem('user'));

   useEffect(()=>{
    
    const getProblems = async() => {
      try{
          
          const ratingChangesres = await axios.get(`https://codeforces.com/api/user.rating?handle=${user.handle}`);
          let ratingChanges = ratingChangesres.data.result;
          ratingChanges.reverse();
          
           
          if(ratingChanges.length === 0){
              setMessage("You haven't participated in any Contests");
              return;
          } 
          
          if(ratingChanges.length >= 3){
             ratingChanges = ratingChanges.slice(0,3);
          }
  
          for(let ratingChange of ratingChanges){
              console.log(ratingChange);
              contestIds.push(ratingChange.contestId);
          }
        
          for(let contestId of contestIds){
              const problemsres = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`);
              problems.push(...problemsres.data.result.problems);
  
              const submissionsres = await axios.get(` https://codeforces.com/api/contest.status?contestId=${contestId}&handle=${user.handle}&from=1`);
              let submissions = submissionsres.data.result;
              submissions = submissions.filter((submission)=>submission.verdict ==='OK');
              submissions = submissions.map(submission=>submission.problem);
              solvedProblems.push(...submissions);
          }
         const toUpsolve = problems.filter((problem)=> solvedProblems.findIndex((solvedProblem) => solvedProblem.index === problem.index && solvedProblem.contestId === problem.contestId) === -1);
  
         if(toUpsolve.length === 0 ){
          setMessage( "Nothing to Upsolve");
          return;
         }
         setToUpsolve(toUpsolve);
     
      }catch(err){
          console.log(err);
      }
    }

    getProblems();

   },);
   
  return (
    <>
     {message.length !== 0  && (<div>{message}</div>)}
     
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">ContestId</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toUpsolve.map((problem) => (
                  <ProblemRow problem={problem}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </>
  )
}


const ProblemRow = ({problem}) => {

    const StyledTableRow = styled(TableRow)(() => ({
        hover:'grey',
        cursor:'pointer'
      }));

    
    const handleRedirect = () => {
        window.open(`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`, '_blank');
    }
    
    return (
        <>
        <StyledTableRow key ={`${problem.contestId}${problem.index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick = {handleRedirect}
                >
                    <TableCell component="th" scope="row">
                      {problem.name}
                    </TableCell>
                    <TableCell align="right">{problem.rating}</TableCell>
                    <TableCell align="right">{problem.contestId}</TableCell>
        </StyledTableRow>
        </>
    )
}



export default Contests

