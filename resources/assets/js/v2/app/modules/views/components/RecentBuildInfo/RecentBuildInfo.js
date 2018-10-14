import React from 'react'

const buildStatusColor = {
    success: 'success',
    error: 'error',
    killed: 'killed',
    skipped: 'skipped',
    timeout: 'timeout',
    running: 'running',
    pending: 'pending'
}

const buildStatusIcon = {
    success: <i className='fas fa-check-circle'></i>,
    error: <i className='fas fa-exclamation-circle'></i>,
    killed: <i className='fas fa-times-circle'></i>,
    skipped: <i className='fas fa-forward'></i>,
    timeout: <i className='fas fa-stopwatch'></i>,
    running: <i className='fas fa-play'></i>,
    pending: <i className='fas fa-pause'></i>
}

const RecentBuildInfo = (props) => (
    <div className={`status old ${buildStatusColor[props.build.status]}`}>
        {buildStatusIcon[props.build.status]}
        <p className='build-no'>#{props.build.number}</p>
        <p className='build-time'>{props.getBuildTime(props.build.status, props.build)}</p>
    </div>
)

export default RecentBuildInfo
