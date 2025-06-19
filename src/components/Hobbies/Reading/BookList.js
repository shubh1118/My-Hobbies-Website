import React from "react";
import { FaBookmark, FaBookOpen } from "react-icons/fa";

function BookList({ books, onView, onBookmark, isBookmarked, isBookmarking }) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-cover-container">
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "/placeholder-book-cover.png"
              }
              alt={`Cover of ${book.volumeInfo.title}`}
              className="book-cover"
              onError={(e) => {
                e.target.src = "/placeholder-book-cover.png";
              }}
            />
          </div>
          <div className="book-info">
            <h3>{book.volumeInfo.title}</h3>
            <p className="author">
              {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
            </p>
            <div className="book-actions">
              <button className="action-btn view" onClick={() => onView(book)}>
                <FaBookOpen /> View
              </button>
              <button
                className={`action-btn bookmark ${
                  isBookmarked(book.id) ? "active" : ""
                }`}
                onClick={() => onBookmark(book)}
                disabled={isBookmarking}
              >
                <FaBookmark /> {isBookmarked(book.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
