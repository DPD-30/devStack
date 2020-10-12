import React, {Component} from 'react'
import {Row, Col, Card, CardBody, CardFooter} from 'reactstrap'

//css
import 'css/chart.css'

export class StatCard extends Component {
    render() {
        return (
          <Card>
            <CardBody>
              <Row>
                <Col xs={5}>
                  <div className="statIcon">
                    <span style={{color: this.props.iconColor}}>{this.props.bigIcon}</span>
                  </div>
                </Col>
                <Col xs={7}>
                  <div className="statCard">
                    <p className="statTitle">{this.props.statsText}</p>
                    <p className="statValue">{this.props.statsValue}</p>
                  </div>
                </Col>
              </Row>
              <CardFooter className="statFooterBGColor">
                <div className="statFooterColor">
                  {this.props.statsIcon} {this.props.statsIconText}
                </div>
              </CardFooter>
            </CardBody>
          </Card>
        );
      }
}

export default StatCard;