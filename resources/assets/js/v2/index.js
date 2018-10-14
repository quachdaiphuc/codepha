import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './app'
import rootReducer from './app/modules/rootReducer'
import i18n from 'v2App/utils/i18n'

const composeEnhancers =
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.trans = (message) => {
    let state = store.getState()
    return i18n.t(message, { lng: state.toJS().i18n.lang })
}
store.subscribe(window.trans)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('app'))
