import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import './style.scss'
import RepositoryInfo from 'v2View/components/RepositoryInfo/RepositoryInfo'
import RepositoryRecentBuild from 'v2View/components/RepositoryRecentBuild/RepositoryRecentBuild'
import { thunks, selectors, actions } from 'v2State/repo-detail/'
import SlideTab from 'v2View/components/SlideTab/SlideTab'
import Settings from 'v2View/components/Settings/Settings'
import Overview from 'v2View/containers/Overview/Overview'

class RepositoryDetail extends Component {

    state = {
        repoTabValue: 0,
        optionParam: ['overview', 'builds', 'badges', 'setting', 'secret', 'notification']
    }

    componentDidMount() {
        this.props.getRepoDetail(
            this.props.match.params.owner,
            this.props.match.params.repo
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.owner !== prevProps.match.params.owner
            || this.props.match.params.repo !== prevProps.match.params.repo
        ) {
            this.props.getRepoDetail(
                this.props.match.params.owner,
                this.props.match.params.repo
            )
            this.resetTab()
        }
    }

    componentWillUnmount() {
        this.props.changeLoadingStatus(true)
    }

    changeTab = (value) => {
        if (value > -1 && value < 6) {
            this.setState({ repoTabValue: value }, () => {
                let urlSegment = this.props.match.url.split('/')
                urlSegment.splice(-1, 1)
                let newUrl = `${urlSegment.join('/')}/${this.state.optionParam[value]}`
                this.props.history.push(newUrl)
            })
        }
    }

    resetTab = () => {
        this.setState({ repoTabValue: 0 }, () => {
            const newUrl = `${this.props.match.url}/overview`
            this.props.history.push(newUrl)
        })
    }

    render() {
        return (
            <div className='RepositoryDetail'>
                <div className='content-header'>
                    {
                        this.props.isLoading
                            ? null
                            : <Fragment>
                                <RepositoryInfo repoInfo={this.props.repository} />
                                <RepositoryRecentBuild repoBuild={this.props.repository.recent_builds} />
                            </Fragment>
                    }
                </div>
                <div className='content-body'>
                    <SlideTab tabValue={this.state.repoTabValue} changeTab={this.changeTab} optionParam={this.state.optionParam} />
                    <Switch>
                        <Route path='/repository/actived/:owner/:repo/detail/overview' exact component={Overview} />
                        <Route path='/repository/actived/:owner/:repo/detail/setting' exact component={Settings} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    repository: selectors.repository(state),
    isLoading: selectors.status(state)
})

const mapDispatchToProps = (dispatch) => ({
    getRepoDetail: (owner, reponame) => dispatch(thunks.execGetRepoDetail(owner, reponame)),
    changeLoadingStatus: (status) => dispatch(actions.changeLoadingStatusAction(status))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepositoryDetail))
