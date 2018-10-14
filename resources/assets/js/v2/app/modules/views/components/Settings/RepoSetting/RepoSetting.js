import React, { Component } from 'react'
import toastr from 'toastr'
import axios from 'v2/app/utils/axios'
import Fetching from 'v2View/components/Fetching/Fetching'

class RepoSetting extends Component {

    state = {
        isSyncMember: false
    }

    handleAddGithubBot = () => {
        let repoId = this.props.repository.id
        let url = `api/repos/repositories/${repoId}/add-repo-member`
        this.props.addGithubBot(url)
    }

    handleSyncMember = () => {
        this.setState({ isSyncMember: true }, () => {
            let repoId = this.props.repository.id
            axios.post(`api/repos/repositories/${repoId}/sync-member`)
                .then(() => {
                    this.setState({ isSyncMember: false }, () => {
                        toastr.success('Sync member success')
                    })
                }).catch(() => {
                    this.setState({ isSyncMember: false }, () => {
                        toastr.error('Sync member fail. Please try again later')
                    })
                })
        })
    }

    render() {
        return (
            <div className='setting-box'>
                { (this.state.isSyncMember) ? <Fetching /> : null }
                <h3>Respository setting</h3>
                <div className='repo'>
                    <div className='repo-box'>
                        <button onClick={this.handleAddGithubBot}><i className='fas fa-robot'></i> ADD FRAMGIACI BOT TO YOUR REPOSITORY</button>
                    </div>
                    <div className='repo-box'>
                        <button className='disable'><i className='fas fa-robot'></i> ADD FRAMGIACI BOT TO
                            YOUR REPOSITORY
                        </button>
                        <span>FramgiaCI bot already exists in your repository.</span>
                    </div>
                    <div className='repo-box'>
                        <button onClick={this.handleSyncMember} >
                            <i className='fas fa-users'></i>
                            RE-SYNC REPOSITORY`S MEMBER
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RepoSetting
