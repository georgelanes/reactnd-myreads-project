import  React, {Component} from 'react'
import PropTypes from 'prop-types';
import sortBy from 'sort-by'
import ListBookItem from './ListBookItem'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType:PropTypes.string.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    render(){
        const {books,shelfType,onShelfChange}  =this.props
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
        let listBooks = books.filter(function(book){
                return book.shelf === shelfType})

        return (
            <div className="bookshelf" key={shelfType}>
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ListBookItem books={listBooks} onShelfChange={onShelfChange} />
                </div>
            </div>
        )
    }

}

export default ListBooks