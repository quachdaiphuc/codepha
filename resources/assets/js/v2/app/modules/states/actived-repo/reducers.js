import { fromJS } from 'immutable'

import types from './types'

const initialState = fromJS({
    isLoading: true,
    data: [],
    pagination: {
        currentPage: 1,
        totalData: 0,
        dataPerPage: 15
    }
})

const activedRepoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LOADING_STATUS:
            return state.set('isLoading', fromJS(action.payload))
        case types.GET_ACTIVED_REPOSITORY:
            return state.set('data', fromJS(action.payload))
        case types.CONSTRUCT_PAGINATION:
            return state.set('pagination', fromJS(action.payload))
        default:
            return state
    }
}

export default activedRepoReducer
