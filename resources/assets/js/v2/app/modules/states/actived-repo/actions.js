import types from './types'
import { createAction } from 'v2/app/utils/redux-helper'

const changeLoadingStatusAction = (status) => createAction(types.CHANGE_LOADING_STATUS, status)
const getActivedRepoAction = (data) => createAction(types.GET_ACTIVED_REPOSITORY, data)
const constructPaginationAction = (paginate) => createAction(types.CONSTRUCT_PAGINATION, paginate)

export default {
    changeLoadingStatusAction,
    getActivedRepoAction,
    constructPaginationAction
}
