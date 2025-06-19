import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import FallbackLoader from "../Loaders/FallbackLoader";
import BookList from "../Hobbies/Reading/BookList";
import Pagination from "../Hobbies/Reading/Pagination";
import BookModal from "../Hobbies/Reading/BookModal";
import CategorySelector from "../Hobbies/Reading/CategorySelector";
import "./Reading.css";

const ITEMS_PER_PAGE = 12;
const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const CATEGORIES = ["Programming", "Fiction", "Science", "History", "Biography", "Technology"];

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

  const totalPages = useMemo(() => Math.ceil(totalItems / ITEMS_PER_PAGE), [totalItems]);

  const bookmarkedBookIds = useMemo(() => new Set(bookmarks.map(b => b.id)), [bookmarks]);

  const isBookmarked = useCallback((bookId) => bookmarkedBookIds.has(bookId), [bookmarkedBookIds]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading bookmarks:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const query = selectedCategory.toLowerCase();
        const res = await axios.get(
          `${API_BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${ITEMS_PER_PAGE}`
        );
        if (!res.data.items) {
          setError("No books found. Try a different category.");
          setBooks([]);
          return;
        }
        setBooks(res.data.items);
        setTotalItems(res.data.totalItems || 0);
      } catch (e) {
        console.error(e);
        setError("An error occurred while fetching books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  }, [totalPages]);

  const toggleBookmark = useCallback((book) => {
    setIsBookmarking(true);
    setBookmarks((prev) => {
      return isBookmarked(book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book];
    });
    setIsBookmarking(false);
  }, [isBookmarked]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const visible = 5;
    let start = Math.max(1, currentPage - Math.floor(visible / 2));
    let end = Math.min(start + visible - 1, totalPages);
    start = Math.max(1, end - visible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const LoadingSkeleton = () => (
    <div className="books-grid">
      {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
        <div key={i} className="book-card skeleton">
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

  if (loading) return <div className="reading-container"><FallbackLoader /><LoadingSkeleton /></div>;

  if (error) {
    return (
      <div className="reading-container error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => setCurrentPage(1)} className="retry-button">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-container">
      <h1 className="page-title">📚 Discover Your Next Read</h1>

      <CategorySelector
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      <BookList
        books={books}
        onView={setSelectedBook}
        onBookmark={toggleBookmark}
        isBookmarked={isBookmarked}
        isBookmarking={isBookmarking}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        onPageChange={handlePageChange}
      />

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBookmark={toggleBookmark}
          isBookmarked={isBookmarked(selectedBook.id)}
          isBookmarking={isBookmarking}
        />
      )}
    </div>
  );
}

export default Reading;
