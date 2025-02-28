import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loadingText = document.querySelector('.loading-text');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  loadingText.style.display = 'block';

  try {
    const data = await fetchImages(query);

    if (!data || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found!',
        position: 'topRight',
      });
      return;
    }

    renderImages(data.hits);
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loadingText.style.display = 'none';
  }

  input.value = '';
});
