import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Barchart(props) {
    const dataset=props.data?.map((item)=>{
        
      let object={};
      object.label=item.label;
      object.value=item.value;

      return object;
       
})

    console.log(dataset);
  return (
    <div>
        <Bar
           data={{
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets:[{
                      label: `${props.title}`,
                      data: dataset,
                      parsing:{
                        xAxisKey:'label',
                        yAxisKey:'value',
                      },
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                      ],
            }],
            borderwidth:1,
        }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio:false,
            
          }}
          />
    </div>
  )
}

export default Barchart