import React, { Component } from "react";
import { Card, CardBody } from 'reactstrap'
import { Bar } from 'react-chartjs-2'
import _ from 'lodash'

export class BarChart extends Component {

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
        type:'bar'
    }

    const validDataSet = !_.isNil(this.props.pieData) && !_.isEmpty(this.props.pieData) &&
            this.props.pieData[0] && this.props.pieData[0] > 0

    const pieDataSet = [{
        data: this.props.chartData,
        backgroundColor: this.props.pieColors
    }]
    return (
        
        <Card style={{height:"550px"}}>
            <div style={{padding:"15px 15px 0"}}>
                <h4 style={{margin:0, color:"#333333", fontWeight:300}}>{this.props.title}</h4>
                <p style={{"font-size":"14px", fontWeight:400, color:"#9A9A9A", "margin-bottom":"0px"}}>{this.props.subTitle}</p>
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
            <div className="legend">{this.createLegend(this.props.legend)}</div>
        </Card>
 
    );
  }
}
 

export default BarChart; 