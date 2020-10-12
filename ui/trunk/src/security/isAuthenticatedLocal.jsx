import Reflux from 'reflux'

import AppStore from 'stores/app.js'

export default class isAuthenticatedLocal extends Reflux.Component{
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['isAuthenticatedLocal']
    }

    render(){
        return (this.state.isAuthenticatedLocal === this.props.check)
            ? this.props.children
            : null
    }
}
