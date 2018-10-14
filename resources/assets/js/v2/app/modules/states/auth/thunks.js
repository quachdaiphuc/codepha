import api from 'v2/app/api/api'
import actions from './actions'
import { extractResponseData } from 'v2/app/utils/response-helper'
import sentry from 'v2App/utils/sentry'

const execGetAuthUser = () => async (dispatch) => {
    try {
        const response = await api.getAuthUser()
        let data = extractResponseData(response)
        let authUser = {
            id: data.id,
            username: data.username,
            avatar: data.avatar,
            role: data.role,
            isAuth: true,
            lastRepoUpdateAt: data.last_repo_update_at
        }
        dispatch(actions.getAuthUserAction(authUser))
    } catch (error) {
        sentry.captureException(error, { extra: '100' })
    }
}

export default {
    execGetAuthUser
}
