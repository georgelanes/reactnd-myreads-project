import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import ListBooks from './ListBooks'

class BookshelfPage extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    render(){
        const {books,onShelfChange} = this.props
        const shelfTypes = ['currentlyReading', 'wantToRead', 'read' ];
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfTypes.map(shelfType => 
                    <ListBooks key={shelfType}  shelfType={shelfType} books={books}  onShelfChange={onShelfChange}/>
                  )}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="add-contact">Add a book</Link>
              </div>
            </div>
        )
    }
}

export default BookshelfPage