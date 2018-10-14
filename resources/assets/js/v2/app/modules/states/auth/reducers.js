import { fromJS } from 'immutable'

import types from './types'
import UserRole from 'v2App/enums/UserRole'

const initialState = fromJS({
    user: {
        id: null,
        username: '',
        avatar: 'https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png',
        role: UserRole.User,
        isAuth: false,
        lastRepoUpdateAt: null
    }
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_AUTH_USER:
            return state.set('user', fromJS(action.payload))
        default:
            return state
    }
}

export default authReducer
