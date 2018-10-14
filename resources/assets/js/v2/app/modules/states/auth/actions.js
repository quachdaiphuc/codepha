import types from './types'
import { createAction } from 'v2/app/utils/redux-helper'

const getAuthUserAction = user => createAction(types.GET_AUTH_USER, user)

export default {
    getAuthUserAction
}
