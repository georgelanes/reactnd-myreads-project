import  React, {Component} from 'react'
import PropTypes from 'prop-types';

class ListBookItem extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }
   
    render(){
        const {books,onShelfChange} = this.props

        return (
            <ol className="books-grid">
                {books ? books.map((b)=> (
                    <li key={b.id} >
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${b.imageLinks ? b.imageLinks.thumbnail : ''})`}}></div>
                            <div className="book-shelf-changer">
                                <select value={b.shelf} onChange={onShelfChange} data-id={b.id}>
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
                                {b.authors ? b.authors.map((a, index) =>(
                                    <p key={index}>{a}</p>
                                )) : 'Unknown'}
                            </div>
                        </div>
                    </li>
                )) : 'Unknown'}
            </ol>
            
        )
    }
}
export default ListBookItem