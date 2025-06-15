import React, { useEffect, useState, useMemo, useCallback } from "react";
import "../styles/paint.css";
import axios from "axios";

const API_BASE_URL = "https://api.artic.edu/api/v1/artworks/search";
const ITEMS_PER_PAGE = 15;
const FIELDS =
  "id,title,image_id,artist_display,date_display,medium_display,dimensions,place_of_origin,description";

const PaintingCard = React.memo(({ painting, onCardClick }) => {
  const handleClick = useCallback(
    () => onCardClick(painting),
    [painting, onCardClick]
  );

  return (
    <div className="painting-card" onClick={handleClick}>
      <div className="painting-image-container">
        <img
          src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`}
          alt={painting.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/843x500?text=Image+Not+Available";
          }}
        />
        <div className="painting-overlay">
          <span className="view-details">View Details</span>
        </div>
      </div>
      <div className="painting-info">
        <h3>{painting.title}</h3>
        <p>
          <strong>Artist:</strong> {painting.artist_display}
        </p>
        {painting.date_display && (
          <p>
            <strong>Date:</strong> {painting.date_display}
          </p>
        )}
        {painting.medium_display && (
          <p>
            <strong>Medium:</strong> {painting.medium_display}
          </p>
        )}
      </div>
    </div>
  );
});

const PaintingModal = React.memo(({ painting, onClose }) => {
  const handleModalClick = useCallback((e) => e.stopPropagation(), []);

  if (!painting) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <img
            src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`}
            alt={painting.title}
            loading="lazy"
          />
          <div className="modal-info">
            <h2>{painting.title}</h2>
            <p>
              <strong>Artist:</strong> {painting.artist_display}
            </p>
            {painting.date_display && (
              <p>
                <strong>Date:</strong> {painting.date_display}
              </p>
            )}
            {painting.medium_display && (
              <p>
                <strong>Medium:</strong> {painting.medium_display}
              </p>
            )}
            {painting.dimensions && (
              <p>
                <strong>Dimensions:</strong> {painting.dimensions}
              </p>
            )}
            {painting.place_of_origin && (
              <p>
                <strong>Origin:</strong> {painting.place_of_origin}
              </p>
            )}
            {painting.description && (
              <p>
                <strong>Description:</strong> {painting.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

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
      paintings
        .slice(0, 5)
        .map((painting) => (
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
      paintings
        .slice(5, 15)
        .map((painting) => (
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading masterpieces...</p>
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
        <div className="pagination">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      {selectedPainting && (
        <PaintingModal painting={selectedPainting} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default React.memo(Painting);
