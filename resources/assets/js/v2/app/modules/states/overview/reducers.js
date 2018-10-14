import { fromJS } from 'immutable'

import types from './types'

const initialState = fromJS({
    overview: {
        buildStatistic: {},
        build: {},
        datas: [],
        statistic: [],
        statisticStyles: [],
        styles: []
    },
    status: {
        fetchingData: false,
        fetchDataSuccess: false,
        fetchDataError: false
    }
})

const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCHING_OVERVIEW:
            return state.setIn(['status', 'fetchingData'], fromJS(action.payload))
        case types.FETCH_OVERVIEW_SUCCESS:
            return state.setIn(['status', 'fetchDataSuccess'], fromJS(action.payload))
        case types.FETCH_OVERVIEW_ERROR:
            return state.setIn(['status', 'fetchDataError'], fromJS(action.payload))
        case types.STORE_OVERVIEW_DATA:
            return state.set('overview', fromJS(action.payload))
        case types.RELOAD_STATUS:
            return state.set('status', fromJS(action.payload))
        default:
            return state
    }
}

export default overviewReducer
