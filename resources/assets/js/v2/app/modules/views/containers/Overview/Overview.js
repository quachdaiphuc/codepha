import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.scss'
import { thunks, selectors, actions } from 'v2State/overview/'
import Chart from 'v2View/components/Chart/Chart'

class Overview extends Component {

    componentDidMount() {
        this.props.fetchData(
            this.props.match.params.owner,
            this.props.match.params.repo
        )
    }

    componentWillUnmount() {
        this.props.reloadApiStatus()
    }

    renderBuildStatistic = () => (
        this.props.fetchDataSuccess
            ? <ul className='data'>
                <li>{this.props.buildStatistic.successBuild}</li>
                <li>{this.props.buildStatistic.runningBuild}</li>
                <li>{this.props.buildStatistic.killedBuild}</li>
                <li>{this.props.buildStatistic.errorBuild}</li>
                <li>{this.props.buildStatistic.totalBuild}</li>
                <li>{this.props.buildStatistic.maxTime}</li>
                <li>{this.props.buildStatistic.minTime}</li>
                <li>{this.props.buildStatistic.averageTime}</li>
            </ul>
            : <p>No data</p>
    )

    renderChart = (data, desc) => (
        this.props.fetchDataSuccess
            ? data.length > 0
                ? <Chart data={data} desc={desc} />
                : <p>No data</p>
            : null
    )


    render() {
        return (
            <div className='Overview'>
                <div className='overview-header'>
                    <div className='overview-header'>
                        <ul className='list-header'>
                            <li>Success</li>
                            <li>Running</li>
                            <li>Killed</li>
                            <li>Error</li>
                            <li>Total</li>
                            <li>Max build time</li>
                            <li>Min build time</li>
                            <li>Avg build time</li>
                        </ul>
                        {this.renderBuildStatistic()}
                    </div>
                </div>
                <div className='overview-content'>
                    <div className='chart-box'>
                        <h3>Overview</h3>
                        <div className='chart'>
                            {this.renderChart(this.props.datas, this.props.styles)}
                        </div>
                    </div>
                </div>
                <div className='overview-content'>
                    <div className='chart-box'>
                        <h3>Statistic</h3>
                        <div className='chart'>
                            {this.renderChart(this.props.statisticCharts, this.props.statisticStyles)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fetchDataSuccess: selectors.fetchDataSuccess(state),
    buildStatistic: selectors.buildStatistic(state),
    datas: selectors.datas(state),
    styles: selectors.styles(state),
    statisticCharts: selectors.statisticCharts(state),
    statisticStyles: selectors.statisticStyles(state)
})

const mapDispatchToProps = (dispatch) => ({
    fetchData: (owner, repoName) => dispatch(thunks.execFetchingDataAction(owner, repoName)),
    reloadApiStatus: () => dispatch(actions.reloadStatusAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
