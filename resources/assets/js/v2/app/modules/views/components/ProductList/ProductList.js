import React, { Component } from 'react'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import DefaultImage from '../../../../../../../img/a1.jpg'
import DefaultImage2 from '../../../../../../../img/a2.jpg'
import Like from 'v2View/components/Icons/Like'

const initLang = {
    en: '',
    vn: ''
}

class ProductList extends Component {

    render() {
        const { user } = this.props

        return (
            <Grid className='main-content'>
                <Row className="show-grid">
                    <Col xsHidden={true} md={3} className='con-left'>
                        <Grid componentClass='grid-left'>
                            <Row>
                                <Col mdOffset={2} md={8} className='nav-left-box'>
                                    <ul className='nav-product'>
                                        <li>
                                            <a href="">
                                                Products
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Blogs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Facebook
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
                        </Grid>
                    </Col>

                    <Col xs={12} md={9} className='con-right'>
                        <Grid className='product-item' componentClass='products'>
                            <Row>
                                <Col xs={12} md={5}>
                                    <a href="">
                                        <img src={DefaultImage} alt=""/>
                                    </a>
                                </Col>
                                <Col xs={12} md={5} className='item-content'>
                                    <a href="">Name of product item</a>
                                    <p>Category</p>
                                    <div className='feature'>
                                        <ul>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='favorite-xs'>
                                        <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                            <Like/>
                                        </a>
                                        <span>12k</span>
                                        <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                                    </div>
                                </Col>
                                <Col xs={2} md={2} xsHidden={true} className='favorite-box text-center'>
                                    <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                        <Like/>
                                    </a>
                                    <span>12k</span>
                                    <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={5}>
                                    <a href="">
                                        <img src={DefaultImage2} alt=""/>
                                    </a>
                                </Col>
                                <Col xs={12} md={5} className='item-content'>
                                    <a href="">Name of product item</a>
                                    <p>Category</p>
                                    <div className='feature'>
                                        <ul>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='favorite-xs'>
                                        <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                            <Like/>
                                        </a>
                                        <span>12k</span>
                                        <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                                    </div>
                                </Col>
                                <Col xs={2} md={2} xsHidden={true} className='favorite-box text-center'>
                                    <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                        <Like/>
                                    </a>
                                    <span>12k</span>
                                    <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={5}>
                                    <a href="">
                                        <img src={DefaultImage} alt=""/>
                                    </a>
                                </Col>
                                <Col xs={12} md={5} className='item-content'>
                                    <a href="">Name of product item</a>
                                    <p>Category</p>
                                    <div className='feature'>
                                        <ul>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                            <li>
                                                <span>feature 1</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='favorite-xs'>
                                        <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                            <Like/>
                                        </a>
                                        <span>12k</span>
                                        <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                                    </div>
                                </Col>
                                <Col xs={2} md={2} xsHidden={true} className='favorite-box text-center'>
                                    <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                        <Like/>
                                    </a>
                                    <span>12k</span>
                                    <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default ProductList
