import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetSolvedContests = (handle) =>{
   const [solvedContests,setSolvedContests] = useState([]);
   useEffect(() => {
    const getSolvedContests = async () => {
        try {
            const submissions = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
            const submissionsArr = submissions.data.result;
            const acSubmissions = submissionsArr.filter(submission => submission.verdict === "OK");
            const solvedContestsArr = acSubmissions.map(acSubmission => acSubmission.problem.contestId);
            setSolvedContests(solvedContestsArr);
          } catch(err) {
            console.log(err);
          }
    }
    getSolvedContests();
   },[handle]);

   return(solvedContests);
}
export default useGetSolvedContests;