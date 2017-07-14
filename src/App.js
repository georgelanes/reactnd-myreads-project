import React from 'react'
import {Route, Link} from 'react-router-dom'
import sortBy from 'sort-by'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import ListBookItem from './ListBookItem'

import './App.css'

class BooksApp extends React.Component {
  
  state = {
    query:'',
    books:[],
    searchBooks:[]
  }

  updateQuery = (query) =>{
    this.setState({query: query.trim() })
    if (this.state.query) {
      BooksAPI.search(this.state.query,20).then((booksResult) => {
        //books.sort(sortBy('title'))
        for (var el in booksResult) {
          let bR = booksResult[el]
          let book = this.state.books.find(b=> b.id === bR.id)
          if(book) {
            console.log(book)
            bR.shelf = book.shelf
          } else {
            bR.shelf = 'none'
          }
        }
        this.setState({searchBooks: booksResult})
      })
    } 
  }

  onChange = (event) => {
        var book=event.target
        var bookId = book.attributes.getNamedItem('data-id').value
        console.log("shelf: " + book.value + ", Book Id: " + bookId)
        var bookUpdate = {
            id:bookId
        }
        
        BooksAPI.update(bookUpdate,book.value).then((resultBooks) => {
          BooksAPI.getAll().then((books) => {
            this.setState({books: books})
          })
        })

  } 

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  render() {
    const shelfTypes = ['currentlyReading', 'wantToRead', 'read' ];
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
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
              {(this.state.query !== '' && this.state.searchBooks) && (
                  <ListBookItem books={this.state.searchBooks} onShelfChange={this.onChange} />
              )}
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfTypes.map(shelfType => 
                    <ListBooks key={shelfType}  shelfType={shelfType} books={this.state.books}  onShelfChange={this.onChange}/>
                  )}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="add-contact">Add a book</Link>
              </div>
            </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp