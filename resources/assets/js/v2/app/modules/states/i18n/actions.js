import types from './types'
import { createAction } from 'v2/app/utils/redux-helper'

const changeLanguageAction = lang => createAction(types.CHANGE_LANGUAGE, lang)

export default {
    changeLanguageAction
}
