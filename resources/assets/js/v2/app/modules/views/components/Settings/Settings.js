import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import './style.scss'
import WebhookSetting from './WebhookSetting/WebhookSetting'
import RepoSetting from './RepoSetting/RepoSetting'
import { selectors, thunks } from 'v2State/repo-detail/'
import Loader from 'v2View/components/PageLoader/PageLoader'
import Fetching from 'v2View/components/Fetching/Fetching'

class Settings extends Component {
    render() {
        let showUp = null
        if (this.props.repository.project_type) {
            showUp = (
                <Fragment>
                    { (this.props.isFetching) ? <Fetching /> : null }
                    <WebhookSetting repository={this.props.repository} changeHook={this.props.changeHook} />
                    <RepoSetting repository={this.props.repository} addGithubBot = {this.props.addGithubBot} />
                </Fragment>
            )
        } 
        else {
            showUp = (<Loader />)
        }
        return (
            
            <div className='Setting'>
                {showUp}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    repository: selectors.repository(state),
    isFetching: selectors.isFetching(state)
})

const mapDispatchToProps = (dispatch) => ({
    changeHook: (url, target) => dispatch(thunks.execChangeHook(url, target)),
    addGithubBot: (url) => dispatch(thunks.execAddGithubBot(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
