import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

import ListBookItem from './ListBookItem'

class SearchPage extends React.Component {
    static propTypes = {
        booksShelf: PropTypes.array.isRequired
    }
   
    state = {
        query:'',
        searchBooks:[]
    }

    updateQuery = (query) =>{
        this.setState({query: query})
        if (this.state.query && this.props.booksShelf) {
            BooksAPI.search(this.state.query.trim(),20).then((booksResult) => {
                if(booksResult && booksResult.length > 0) {
                    for (var el in booksResult) {
                        let bR = booksResult[el]
                        let book = this.props.booksShelf.find(b=> b.id === bR.id)
                        if(book) {
                            bR.shelf = book.shelf
                        }
                    }
                    console.log(booksResult) 
                    this.setState({searchBooks: booksResult})
                    //console.log(booksResult)   
                } else {
                    this.setState({searchBooks: []})
                }
            })
        } else {
            this.setState({searchBooks: []})
        }
    }

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
    }

    render(){
        const {onShelfChange} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event)=>this.updateQuery(event.target.value)}
                    />
                </div>
                </div>
                <div className="search-books-results">
                    {this.state.searchBooks && (
                        <ListBookItem books={this.state.searchBooks} onShelfChange={onShelfChange} />
                    )}
                </div>
            </div>
        )
    }
}

export default SearchPage