import React from 'react'
import {Route, Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    query:'',
    books:[]
  }

  updateQuery = (query) =>{
    this.setState({query: query.trim() })
  }

  onShelfChange(event){
        console.log(event.target.value)
  } 

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  render() {

    let showingBooks
    if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        showingBooks = this.state.books.filter((book) => match.test(book.title))
    } else {
        showingBooks = this.state.books
    }

    showingBooks.sort(sortBy('title'))

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
              {this.state.query !== '' && (
                <ol className="books-grid">
                  {showingBooks
                      .map((b)=> (
                      <li key={b.id} >
                          <div className="book">
                              <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${b.imageLinks.thumbnail})`}}></div>
                              <div className="book-shelf-changer">
                                  <select value={b.shelf} onChange={this.onShelfChange}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                  </select>
                              </div>
                              </div>
                              <div className="book-title">{b.title}</div>
                              <div className="book-authors">
                                  {b.authors.map((a, index) =>(
                                      <p key={index}>{a}</p>
                                  ))}
                              </div>
                          </div>
                      </li>
                  ))}
                </ol>
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
                  <ListBooks shelfType="currentlyReading" books={this.state.books}/>
                  <ListBooks shelfType="wantToRead" books={this.state.books}/>
                  <ListBooks shelfType="read" books={this.state.books}/>
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