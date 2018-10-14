import api from 'v2App/api/api'
import actions from './actions'
import { extractResponseData } from 'v2/app/utils/response-helper'
import sentry from 'v2App/utils/sentry'

const execGetActivedRepo = (pageNo) => async (dispatch) => {
    try {
        const response = await api.getActivedRepo(pageNo)
        let data = extractResponseData(response)
        const activedRepo = data.repo
        let paginate = {
            currentPage: data.paginate.currentPage,
            totalData: data.paginate.total,
            dataPerPage: data.paginate.per_page
        }
        dispatch(actions.getActivedRepoAction(activedRepo))
        dispatch(actions.constructPaginationAction(paginate))
        dispatch(actions.changeLoadingStatusAction(false))
    } catch (error) {
        let paginate = {
            currentPage: 1,
            totalData: 0,
            dataPerPage: 15
        }
        dispatch(actions.getActivedRepoAction([]))
        dispatch(actions.constructPaginationAction(paginate))
        dispatch(actions.changeLoadingStatusAction(false))
        sentry.captureException(error, { extra: '101' })
    }
}

export default {
    execGetActivedRepo
}
