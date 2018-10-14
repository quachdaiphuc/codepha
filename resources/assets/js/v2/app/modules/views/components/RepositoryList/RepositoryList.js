import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.scss'

const RepositoryList = ({ repoList }) => (
    <ul className='RepositoryList'>
        {
            repoList.map(({ repo }) => (
                <NavLink
                    key={repo.id}
                    className='repo'
                    to={`/repository/actived/${repo.full_name}/detail`}
                    activeClassName='active-repo'
                    title={repo.full_name}
                >
                    <p>{repo.full_name}</p>
                </NavLink>
            ))
        }
    </ul>
)

export default RepositoryList
