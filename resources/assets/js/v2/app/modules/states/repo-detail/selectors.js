const repository = state => state.get('repoDetail').get('repository').toJS()
const status = state => state.get('repoDetail').get('isLoading')
const isFetching = state => state.get('repoDetail').get('isFetching')

export default {
    repository,
    status,
    isFetching
}
