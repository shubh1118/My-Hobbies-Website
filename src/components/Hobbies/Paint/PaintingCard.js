import React, { useCallback } from "react";

const PaintingCard = React.memo(({ painting, onCardClick }) => {
  const handleClick = useCallback(() => {
    onCardClick(painting);
  }, [painting, onCardClick]);

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

export default PaintingCard;
