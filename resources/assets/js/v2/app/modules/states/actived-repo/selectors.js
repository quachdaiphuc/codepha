const activedRepo = state => state.get('activedRepo').get('data').toJS()
const status = state => state.get('activedRepo').get('isLoading')
const paginate = state => state.get('activedRepo').get('pagination').toJS()

export default {
    activedRepo,
    status,
    paginate
}
