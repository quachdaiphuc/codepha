import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import DefaultImage from '../../../img/a1.jpg'
import DefaultImage2 from '../../../img/a2.jpg'

export const Content = (props) => (
    <Grid className='main-content'>
        <Row className="show-grid">
            <Col xsHidden={true} md={3} className='con-left'>
                <Grid componentClass='grid-left'>
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
                                    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
                                         className="kHyW6"><title>Favorite</title>
                                        <g>
                                            <path d="M256 475.8c-4.9 0-9.1-1.7-12.5-5.1l-176.7-170.5c-1.9-1.5-4.5-4-7.8-7.4-3.3-3.4-8.5-9.6-15.7-18.6-7.2-9-13.6-18.2-19.3-27.6-5.7-9.4-10.7-20.9-15.2-34.3-4.3-13.3-6.5-26.3-6.5-38.9 0-41.5 12-74 36-97.4 24-23.4 57.1-35.1 99.4-35.1 11.7 0 23.6 2 35.8 6.1 12.2 4.1 23.5 9.5 34 16.4 10.5 6.9 19.5 13.4 27 19.4 7.5 6 14.7 12.5 21.5 19.3 6.8-6.8 14-13.2 21.5-19.3 7.5-6 16.6-12.5 27-19.4 10.5-6.9 21.8-12.4 34-16.4 12.2-4.1 24.1-6.1 35.8-6.1 42.3 0 75.4 11.7 99.4 35.1 24 23.4 36 55.9 36 97.4 0 41.7-21.6 84.2-64.9 127.4l-176.3 169.9c-3.4 3.4-7.6 5.1-12.5 5.1z"></path>
                                        </g>
                                    </svg>
                                </a>
                                <span>12k</span>
                                <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                            </div>
                        </Col>
                        <Col xs={2} md={2} xsHidden={true} className='favorite-box text-center'>
                            <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
                                     className="kHyW6"><title>Favorite</title>
                                    <g>
                                        <path d="M256 475.8c-4.9 0-9.1-1.7-12.5-5.1l-176.7-170.5c-1.9-1.5-4.5-4-7.8-7.4-3.3-3.4-8.5-9.6-15.7-18.6-7.2-9-13.6-18.2-19.3-27.6-5.7-9.4-10.7-20.9-15.2-34.3-4.3-13.3-6.5-26.3-6.5-38.9 0-41.5 12-74 36-97.4 24-23.4 57.1-35.1 99.4-35.1 11.7 0 23.6 2 35.8 6.1 12.2 4.1 23.5 9.5 34 16.4 10.5 6.9 19.5 13.4 27 19.4 7.5 6 14.7 12.5 21.5 19.3 6.8-6.8 14-13.2 21.5-19.3 7.5-6 16.6-12.5 27-19.4 10.5-6.9 21.8-12.4 34-16.4 12.2-4.1 24.1-6.1 35.8-6.1 42.3 0 75.4 11.7 99.4 35.1 24 23.4 36 55.9 36 97.4 0 41.7-21.6 84.2-64.9 127.4l-176.3 169.9c-3.4 3.4-7.6 5.1-12.5 5.1z"></path>
                                    </g>
                                </svg>
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
                                    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
                                         className="kHyW6"><title>Favorite</title>
                                        <g>
                                            <path d="M256 475.8c-4.9 0-9.1-1.7-12.5-5.1l-176.7-170.5c-1.9-1.5-4.5-4-7.8-7.4-3.3-3.4-8.5-9.6-15.7-18.6-7.2-9-13.6-18.2-19.3-27.6-5.7-9.4-10.7-20.9-15.2-34.3-4.3-13.3-6.5-26.3-6.5-38.9 0-41.5 12-74 36-97.4 24-23.4 57.1-35.1 99.4-35.1 11.7 0 23.6 2 35.8 6.1 12.2 4.1 23.5 9.5 34 16.4 10.5 6.9 19.5 13.4 27 19.4 7.5 6 14.7 12.5 21.5 19.3 6.8-6.8 14-13.2 21.5-19.3 7.5-6 16.6-12.5 27-19.4 10.5-6.9 21.8-12.4 34-16.4 12.2-4.1 24.1-6.1 35.8-6.1 42.3 0 75.4 11.7 99.4 35.1 24 23.4 36 55.9 36 97.4 0 41.7-21.6 84.2-64.9 127.4l-176.3 169.9c-3.4 3.4-7.6 5.1-12.5 5.1z"></path>
                                        </g>
                                    </svg>
                                </a>
                                <span>12k</span>
                                <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                            </div>
                        </Col>
                        <Col xs={2} md={2} xsHidden={true} className='favorite-box text-center'>
                            <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
                                     className="kHyW6"><title>Favorite</title>
                                    <g>
                                        <path d="M256 475.8c-4.9 0-9.1-1.7-12.5-5.1l-176.7-170.5c-1.9-1.5-4.5-4-7.8-7.4-3.3-3.4-8.5-9.6-15.7-18.6-7.2-9-13.6-18.2-19.3-27.6-5.7-9.4-10.7-20.9-15.2-34.3-4.3-13.3-6.5-26.3-6.5-38.9 0-41.5 12-74 36-97.4 24-23.4 57.1-35.1 99.4-35.1 11.7 0 23.6 2 35.8 6.1 12.2 4.1 23.5 9.5 34 16.4 10.5 6.9 19.5 13.4 27 19.4 7.5 6 14.7 12.5 21.5 19.3 6.8-6.8 14-13.2 21.5-19.3 7.5-6 16.6-12.5 27-19.4 10.5-6.9 21.8-12.4 34-16.4 12.2-4.1 24.1-6.1 35.8-6.1 42.3 0 75.4 11.7 99.4 35.1 24 23.4 36 55.9 36 97.4 0 41.7-21.6 84.2-64.9 127.4l-176.3 169.9c-3.4 3.4-7.6 5.1-12.5 5.1z"></path>
                                    </g>
                                </svg>
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
                                    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
                                         className="kHyW6"><title>Favorite</title>
                                        <g>
                                            <path d="M256 475.8c-4.9 0-9.1-1.7-12.5-5.1l-176.7-170.5c-1.9-1.5-4.5-4-7.8-7.4-3.3-3.4-8.5-9.6-15.7-18.6-7.2-9-13.6-18.2-19.3-27.6-5.7-9.4-10.7-20.9-15.2-34.3-4.3-13.3-6.5-26.3-6.5-38.9 0-41.5 12-74 36-97.4 24-23.4 57.1-35.1 99.4-35.1 11.7 0 23.6 2 35.8 6.1 12.2 4.1 23.5 9.5 34 16.4 10.5 6.9 19.5 13.4 27 19.4 7.5 6 14.7 12.5 21.5 19.3 6.8-6.8 14-13.2 21.5-19.3 7.5-6 16.6-12.5 27-19.4 10.5-6.9 21.8-12.4 34-16.4 12.2-4.1 24.1-6.1 35.8-6.1 42.3 0 75.4 11.7 99.4 35.1 24 23.4 36 55.9 36 97.4 0 41.7-21.6 84.2-64.9 127.4l-176.3 169.9c-3.4 3.4-7.6 5.1-12.5 5.1z"></path>
                                        </g>
                                    </svg>
                                </a>
                                <span>12k</span>
                                <Button bsStyle="success" className='btn-preview'>Buy Now</Button>
                            </div>
                        </Col>
                        <Col xs={2} md={2} xsHidden={true} className='favorite-box text-center'>
                            <a className="_1yYDP _2gP_-" href="/favorites?item_id=22295953" title="Add to Favorites" rel="nofollow">
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
                                     className="kHyW6"><title>Favorite</title>
                                    <g>
                                        <path d="M256 475.8c-4.9 0-9.1-1.7-12.5-5.1l-176.7-170.5c-1.9-1.5-4.5-4-7.8-7.4-3.3-3.4-8.5-9.6-15.7-18.6-7.2-9-13.6-18.2-19.3-27.6-5.7-9.4-10.7-20.9-15.2-34.3-4.3-13.3-6.5-26.3-6.5-38.9 0-41.5 12-74 36-97.4 24-23.4 57.1-35.1 99.4-35.1 11.7 0 23.6 2 35.8 6.1 12.2 4.1 23.5 9.5 34 16.4 10.5 6.9 19.5 13.4 27 19.4 7.5 6 14.7 12.5 21.5 19.3 6.8-6.8 14-13.2 21.5-19.3 7.5-6 16.6-12.5 27-19.4 10.5-6.9 21.8-12.4 34-16.4 12.2-4.1 24.1-6.1 35.8-6.1 42.3 0 75.4 11.7 99.4 35.1 24 23.4 36 55.9 36 97.4 0 41.7-21.6 84.2-64.9 127.4l-176.3 169.9c-3.4 3.4-7.6 5.1-12.5 5.1z"></path>
                                    </g>
                                </svg>
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
