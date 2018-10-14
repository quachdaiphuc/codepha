import React, { Component } from 'react'

import UserRole from 'v2App/enums/UserRole'
import SidebarItem from './SidebarItem/SidebarItem'
import Aux from 'v2App/HOCs/Aux/Aux'
import { slide as Menu } from 'react-burger-menu'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

class Sidebar extends Component {

    renderModTab = () => (
        <SidebarItem to='/repository/available'>
            <i className='fas fa-list-ul'></i>
        </SidebarItem>
    )

    renderAdminTab = () => (
        <SidebarItem to='/admin'>
            <i className='fas fa-user'></i>
        </SidebarItem>
    )

    render() {
        return (
            <div id="outer-sidebar" >
                <Menu className='sidebar'>
                    <div className='sidebar-menu'>
                        <Row>
                            <Col mdOffset={2} md={8} className='nav-left-box'>
                                <ul className='nav-product'>
                                    <li>
                                        <a href="">
                                            Install
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            Configuration
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            Usage
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            Feature
                                        </a>
                                    </li>
                                </ul>

                                <ul className='nav-own'>
                                    <li>
                                        <a href="">
                                            About me
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            Collaborate
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Menu>
            </div>
        )
    }
}

export default Sidebar
