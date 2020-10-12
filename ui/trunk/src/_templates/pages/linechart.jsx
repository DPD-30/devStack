import React, { Component } from "react";
import { Card, CardBody } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'

export class LineChart extends Component {

    createLegend(json) {
        var legend = [];
        if (!_.isNil(json)) {
            for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i style={{"margin-left":"10px"}} className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
            }
        }
 
		return legend;
	  }

      
  render() {
    const chartOptions={
        responsive: true,
        legend:{
            display: true,
            position: 'top'
        },
        type:'line'
    }

    const validDataSet = !_.isNil(this.props.datasets) && !_.isEmpty(this.props.datasets) &&
            this.props.datasets[0].data[0] && this.props.datasets[0].data[0] > 0

    const lineData = {
        labels: this.props.labels,
        datasets: this.props.datasets
    }
    return (
        
        <Card style={{height:"550px"}}>
            <div style={{padding:"15px 15px 0"}}>
                <h4 style={{margin:0, color:"#333333", fontWeight:300}}>{this.props.title}</h4>
                <p style={{fontSize:"14px", fontWeight:400, color:"#9A9A9A", marginBottom:"0px"}}>{this.props.subTitle}</p>
            </div>
            { validDataSet &&
                <CardBody>

                    <Line 
                        data={lineData} 
                        options={chartOptions}
                    />
        
                <div className="legend">{this.createLegend(this.props.legend)}</div>
            
                </CardBody>
            }
        </Card>
 
    );
  }
}
 

export default LineChart; 