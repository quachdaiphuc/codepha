import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import toastr from 'toastr'

import UserRole from '../../enums/UserRole'
import { selectors as authSelector } from 'v2State/auth/'
import PageLoader from 'v2View/components/PageLoader/PageLoader'

const Authorization = (WrappedComponent) => (roles) => {
    class WithAuthorization extends React.Component {
        render() {
            let authorizeRoles
            if (typeof(roles) != 'undefined') {
                authorizeRoles = roles.map(role => UserRole[role])
            } else {
                authorizeRoles = [UserRole.User, UserRole.Mod, UserRole.Admin]
            }


            if (!this.props.user.isAuth) {
                return <PageLoader />
            } else {
                if (authorizeRoles.includes(this.props.user.role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    toastr.warning(
                        'You don\'t have permission to access this',
                        'Warning',
                        { timeOut: 2000 }
                    )
                    return <Redirect to='/' />
                }
            }
        }
    }

    const mapStateToProps = (state) => ({
        user: authSelector.authUser(state)
    })

    return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
