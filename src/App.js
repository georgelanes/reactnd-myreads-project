import React from 'react'
import {Route} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BookshelfPage from  './BookshelfPage'
import SearchPage from  './SearchPage'

import './App.css'

class BooksApp extends React.Component {
  
  state = {
    books:[]
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
    
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchPage onShelfChange={this.onChange} booksShelf={this.state.books} />
        )}/>
        <Route exact path="/" render={() => (
            <BookshelfPage books={this.state.books}  onShelfChange={this.onChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp