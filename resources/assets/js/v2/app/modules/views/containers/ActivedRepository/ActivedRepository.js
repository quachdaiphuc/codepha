import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import toastr from 'toastr'
import { Route } from 'react-router-dom'

import './style.scss'
import api from 'v2App/api/api'
import SearchRepositoryForm from 'v2View/components/SearchRepositoryForm/SearchRepositoryForm'
import RepositoryList from 'v2View/components/RepositoryList/RepositoryList'
import RepositoryLoader from 'v2View/components/RepositoryLoader/RepositoryLoader'
import { thunks, selectors, actions } from 'v2State/actived-repo/'
import sentry from 'v2App/utils/sentry'
import EmptyPage from 'v2View/components/EmptyPage/EmptyPage'
import RepositoryDetail from 'v2View/containers/RepositoryDetail/RepositoryDetail'

const initState = {
    value: '',
    error: '',
    emptySearch: ''
}

class ActivedRepository extends Component {

    state = {
        value: '',
        error: '',
        emptySearch: ''
    }

    componentDidMount() {
        this.props.getActivedRepo(1)
    }

    handleChangePage = (pageNo) => {
        this.props.changeStatus(true)
        let value = this.state.value
        if (value == '') {
            this.props.getActivedRepo(pageNo)
        } else {
            this.search(value, pageNo)
        }

    }

    handleInputChange = (e) => {
        let value = e.target.value
        this.setState({ value })
    }

    handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            this.handleSearch
        }
    }

    handleSearch = (e) => {
        e.preventDefault()
        let value = this.state.value
        if (value.length < 1) {
            this.setState({ error: 'Please enter something to search!' })
        } else {
            this.props.changeStatus(true)
            this.setState({ error: '' }, () => {
                this.search(value, 1)
            })
        }
    }

    search = async (keyword, pageNO) => {
        let paginate = {
            currentPage: 1,
            totalData: 0,
            dataPerPage: 15
        }
        try {
            const response = await api.searchActivedRepo(keyword, pageNO)
            let result = response.data.data
            const repo = result.repo
            if (repo.length) {
                paginate = {
                    currentPage: result.paginate.currentPage,
                    totalData: result.paginate.total,
                    dataPerPage: result.paginate.per_page
                }
                this.setState({
                    error: '',
                    emptySearch: ''
                }, () => {
                    this.props.setActivedRepo(repo)
                    this.props.setPaginate(paginate)
                    this.props.changeStatus(false)
                })
            } else {
                this.setState({
                    emptySearch: `We couldn’t find a match for
                    “${keyword}”. Please try another
                    search.` }, () => {
                    this.props.setActivedRepo([])
                    this.props.setPaginate(paginate)
                    this.props.changeStatus(false)
                })
            }
        } catch (error) {
            sentry.captureException(error, { extra: '102' })
            toastr.error('Sorry, something went wrong!', 'Error', { timeOut: 2000 })
            this.props.setActivedRepo([])
            this.props.setPaginate(paginate)
            this.props.changeStatus(false)
        }
    }

    handleClearSearch = () => {
        this.setState(initState, () => {
            this.props.getActivedRepo(1)
        })
    }

    render() {
        return (
            <div className='ActivedRepository'>
                <h1>Actived Repository</h1>
                <div className='page-content'>
                    <div className='repo-list'>
                        <SearchRepositoryForm
                            value={this.state.value}
                            error={this.state.error}
                            handleInputChange={this.handleInputChange}
                            handleSearch={this.handleSearch}
                            handleKeyPress={this.handleKeyPress}
                            handleClearSearch={this.handleClearSearch}
                        />
                        <div className='search-empty'>
                            {this.state.emptySearch}
                        </div>
                        {
                            this.props.isLoading
                                ? <RepositoryLoader display={5} />
                                : <Fragment>
                                    <RepositoryList repoList={this.props.data} />
                                    <Pagination
                                        hideDisabled
                                        activePage={this.props.paginate.currentPage}
                                        itemsCountPerPage={this.props.paginate.dataPerPage}
                                        totalItemsCount={this.props.paginate.totalData}
                                        onChange={this.handleChangePage}
                                    />
                                </Fragment>
                        }
                    </div>
                    <div className='main-page-content'>
                        <Route exact path='/repository/actived' component={EmptyPage} />
                        <Route path='/repository/actived/:owner/:repo/detail/:option?' component={RepositoryDetail} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: selectors.activedRepo(state),
    isLoading: selectors.status(state),
    paginate: selectors.paginate(state)
})

const mapDispatchToProps = (dispatch) => ({
    getActivedRepo: (pageNo) => dispatch(thunks.execGetActivedRepo(pageNo)),
    changeStatus: (status) => dispatch(actions.changeLoadingStatusAction(status)),
    setActivedRepo: (data) => dispatch(actions.getActivedRepoAction(data)),
    setPaginate: (paginate) => dispatch(actions.constructPaginationAction(paginate))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivedRepository))
