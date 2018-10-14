import api from 'v2/app/api/api'
import actions from './actions'
import sentry from 'v2App/utils/sentry'
import toastr from 'toastr'

const execGetRepoDetail = (owner, repoName) => async (dispatch) => {
    try {
        const response = await api.getRepoDetail(owner, repoName)
        let data = response.data
        dispatch(actions.getRepoDetailAction(data))
        dispatch(actions.changeLoadingStatusAction(false))
    } catch (error) {
        sentry.captureException(error, { extra: '103' })
    }
}

const execChangeHook = (url, target) => async (dispatch) => {
    try {
        dispatch(actions.changeFetchingStatusAction(true))
        const response = await api.changeHook(url)
        let data = response.data
        let targetValue = data[target]
        dispatch(actions.updateRepoAllowHook(target, targetValue))
        dispatch(actions.changeFetchingStatusAction(false))
        toastr.success('Change allow hooks is success', 'Success', { timeOut: 2000 })
    } catch (error) {
        dispatch(actions.changeFetchingStatusAction(false))
        toastr.error('Change hook failed', 'Error', { timeOut: 2000 })
        sentry.captureException(error, { extra: '100' })
    }
}

const execAddGithubBot = (url) => async (dispatch) => {
    try {
        dispatch(actions.changeFetchingStatusAction(true))
        const response = await api.addGithubBot(url)
        if (response.status === 200) {
            toastr.success(response.data.message, 'Success', { timeOut: 2000 })
        } else {
            toastr.error('Can not add GithuBbot', 'Error', { timeOut: 2000 })
        }
    } catch (error) {
        dispatch(actions.changeFetchingStatusAction(false))
        toastr.error('Can not add GithuBbot', 'Error', { timeOut: 2000 })
        sentry.captureException(error, { extra: '100' })
    }
}

export default {
    execGetRepoDetail,
    execChangeHook,
    execAddGithubBot
}
