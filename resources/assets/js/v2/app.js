import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import Header from 'v2View/components/Header/Header'
import Sidebar from 'v2View/components/Sidebar/Sidebar'
import ProductList from 'v2View/components/ProductList/ProductList'
import { thunks } from 'v2State/auth/'
import { actions } from 'v2State/i18n/'
import { selectors as authSelector } from 'v2State/auth/'
import routes from './routes/routes'

class App extends Component {

    componentDidMount() {
        this.props.getAuthUser()
    }

    handleChangeLanguage = (lang) => {
        if (lang !== localStorage.getItem('lang')) {
            this.props.changeLanguage(lang)
        }
    }

    loadRoute = (routes) => (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))
            }
        </Switch>
    )

    render() {
        return (
            <div>
                <Sidebar/>
                <Header user={this.props.user}
                    handleChangeLanguage={this.handleChangeLanguage} />
                <ProductList/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: authSelector.authUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    getAuthUser: () => dispatch(thunks.execGetAuthUser()),
    changeLanguage: (lang) => dispatch(actions.changeLanguageAction(lang))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
