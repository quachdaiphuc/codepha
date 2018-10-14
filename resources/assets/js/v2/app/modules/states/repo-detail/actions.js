import types from './types'
import { createAction } from 'v2/app/utils/redux-helper'

const getRepoDetailAction = (data) => createAction(types.GET_REPO_DETAIL, data)
const changeLoadingStatusAction = (status) => createAction(types.CHANGE_LOADING_STATUS, status)
const updateRepoAllowHook = (target, targetValue) => createAction(types.UPDATE_ALLOW_HOOK, { target, targetValue })
const changeFetchingStatusAction = (status) => createAction(types.CHANGE_FETCHING_STATUS, status)

export default {
    changeLoadingStatusAction,
    getRepoDetailAction,
    updateRepoAllowHook,
    changeFetchingStatusAction
}
