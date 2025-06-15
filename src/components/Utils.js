export const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
  console.warn(`Failed to load image: ${e.target.alt}`);
};
