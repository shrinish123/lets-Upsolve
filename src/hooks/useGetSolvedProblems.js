import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetSolvedProblems = (handle) => {

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

    return solvedProblems;
}

export default useGetSolvedProblems;