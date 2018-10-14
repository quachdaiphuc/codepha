import axios from 'v2/app/utils/axios'

const getAuthUser = () => axios.get('/api/users/me')
const getActivedRepo = (pageNo) => axios.get(`/api/repos/active?page=${pageNo}`)
const searchActivedRepo = (keyword, pageNo) => axios.get(`/api/repos/active/search?name=${keyword}&page=${pageNo}`)
const getRepoDetail = (owner, repoName) => axios.get(`/api/repos/repositories/${owner}/${repoName}/repository`)
const changeHook = (url) => axios.patch(`/${url}`)
const addGithubBot = (url) => axios.post(`/${url}`)
const getRepoOverview = (owner, repoName) => axios.get(`/api/repos/repositories/${owner}/${repoName}/overview`)

export default {
    getAuthUser,
    getActivedRepo,
    searchActivedRepo,
    getRepoDetail,
    changeHook,
    addGithubBot,
    getRepoOverview
}
