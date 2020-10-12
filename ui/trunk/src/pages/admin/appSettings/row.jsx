import React from 'react'
import Reflux from 'reflux'
import { Button } from 'reactstrap'

import AppActions from 'actions/app.js'


export default class row extends Reflux.Component {
	constructor(props) {
		super(props)

		this.state = {
            value: props.value,
            isChanged: false,
            isSaving: false,
            isDeleting: false,
        }
        
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.simpleEvent = this.simpleEvent.bind(this)
    }

    simpleEvent(event){
        this.setState({
            isChanged: true,
            [event.target.name]: event.target.value,
        })
    }

    update(){
        this.setState({ isSaving: true })

        AppActions.updateAppSetting({
            appSettingId: this.props.id,
            appSettingName: this.props.name,
            appSettingValue: this.state.value,
            onSuccess: () => this.setState({
                isChanged: false,
                isSaving: false,
            }),
		})
    }

    delete(){
        this.setState({ isDeleting: true })

        AppActions.deleteAppSetting({
            id: this.props.id,
            onSuccess: () => {
                this.setState({ isDeleting: true })
                AppActions.getAppSettings()
            }
		})
    }

	render() {
		return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <input
                        type="text"
                        name="value"
                        value={this.state.value}
                        onChange={this.simpleEvent}
                        disabled={
                            this.state.isSaving === true
                            || this.state.isDeleting === true
                        }
                    />
                </td>
                <td>
                    <Button
                        onClick={this.update}
                        disabled={
                            this.state.isSaving === true
                            || this.state.isChanged === false
                        }
                    >
                        Save
                    </Button>
                </td>
                <td>
                    <Button
                        color="warning"
                        onClick={this.delete}
                        disabled={this.state.isDeleting === true}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        )
	}
}
