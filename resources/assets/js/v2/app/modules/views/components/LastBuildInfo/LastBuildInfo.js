import React, { Fragment } from 'react'

const buildStatusStyle = {
    success: 'status-success',
    error: 'status-error',
    killed: 'status-killed',
    skipped: 'status-skipped',
    timeout: 'status-timeout',
    running: 'status-running',
    pending: 'status-pending'
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

const LastBuildInfo = (props) => (
    <Fragment>
        <div className={`status ${buildStatusStyle[props.lastBuild.status]}`}>
            {buildStatusIcon[props.lastBuild.status]}
            <p className='build-no'>#{props.lastBuild.number}</p>
            <p className='build-time'>
                {props.getBuildTime(props.lastBuild.status, props.lastBuild)}
            </p>
        </div>
        <div className='commit-info'>
            <p className='highlight'>
                <a href={props.lastBuild.build_link} target='_blank'>
                    #{props.lastBuild.commit.substr(0, 7)}
                </a>
                <span>41 minutes ago</span>
            </p>
        </div>
        <div className='commit-info'>
            <p className='highlight no-under' alt={props.lastBuild.author}>
                {props.lastBuild.author}
            </p>
        </div>
    </Fragment>
)

export default LastBuildInfo
