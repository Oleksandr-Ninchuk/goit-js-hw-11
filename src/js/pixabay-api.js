import axios from 'axios';

const API_KEY = '49113613-79f6fca50dc45b87a79142d8e';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
}
