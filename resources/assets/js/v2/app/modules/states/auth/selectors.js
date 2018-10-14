const authUser = state => state.get('auth').get('user').toJS()

export default {
    authUser
}
