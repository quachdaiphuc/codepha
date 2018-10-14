import api from 'v2/app/api/api'
import actions from './actions'
import sentry from 'v2App/utils/sentry'

const execFetchingDataAction = (owner, repoName) => async (dispatch) => {
    try {
        const response = await api.getRepoOverview(owner, repoName)
        let data = response.data.overview
        dispatch(actions.storeDataAction(data))
        dispatch(actions.fetchOverviewSuccessAction(true))
    } catch (error) {
        dispatch(actions.fetchOverviewErrorAction(true))
        sentry.captureException(error, { extra: '104' })
    }
}

export default {
    execFetchingDataAction
}
