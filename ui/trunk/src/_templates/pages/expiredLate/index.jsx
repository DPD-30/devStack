import React from 'react'
import Reflux from 'reflux'
import { Table } from 'reactstrap'
// import _ from 'lodash'

import AppActions from 'actions/app.js'
import AppStore from 'stores/app.js'

import Icon from 'components/icon.jsx'


export default class ExpiredLate extends Reflux.Component{
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['ApplicationsExpiredAndLate']
    }

    componentDidMount(){
        AppActions.getApplicationsExpiredAndLate()
    }

    static header(text, subtext, icon){
        return (
            <h2>
                <Icon name={icon} />
                {' '}
                {text}
                {
                    subtext !== '' &&

                    <small>
                        {' '}
                        {subtext}
                    </small>
                }
            </h2>
        )
    }

    static mapResults(list){
        return list.map(
            sys => {
                return (
                    <tr key={sys.applicationId}>
                        <td>{sys.applicationName}</td>
                        <td style={{ textAlign: 'center' }}>{sys.statusId}</td>
                        <td>{sys.systemOwner}</td>
                        <td style={{ textAlign: 'center' }}>{sys.iMatrixNumber}</td>
                        <td style={{ textAlign: 'center' }}>{sys.phaseId}</td>
                        <td>{sys.poc}</td>
                        <td style={{ textAlign: 'center' }}>{sys.expiration.substr(0, 10)}</td>
                        <td style={{ textAlign: 'center' }}><Icon name={sys.icon} /></td>
                    </tr>
                )
            }
        )
    }

    static dataTable(mappedRecords){
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Application Name</th>
                        <th style={{ textAlign: 'center' }}>Status</th>
                        <th>Owner</th>
                        <th style={{ textAlign: 'center' }}>IMatrix #</th>
                        <th style={{ textAlign: 'center' }}>Phase</th>
                        <th>POC</th>
                        <th style={{ textAlign: 'center' }}>Expiration</th>
                        <th style={{ textAlign: 'center' }}>Icon</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mappedRecords.length === 0
                            ? <tr><td colSpan={8}>'Loading...'</td></tr>
                            : mappedRecords
                    }
                </tbody>
            </Table>
        )
    }

    render(){
        const mappedExpired = ExpiredLate.mapResults(this.state.ApplicationsExpiredAndLate.expiredApplications)
        const mappedSoon = ExpiredLate.mapResults(this.state.ApplicationsExpiredAndLate.expiringApplications)

        return (
            <div>
                {ExpiredLate.header("Expired", "", "hourglass-half")}
                {ExpiredLate.dataTable(mappedExpired)}

                <br />

                {ExpiredLate.header("Upcoming Expirations", "(within 60 days)", "exclamation")}
                {ExpiredLate.dataTable(mappedSoon)}
            </div>
        )
    }
}
