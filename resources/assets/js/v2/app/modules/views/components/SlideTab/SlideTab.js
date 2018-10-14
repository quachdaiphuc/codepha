import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './style.scss'

class SlideTab extends Component {

    componentDidMount() {
        const option = this.props.match.params.option
        if (typeof option == 'undefined') {
            this.props.history.push(`${this.props.match.url}/overview`)
        } else if (!this.props.optionParam.includes(option)) {
            this.props.changeTab(0)
        } else {
            this.props.changeTab(this.props.optionParam.indexOf(option))
        }
    }

    handleChangeTab = (e) => {
        const value = e.target.dataset.value
        this.props.changeTab(value)
    }

    render() {
        return (
            <div className='SlideTab'>
                <ul>
                    <li
                        data-value='0'
                        className={this.props.tabValue == 0 ? 'active-tab' : ''}
                        onClick={this.handleChangeTab}
                    >
                        Overview
                    </li>
                    <li
                        data-value='1'
                        className={this.props.tabValue == 1 ? 'active-tab' : ''}
                        onClick={this.handleChangeTab}
                    >
                        Builds
                    </li>
                    <li
                        data-value='2'
                        className={this.props.tabValue == 2 ? 'active-tab' : ''}
                        onClick={this.handleChangeTab}
                    >
                        Badges
                    </li>
                    <li
                        data-value='3'
                        className={this.props.tabValue == 3 ? 'active-tab' : ''}
                        onClick={this.handleChangeTab}
                    >
                        Setting
                    </li>
                    <li
                        data-value='4'
                        className={this.props.tabValue == 4 ? 'active-tab' : ''}
                        onClick={this.handleChangeTab}
                    >
                        Secret
                    </li>
                    <li
                        data-value='5'
                        className={this.props.tabValue == 5 ? 'active-tab' : ''}
                        onClick={this.handleChangeTab}
                    >
                        Notification
                    </li>
                    <div className='slider'></div>
                </ul>
            </div>
        )
    }
}

export default withRouter(SlideTab)
