import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43788536-1320d3af2b7eba5483923831a';

export const fetchImages = async (searchValue = '', page = 1, perPage = 15) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
        searchValue
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};