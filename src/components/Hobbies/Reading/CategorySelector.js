import React from "react";

function CategorySelector({ categories, selectedCategory, onChange }) {
  return (
    <div className="search-filter-section">
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
