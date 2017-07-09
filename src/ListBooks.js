import  React, {Component} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf:PropTypes.array.isRequired
    }

    state = {
        query:''
    }

    updateQuery = (query) =>{
        this.setState({query: query.trim() })
    }

    clearQuery = () =>{
        this.setState({query: '' })
    }

    render(){
        const {books,shelf}  =this.props
        const {query} = this.state
        var title = "";

        let showingBooks
        if(shelf){
            const match = new RegExp(escapeRegExp(shelf),'i')
            showingBooks = books.filter((book) => match.test(book.shelf))
        } else {
            showingBooks = books
        }
        

        switch(shelf){
            case "currentlyReading":
                title="Currently Reading";
                break;
            case "wantToRead":
                title="Want to Read";
                break;
            case "read":
                title="Read";
                break;                
        }


        showingBooks.sort(sortBy('title'))

        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {showingBooks.map((b)=> (
                    <li key={b.id} >
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${b.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select value={b.shelf}>
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
                            {b.authors.map((a) =>(
                                <p>{a}</p>
                            ))}
                        </div>
                    </div>
                    </li>
                ))}
            </ol>
            </div>
            </div>
        )
    }

}

export default ListBooks