import React, { Component } from "react";
import { Card, CardBody } from 'reactstrap'
import { Bar } from 'react-chartjs-2'

//css
import 'css/chart.css'

export class BarChart extends Component {

    // createLegend(json) {
    //     var legend = [];
    //     if (!_.isNil(json)) {
    //         for (var i = 0; i < json["names"].length; i++) {
    //             var type = "fa fa-circle text-" + json["types"][i];
    //             legend.push(<i style={{"margin-left":"10px"}} className={type} key={i} />);
    //             legend.push(" ");
    //             legend.push(json["names"][i]);
    //         }
    //     }
		// return legend;
	  // }

      
  render() {
    const chartOptions={
        responsive: true,
        legend:{
            display: true,
            position: 'top'
        },
        type:'bar',
        scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: this.props.yAxesLabel
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: this.props.xAxesLabel
              }
            }],
        }     
    }

    return (
        
        <Card className="cardStyle">
            <div className="titleContainer">
                <h4 className="titleStyle">{this.props.title}</h4>
                <p className="subTitleStyle">{this.props.subTitle}</p>
            </div>
            { true && 
                <CardBody>
                   <CardBody>

                    <Bar 
                        data={this.props.datasets}  
                        options={chartOptions}
                    />
 
                    </CardBody>
                </CardBody>
            }
            {/* <div className="legend">{this.createLegend(this.props.legend)}</div> */}
        </Card>
 
    );
  }
}
 

export default BarChart; 