import React,{useState,useEffect} from 'react'
// import CanvasJSReact from '../assets/canvasjs.react';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

// import FusionCharts from "fusioncharts";
// import charts from "fusioncharts/fusioncharts.charts";
// import ReactFusioncharts from "react-fusioncharts";

// const {CanvasJS,CanvasJSChart} = CanvasJSReact;
// charts(FusionCharts);

import Barchart from '../Components/Barchart';


const Analysis = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [graphData,setGraphData] = useState({});
   
    useEffect(()=>{

        const getSubmissions =async() => {

            try{
                const submissionsres = await axios.get(`https://codeforces.com/api/user.status?handle=${user.handle}&from=1`);
               
                const submissions = submissionsres.data.result;
                const tagsMap = new Map();
                const tags = [];
                // let untaggedSubmissions = 0;
    
                const verdictsMap = new Map();
                const verdicts = [];
                
                for(let submission of submissions){
    
                    if(!submission.problem.tags[0]){
                      
                    }
                    if(submission.problem.tags[0]){
                        
                        if(!tagsMap.has(submission.problem.tags[0])){
                            tagsMap.set(submission.problem.tags[0],1);
    
                        }else{
                            let count = tagsMap.get(submission.problem.tags[0]);
                            count++;
                            tagsMap.set(submission.problem.tags[0],count);
                        }
                        
                    }
    
                    if(submission.verdict){
                       
                        if(!verdictsMap.has(submission.verdict)){
                            verdictsMap.set(submission.verdict,1);
                        }else{
                          let count = verdictsMap.get(submission.verdict);
                          count++;
                          verdictsMap.set(submission.verdict,count);
                        }
                    }
                    
                }
    
                tagsMap.forEach((count,tag)=> {
                    
                    const tagObj = {
    
                        label: tag,
                        value:count,
                    }
                     tags.push(tagObj);
                })
                // console.log(verdictsMap);
    
                verdictsMap.forEach((count,verdict)=> {
                    
                    const verdictObj = {
    
                        label: verdict,
                        value:count,
                    }
                     verdicts.push(verdictObj);
                })
                // console.log(verdicts)
    
               setGraphData({tagData:tags,verdictData:verdicts});
            }
            catch(err){
               console.log(err);
            }
        }

      getSubmissions();
    },[user.handle]);

    

    console.log(graphData.verdictData);

    // const dataSource = {
    //     chart: {
    //       caption: `Tags Solved By ${user.handle}`,
    //       subcaption: "",
    //       showvalues: "1",
    //       showpercentintooltip: "1",
    //       numberprefix: "",
    //       enablemultislicing: "1",
    //       theme: "candy",
    //     },
    //     data: graphData.tagData
    //   };

    //   const verdictDataSource = {
    //     chart: {
    //       caption: `Verdict Distribution ${user.handle}`,
    //       subcaption: "",
    //       showvalues: "1",
    //       showpercentintooltip: "1",
    //       numberprefix: "",
    //       enablemultislicing: "1",
    //       theme: "candy",
    //     },
    //     data: graphData.verdictData
    //   };
      console.log(graphData.tagData);
   
    // const options = {
    //     animationEnabled: true,
    //     exportEnabled: true,
    //     theme: "dark1", // "light1", "dark1", "dark2"
    //     title:{
    //         text: `Tags Solved By ${user.handle}`
    //     },
    //     data: [{
    //         type: "pie",
    //         showInLegend: true,
	// 		legendText: "{label}",
	// 		toolTipContent: "{label}: <strong>{y}%</strong>",
	// 		indexLabel: "{y}%",
	// 		indexLabelPlacement: "inside",
    //         dataPoints: graphData.tagData
    //     }]
    // }

    const LargeItem = styled(Paper)(() => ({
        backgroundColor: '#1A2027',
        padding: '2rem',
        textAlign: 'center',
        margin: '0 15rem',
        boxShadow:'3px 3px 3px 2px rgba(0, 0, 0, 0.2)'
      }));
    
      const SmallItem = styled(Paper)(() => ({
        backgroundColor: '#1A2027',
        padding: '2rem',
        textAlign: 'center',
        margin: '0 15rem',
        boxShadow:'3px 3px 3px 2px rgba(0, 0, 0, 0.2)'
      }));  



  return (
    <>
     <Grid container spacing={2}>
        
        <Grid xs={12}>
          <LargeItem>
        
        <div >
          <Barchart data={graphData.tagData} title={`Tags Solved By ${user.handle}`}/>
        </div>
          </LargeItem>
          
        </Grid>
        <Grid xs={12}>
        <SmallItem>
         <div >
          <Barchart data={graphData.verdictData} title={`Verdict Distribution ${user.handle}`}/>
        </div>
          </SmallItem>
          
      </Grid>
      <Grid xs={4}>
        
      </Grid>
      </Grid>
    </>
  )
}

export default Analysis