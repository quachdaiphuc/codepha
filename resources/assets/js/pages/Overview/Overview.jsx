import React from 'react'
import {Header} from '../includes/Header'
import {Content} from '../includes/Content'
import {Sidebar} from '../includes/Sidebar'

const OverviewComponent = (props) => (
    <div className='wrapper'>
        <Sidebar/>
        <Header/>
        <Content/>
    </div>
)

export const Overview = OverviewComponent