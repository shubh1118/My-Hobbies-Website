import React from "react";
import { FaBookmark } from "react-icons/fa";

function BookModal({ book, onClose, onBookmark, isBookmarked, isBookmarking }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <img
            src={
              book.volumeInfo.imageLinks?.thumbnail ||
              "/placeholder-book-cover.png"
            }
            alt={`Cover of ${book.volumeInfo.title}`}
            className="modal-book-cover"
            onError={(e) => {
              e.target.src = "/placeholder-book-cover.png";
            }}
          />
          <div className="modal-book-info">
            <h2>{book.volumeInfo.title}</h2>
            <p className="author">
              {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
            </p>
            <p className="published-date">
              Published: {book.volumeInfo.publishedDate || "Unknown"}
            </p>
            <p className="publisher">
              Publisher: {book.volumeInfo.publisher || "Unknown"}
            </p>
            <p className="pages">
              Pages: {book.volumeInfo.pageCount || "Unknown"}
            </p>
            <p className="description">
              {book.volumeInfo.description || "No description available."}
            </p>
            <div className="modal-actions">
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-btn"
              >
                Preview Book
              </a>
              <button
                className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
                onClick={() => onBookmark(book)}
                disabled={isBookmarking}
              >
                <FaBookmark /> {isBookmarked ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
