import React, { useCallback } from "react";

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

export default PaintingModal;
