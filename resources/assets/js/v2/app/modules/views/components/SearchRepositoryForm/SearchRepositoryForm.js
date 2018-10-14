import React from 'react'

import './style.scss'

const SearchRepositoryForm = (props) => (
    <form className='SearchRepositoryForm' onKeyPress={props.handleKeyPress}>
        <p className='clear-btn' onClick={props.handleClearSearch}>Clear Search</p>
        <div className='search-wraper'>
            <input type='text'
                name='keyword'
                placeholder='Search'
                value={props.value}
                onChange={props.handleInputChange} />
            <button onClick={props.handleSearch}>
                <i className='fas fa-search'></i>
            </button>
            <p className='error'>{props.error}</p>
        </div>
    </form>
)

export default SearchRepositoryForm
