import React, { Fragment, Component } from 'react'
import moment from 'moment'

import './style.scss'
import LastBuildInfo from 'v2View/components/LastBuildInfo/LastBuildInfo'
import RecentBuildInfo from 'v2View/components/RecentBuildInfo/RecentBuildInfo'

class RepositoryRecentBuild extends Component {

    getBuildTime = (status, build) => {
        if (status === 'running') {
            return 'Running...'
        }
        if (status === 'pending') {
            return 'Pending...'
        }
        if (status === 'created') {
            return 'Created'
        }
        if (status === 'waiting') {
            return 'waiting...'
        }
        let duaration = moment.duration(moment(build.finished).diff(moment(build.started)))

        return moment.utc(duaration * 1000).format('HH:mm:ss')
    }

    render() {
        let { repoBuild } = this.props
        let renderLastBuild = null
        let previousBuild = null
        if (repoBuild.length > 0) {
            const lastBuild = repoBuild[0]
            renderLastBuild = <LastBuildInfo lastBuild={lastBuild} getBuildTime={this.getBuildTime} />
        }

        if (repoBuild.length > 1) {
            previousBuild = (
                <Fragment>
                    {
                        repoBuild.map((build, index) => {
                            if (index > 0) {
                                return (
                                    <RecentBuildInfo
                                        key={build.id}
                                        build={build}
                                        getBuildTime={this.getBuildTime} />
                                )
                            }
                        })
                    }
                </Fragment>
            )
        }

        return (
            repoBuild.length
                ? < div className='RepositoryRecentBuild' >
                    <div className='last-build'>
                        {renderLastBuild}
                    </div>
                    {previousBuild}
                </div >
                : null
        )
    }
}

export default RepositoryRecentBuild
