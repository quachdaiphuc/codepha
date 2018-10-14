import i18n from 'i18next'

import en from 'v2/lang/en'
import vn from 'v2/lang/vn'

i18n.init({
    interpolation: {
        escapeValue: false
    },
    lng: 'en',
    resources: {
        en: {
            translation: en
        },
        vn: {
            translation: vn
        }
    }
})

export default i18n
