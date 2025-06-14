import axios from 'axios';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedBlogs = null;
let lastFetchTime = null;

export const fetchBlogs = async () => {
  // Return cached data if it's still valid
  if (cachedBlogs && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return { data: cachedBlogs, error: null };
  }

  try {
    const response = await axios.get("https://dev.to/api/articles?tag=javascript&top=3");
    cachedBlogs = response.data;
    lastFetchTime = Date.now();
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch blogs. Please try again later." };
  }
}; 