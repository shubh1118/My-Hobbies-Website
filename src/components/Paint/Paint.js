import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./paint.css";
import axios from "axios";
import FallbackLoader from "../Loaders/FallbackLoader";
import PaintingCard from "../Hobbies/Paint/PaintingCard";
import PaintingModal from "../Hobbies/Paint/PaintingModal";
import Pagination from "../Hobbies/Paint/Pagination";

const API_BASE_URL = "https://api.artic.edu/api/v1/artworks/search";
const ITEMS_PER_PAGE = 15;
const FIELDS =
  "id,title,image_id,artist_display,date_display,medium_display,dimensions,place_of_origin,description";

function Painting() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPaintings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL, {
        params: {
          fields: FIELDS,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
      });
      setPaintings(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total / ITEMS_PER_PAGE));
      setError(null);
    } catch (error) {
      setError("Failed to fetch paintings. Please try again later.");
      console.error("Error fetching paintings:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPaintings();
  }, [fetchPaintings]);

  const handleCardClick = useCallback((painting) => {
    setSelectedPainting(painting);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedPainting(null);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const horizontalPaintings = useMemo(
    () =>
      paintings.slice(0, 5).map((painting) => (
        <PaintingCard
          key={painting.id}
          painting={painting}
          onCardClick={handleCardClick}
        />
      )),
    [paintings, handleCardClick]
  );

  const verticalPaintings = useMemo(
    () =>
      paintings.slice(5, 15).map((painting) => (
        <PaintingCard
          key={painting.id}
          painting={painting}
          onCardClick={handleCardClick}
        />
      )),
    [paintings, handleCardClick]
  );

  if (loading && paintings.length === 0) {
    return (
      <div>
        <FallbackLoader title="Loading masterpieces..." />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="painting-container">
      <div className="gallery-header">
        <h1>🎨 Art Gallery</h1>
      </div>

      <div className="gallery-layout">
        <div className="horizontal-section">
          <h2>Featured Works</h2>
          <div className="paintings-horizontal">
            <div className="paintings-scroll">{horizontalPaintings}</div>
          </div>
        </div>

        <div className="vertical-section">
          <h2>Gallery Collection</h2>
          <div className="paintings-vertical">{verticalPaintings}</div>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {selectedPainting && (
        <PaintingModal painting={selectedPainting} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default React.memo(Painting);
