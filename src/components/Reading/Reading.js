import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./Reading.css";
import axios from "axios";
import { FaBookmark, FaBookOpen, FaSpinner } from "react-icons/fa";
import FallbackLoader from "../Loaders/FallbackLoader";

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const ITEMS_PER_PAGE = 12;
const CATEGORIES = [
  "Programming",
  "Fiction",
  "Science",
  "History",
  "Biography",
  "Technology",
];

function Reading() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / ITEMS_PER_PAGE),
    [totalItems]
  );
  const isBookmarked = useCallback(
    (bookId) => bookmarks.some((b) => b.id === bookId),
    [bookmarks]
  );

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const query = selectedCategory.toLowerCase();

        const response = await axios.get(
          `${API_BASE_URL}?q=${encodeURIComponent(
            query
          )}&startIndex=${startIndex}&maxResults=${ITEMS_PER_PAGE}`
        );

        if (!response.data.items) {
          setError("No books found. Try a different category.");
          setLoading(false);
          return;
        }

        setBooks(response.data.items);
        setTotalItems(response.data.totalItems || 0);
      } catch (error) {
        console.error("Error fetching books:", error);
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          setError(
            "No response from server. Please check your internet connection."
          );
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, selectedCategory]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  const toggleBookmark = useCallback(
    async (book) => {
      try {
        setIsBookmarking(true);
        const newBookmarks = isBookmarked(book.id)
          ? bookmarks.filter((b) => b.id !== book.id)
          : [...bookmarks, book];

        setBookmarks(newBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      } catch (error) {
        setError("Failed to save bookmark. Please try again.");
      } finally {
        setIsBookmarking(false);
      }
    },
    [bookmarks, isBookmarked]
  );

  const LoadingSkeleton = () => (
    <div className="books-grid">
      {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
        <div key={index} className="book-card skeleton">
          <div className="skeleton-cover"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="reading-container">
        <FallbackLoader/>
        <LoadingSkeleton />
      </div>
    );
  }

  const getPageNumbers = () => {
    const visiblePages = 5;
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (error) {
    return (
      <div className="reading-container error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => setCurrentPage(1)} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-container">
      <h1 className="page-title">📚 Discover Your Next Read</h1>

      <div className="search-filter-section">
        <div className="categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

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
                <button
                  className="action-btn view"
                  onClick={() => setSelectedBook(book)}
                >
                  <FaBookOpen /> View
                </button>
                <button
                  className={`action-btn bookmark ${
                    isBookmarked(book.id) ? "active" : ""
                  }`}
                  onClick={() => toggleBookmark(book)}
                  disabled={isBookmarking}
                >
                  <FaBookmark /> {isBookmarked(book.id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedBook(null)}
            >
              ×
            </button>
            <div className="modal-body">
              <img
                src={
                  selectedBook.volumeInfo.imageLinks?.thumbnail ||
                  "/placeholder-book-cover.png"
                }
                alt={`Cover of ${selectedBook.volumeInfo.title}`}
                className="modal-book-cover"
                onError={(e) => {
                  e.target.src = "/placeholder-book-cover.png";
                }}
              />
              <div className="modal-book-info">
                <h2>{selectedBook.volumeInfo.title}</h2>
                <p className="author">
                  {selectedBook.volumeInfo.authors?.join(", ") ||
                    "Unknown Author"}
                </p>
                <p className="published-date">
                  Published:{" "}
                  {selectedBook.volumeInfo.publishedDate || "Unknown"}
                </p>
                <p className="publisher">
                  Publisher: {selectedBook.volumeInfo.publisher || "Unknown"}
                </p>
                <p className="pages">
                  Pages: {selectedBook.volumeInfo.pageCount || "Unknown"}
                </p>
                <p className="description">
                  {selectedBook.volumeInfo.description ||
                    "No description available."}
                </p>
                <div className="modal-actions">
                  <a
                    href={selectedBook.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-btn"
                  >
                    Preview Book
                  </a>
                  <button
                    className={`bookmark-btn ${
                      isBookmarked(selectedBook.id) ? "active" : ""
                    }`}
                    onClick={() => toggleBookmark(selectedBook)}
                    disabled={isBookmarking}
                  >
                    <FaBookmark />{" "}
                    {isBookmarked(selectedBook.id) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reading;
