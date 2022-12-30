import React,{useState,useEffect} from 'react'
// import CanvasJSReact from '../assets/canvasjs.react';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

//import FusionCharts from "fusioncharts";
//import charts from "fusioncharts/fusioncharts.charts";
//import ReactFusioncharts from "react-fusioncharts";
import Barchart from '../Components/Barchart';
// const {CanvasJS,CanvasJSChart} = CanvasJSReact;
//charts(FusionCharts);


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
                const actagsMap = new Map();
                const actags = [];
                
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
                    
                    if(submission.verdict === "OK"){
                      if(submission.problem.tags[0]){
                        if(!actagsMap.has(submission.problem.tags[0])){
                          actagsMap.set(submission.problem.tags[0],1);
                          
                      }else{
                          let countac = actagsMap.get(submission.problem.tags[0]);
                          countac++;
                          actagsMap.set(submission.problem.tags[0],countac);
                          
                      }
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
                console.log(verdictsMap);
    
                verdictsMap.forEach((count,verdict)=> {
                    
                    const verdictObj = {
    
                        label: verdict,
                        value:count,
                    }
                     verdicts.push(verdictObj);
                })
                console.log(verdicts)
                if(submissions.length > 0){
                  let counttot  = submissions.length;
                actagsMap.forEach((count,tag) => {
                    let perc = (count*100.0)/counttot;
                    const actagObj = {
                      label: tag,
                      value: perc, 
                    }
                    actags.push(actagObj);
                  
                })    
              }
              setGraphData({tagData:tags,verdictData:verdicts,actagData:actags});
            }
            catch(err){
               console.log(err);
            }
        }

      getSubmissions();
    },[user.handle]);

    

    console.log(graphData.verdictData);

   // const dataSource = {
     //   chart: {
       //   caption: `Tags Solved By ${user.handle}`,
       //   subcaption: "",
       //   showvalues: "1",
       //   showpercentintooltip: "1",
       //   numberprefix: "",
       //   enablemultislicing: "1",
       //   theme: "candy",
       // },
      //  data: graphData.tagData
     // };

   //   const verdictDataSource = {
     //   chart: {
     //     caption: `Verdict Distribution ${user.handle}`,
     //     subcaption: "",
     //     showvalues: "1",
     //   showpercentintooltip: "1",
     //   numberprefix: "",
     //   enablemultislicing: "1",
    //   theme: "candy",
      //  },
      //  data: graphData.verdictData
     // };
      
     // const acDataSource = {
      //  chart: {
      //    caption: `Percentage of AC Submissions Tag-wise By ${user.handle}`,
       //   subcaption: "",
      //    showvalues: "1",
      //    showpercentintooltip: "1",
      //    numberprefix: "",
      //    numbersuffix: "%",
      //    enablemultislicing: "1",
      //    theme: "candy",
     //   },
     //   data: graphData.actagData
    //  };
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
        {/* <Grid xs={12}>
          <LargeItem>
          <CanvasJSChart options = {options} />
          </LargeItem>
        </Grid> */}
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
      <Grid xs={12}>
      <SmallItem>
        <div >
          <Barchart data={graphData.actagData} title={`Percenatge AC-submissions Tagwise by ${user.handle}`}/>
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