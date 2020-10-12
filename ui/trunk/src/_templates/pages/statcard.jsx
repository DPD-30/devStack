import React, {Component} from 'react'
import {Row, Col, Card, CardBody, CardFooter} from 'reactstrap'

export class StatCard extends Component {
    render() {
        return (
          <Card>
            <CardBody>
              <Row>
                <Col xs={5}>
                  <div style={{color: this.props.iconColor, marginLeft: "40px", fontSize: "5em", minHeight: "64px", fontWeight: "bold",lineHeight: "59px"}}>
                    {this.props.bigIcon}
                  </div>
                </Col>
                <Col xs={7}>
                  <div style={{textAlign: "right", marginRight: "10px"}}>
                    <p style={{fontSize: "1.5em"}}>{this.props.statsText}</p>
                    <p style={{fontSize: "2.5em"}}>{this.props.statsValue}</p>
                  </div>
                </Col>
              </Row>
              <CardFooter style={{backgroundColor:"rgba(0,0,0,0)"}}>
                <div style={{color:"#a9a9a9"}}>
                  {this.props.statsIcon} {this.props.statsIconText}
                </div>
              </CardFooter>
            </CardBody>
          </Card>
        );
      }
}

export default StatCard;