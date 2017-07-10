import  React, {Component} from 'react'
import PropTypes from 'prop-types';
import sortBy from 'sort-by'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType:PropTypes.string.isRequired
    }

    onChange(event){
        console.log(event.target.value)
    } 

    render(){
        const {books,shelfType}  =this.props
        var title = "";

        switch(shelfType){
            case "currentlyReading":
                title="Currently Reading";
                break;
            case "wantToRead":
                title="Want to Read";
                break;
            case "read":
                title="Read";
                break;
            default:
                title="Currently Reading";
        }


        books.sort(sortBy('title'))

        return (
            <div className="bookshelf" key={shelfType}>
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books
                            .filter(function(book){
                                return book.shelf === shelfType
                            })
                            .map((b)=> (
                            <li key={b.id} >
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${b.imageLinks.thumbnail})`}}></div>
                                    <div className="book-shelf-changer">
                                        <select value={b.shelf} onChange={this.onChange}>
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
                </div>
            </div>
        )
    }

}

export default ListBooks