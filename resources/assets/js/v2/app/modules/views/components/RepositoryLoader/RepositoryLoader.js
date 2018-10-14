import React, { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

import './style.scss'

const RepositoryLoader = ({ display }) => {

    let loader = []
    for (let i = 0; i < display; i++) {
        loader.push(
            <div className='RepositoryLoader' key={i}>
                <div className='resize'>
                    <ContentLoader
                        height={15}
                        width={205}
                        speed={2}
                        primaryColor='#cccccc'
                        secondaryColor='#a6a6a6'
                    >
                    </ContentLoader>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            {loader}
        </Fragment>
    )

}

export default RepositoryLoader
