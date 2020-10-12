import React, { Component } from "react";
import { Card, CardBody } from 'reactstrap'
import { Pie } from 'react-chartjs-2'
import _ from 'lodash'

//css
import 'css/chart.css'

export class PieChart extends Component {
      
  render() {
 
    const validDataSet = !_.isNil(this.props.pieData) && !_.isEmpty(this.props.pieData) &&
            this.props.pieData[0] && this.props.pieData[0] > 0

    const pieDataSet = [{
        data: this.props.pieData,
        backgroundColor: this.props.pieColors
    }]
    return (
        
        <Card className="cardStyle">
            <div className="titleContainer">
                <h4 className="titleStyle">{this.props.title}</h4>
                <p className="subTitleStyle">{this.props.subTitle}</p>
            </div>
            { validDataSet && 
                <CardBody>
                    <Pie data={{
                        labels: this.props.label,
                        datasets: pieDataSet
                    }}/>
                </CardBody>
            }
        </Card>
 
    );
  }
}
 

export default PieChart;