import { fromJS } from 'immutable'

import types from './types'

const lang = localStorage.getItem('lang')
const defaultLang = lang === 'vn' ? lang : 'en'
const initialState = fromJS({
    lang: defaultLang
})

const i18nReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LANGUAGE:
            localStorage.setItem('lang', action.payload)
            return state.set('lang', fromJS(action.payload))
        default:
            return state
    }
}

export default i18nReducer
