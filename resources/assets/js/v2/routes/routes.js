import Loadable from 'react-loadable'

import Authorization from 'v2App/HOCs/Authorization/'
import PageLoader from 'v2View/components/PageLoader/PageLoader'

const LazyActiveRepositories = Loadable({
    loader: () => import(/* webpackChunkName: "js/v2/active-repository" */'v2View/containers/ActivedRepository/ActivedRepository'),
    loading: PageLoader
})

const routes = [
    {
        path: '/repository/actived',
        component: Authorization(LazyActiveRepositories)()
    }
]

export default routes
