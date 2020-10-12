import React, { Component } from "react";
import { Col, Row } from 'reactstrap'
import _ from 'lodash'
import StatCard from './statcard.jsx'

export class StatCardRow extends Component {

  render() {
    const validCard1 = !_.isNil(this.props.iconName1) && !_.isEmpty(this.props.iconName1) && !_.isNil(this.props.statsText1) && !_.isEmpty(this.props.statsText1) 
    const validCard2 = !_.isNil(this.props.iconName2) && !_.isEmpty(this.props.iconName2) && !_.isNil(this.props.statsText2) && !_.isEmpty(this.props.statsText2) 
    const validCard3 =    !_.isNil(this.props.iconName3) && !_.isEmpty(this.props.iconName3) && !_.isNil(this.props.statsText3) && !_.isEmpty(this.props.statsText3)
    const validCard4 =    !_.isNil(this.props.iconName4) && !_.isEmpty(this.props.iconName4) && !_.isNil(this.props.statsText4) && !_.isEmpty(this.props.statsText4)

    const cardCount = validCard1 && validCard2  && validCard3 && validCard4
        ? 3
        : 4
  
    return (
        
        <Row>
            { validCard1 && 
                <Col lg={cardCount} sm={6}>
                    <StatCard
                        iconColor={this.props.iconColor1}
                        bigIcon={<i className={this.props.iconName1} />}
                        statsText={this.props.statsText1}
                        statsValue={this.props.statsValue1}
                        statsIcon={<i className={this.props.statsIcon1} />}
                        statsIconText={this.props.statsIconText1}
                    />
                </Col>
            }
            { validCard2 &&
                <Col lg={cardCount} sm={6}>
                    <StatCard
                        iconColor={this.props.iconColor2}
                        bigIcon={<i className={this.props.iconName2} />}
                        statsText={this.props.statsText2}
                        statsValue={this.props.statsValue2}
                        statsIcon={<i className={this.props.statsIcon2} />}
                        statsIconText={this.props.statsIconText2}
                    />
                </Col>
            }
            { validCard3 &&
                <Col lg={cardCount} sm={6}>
                    <StatCard
                        iconColor={this.props.iconColor3}
                        bigIcon={<i className={this.props.iconName3} />}
                        statsText={this.props.statsText3}
                        statsValue={this.props.statsValue3}
                        statsIcon={<i className={this.props.statsIcon3} />}
                        statsIconText={this.props.statsIconText3}
                    />
                </Col>
            }
            { validCard4 &&
                <Col lg={cardCount} sm={6}>
                    <StatCard
                        iconColor={this.props.iconColor4}
                        bigIcon={<i className={this.props.iconName4} />}
                        statsText={this.props.statsText4}
                        statsValue= {this.props.statsValue4}
                        statsIcon={<i className={this.props.statsIcon4} />}
                        statsIconText={this.props.statsIconText4}
                    />
                </Col>
            }
        </Row>
    );
  }
}
 

export default StatCardRow;