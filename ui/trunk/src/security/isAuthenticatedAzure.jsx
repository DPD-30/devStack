import Reflux from 'reflux'

import AppStore from 'stores/app.js'

export default class isAuthenticatedAzure extends Reflux.Component{
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['isAuthenticatedAzure']
    }

    render(){
        return (this.state.isAuthenticatedAzure === this.props.check)
            ? this.props.children
            : null
    }
}
