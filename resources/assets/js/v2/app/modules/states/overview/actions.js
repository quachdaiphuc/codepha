import types from './types'
import { createAction } from 'v2/app/utils/redux-helper'

const fetchingOverviewAction = status => createAction(types.FETCHING_OVERVIEW, status)
const fetchOverviewSuccessAction = status => createAction(types.FETCH_OVERVIEW_SUCCESS, status)
const fetchOverviewErrorAction = status => createAction(types.FETCH_OVERVIEW_ERROR, status)
const storeDataAction = data => createAction(types.STORE_OVERVIEW_DATA, data)
const reloadStatusAction = () => createAction(types.RELOAD_STATUS, {
    fetchingData: false,
    fetchDataSuccess: false,
    fetchDataError: false
})

export default {
    fetchingOverviewAction,
    fetchOverviewSuccessAction,
    fetchOverviewErrorAction,
    storeDataAction,
    reloadStatusAction
}
