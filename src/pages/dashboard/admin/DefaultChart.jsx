import React, { useContext } from 'react';
import { Bar } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useCategory from '../../../hooks/useCategory';
import { color } from 'chart.js/helpers';
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";
const DefaultChart = () => {

    const [categories, refetch] = useCategory();
    console.log(categories)
    
    const labels =categories.map((field) => field._id);
    const dataValues = categories.map((feild)=>feild.count);
    
    const data = {
        labels :labels,
        datasets: [
            {
                label: "Available Items", 
                data: dataValues,
                fill: false,
                
            }
        ]
    };

    

    const options = {
        scales: {
          y: {
            beginAtZero: true,
            borderColor: "rgba(75,192,192,1)",
            
          },
        },
        
        plugins: {
            legend: {
              labels: {
                font: {
                  weight: 'bold',
                  color:'green'
                },
              },
            },
          },
      };
      

    

    return (
        <div style={{ height: '800px', width: '700px'  }}>
            <Bar className='mx-30'
                options={options}
                data={data}
            />
        </div>
    );
};

export default DefaultChart;
