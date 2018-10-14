import { combineReducers } from 'redux-immutable'

import { reducers as authReducer } from './states/auth/'
import { reducers as i18nReducer } from './states/i18n/'
import { reducers as activedRepoReducer } from './states/actived-repo/'
import { reducers as repoDetailReducer } from './states/repo-detail/'
import { reducers as overviewReducer } from './states/overview/'

const rootReducer = combineReducers({
    i18n: i18nReducer,
    auth: authReducer,
    activedRepo: activedRepoReducer,
    repoDetail: repoDetailReducer,
    overview: overviewReducer
})

export default rootReducer
