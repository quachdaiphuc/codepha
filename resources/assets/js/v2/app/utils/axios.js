import axios from 'axios'
import config from 'v2/config/'

const instance = axios.create({
    baseURL: config.BASE_API_URL
})
instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance
