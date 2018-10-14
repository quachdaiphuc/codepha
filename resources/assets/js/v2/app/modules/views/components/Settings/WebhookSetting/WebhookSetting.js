import React, { Component } from 'react'

const mapper = {
    pushevent: 'allow_push',
    pullrequestevent: 'allow_pr',
    tagevent: 'allow_tags',
    deployevent: 'allow_deploys'
}

class WebhookSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDisplay: false
        }
    }

    handleChangeHook = (status, eventName) => {
        let stt = !status ? 'add' : 'remove'
        let url = `api/repos/repositories/${this.props.repository.id}/${stt}-${eventName}`
        this.props.changeHook(url, mapper[eventName.replace(/-/g, '')])
    }

    render() {
        return (
            <div className='setting-box'>
                <h3>Webhook setting</h3>
                <div className='webhook'>
                    <div className='data'>
                        <div className='key'>
                            Push request event
                            <div className='question'>
                                <i className='fas fa-question-circle'></i>
                                <div className='desc'>
                                    Enable/Disable new build on push request to your repository
                                </div>
                            </div>
                        </div>
                        <div className='value'>
                            <label className='switch'>
                                <input type='checkbox' checked={!!this.props.repository.allow_push} onChange={() => this.handleChangeHook(!!this.props.repository.allow_push, 'push-event')} />
                                <span className='slider round'></span>
                            </label>
                        </div>
                    </div>
                    <div className='data'>
                        <div className='key'>
                            Pull request event
                            <div className='question'>
                                <i className='fas fa-question-circle'></i>
                                <div className='desc'>
                                    Enable/Disable new build on pull request to your repository
                                </div>
                            </div>
                        </div>
                        <div className='value'>
                            <label className='switch'>
                                <input type='checkbox' checked={!!this.props.repository.allow_pr} onChange={() => this.handleChangeHook(!!this.props.repository.allow_pr, 'pull-request-event')} />
                                <span className='slider round'></span>
                            </label>
                        </div>
                    </div>
                    <div className='data'>
                        <div className='key'>
                            Tag event
                            <div className='question'>
                                <i className='fas fa-question-circle'></i>
                                <div className='desc'>
                                    Enable/Disable new build on tag push to your repository
                                </div>
                            </div>
                        </div>
                        <div className='value'>
                            <label className='switch'>
                                <input type='checkbox' checked={!!this.props.repository.allow_tags} onChange={() => this.handleChangeHook(!!this.props.repository.allow_tags, 'tag-event')} />
                                <span className='slider round'></span>
                            </label>
                        </div>
                    </div>
                    <div className='data'>
                        <div className='key'>
                            Auto Deploy
                            <div className='question'>
                                <i className='fas fa-question-circle'></i>
                                <div className='desc'>
                                    Enable/Disable auto deploy to your server on success build
                                </div>
                            </div>
                        </div>
                        <div className='value'>
                            <label className='switch'>
                                <input type='checkbox' checked={!!this.props.repository.allow_deploys} onChange={() => this.handleChangeHook(!!this.props.repository.allow_deploys, 'deploy-event')} />
                                <span className='slider round'></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WebhookSetting
