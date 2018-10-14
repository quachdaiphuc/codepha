import Raven from 'raven-js'

import config from 'v2/config/'

Raven.config(config.SENTRY_DSN, {
    environment: config.APP_ENV
}).install()

export default Raven
