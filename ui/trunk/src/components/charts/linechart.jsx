import React, { Component } from "react";
import { Card, CardBody } from 'reactstrap'
import { Line } from 'react-chartjs-2'

//css
import 'css/chart.css'

export class LineChart extends Component {
 
  render() {

    const chartOptions={
        responsive: true,
        scales: {
            yAxes:[
                {
                    scaleLabel: {
                        display: true,
                        labelString: this.props.yLabel
                    } 
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: this.props.xLabel
                    }
                }
            ]
        },
        legend:{
            display: true,
            position: 'top'
        },
        type:'bar',
        
    }

    return (
        
        <Card className="cardStyle">
            <div className="titleContainer">
                <h4 className="titleStyle">{this.props.title}</h4>
                <p className="subTitleStyle">{this.props.subTitle}</p>
            </div>
            <CardBody>

                <Line 
                    data={this.props.datagroups} 
                    options={chartOptions}
                />
        
            </CardBody> 
        </Card>

    );
  }
}
 

export default LineChart; 