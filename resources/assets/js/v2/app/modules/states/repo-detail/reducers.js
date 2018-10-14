import { fromJS } from 'immutable'

import types from './types'

const initialState = fromJS({
    isLoading: true,
    isFetching: false,
    repository: {}
})

const repoDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_REPO_DETAIL:
            return state.set('repository', fromJS(action.payload))
        case types.CHANGE_LOADING_STATUS:
            return state.set('isLoading', fromJS(action.payload))
        case types.UPDATE_ALLOW_HOOK:
            return state.setIn(['repository', action.payload.target], fromJS(action.payload.targetValue))
        case types.CHANGE_FETCHING_STATUS:
            return state.set('isFetching', fromJS(action.payload))
        default:
            return state
    }
}

export default repoDetailReducer
