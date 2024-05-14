import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchInput = document.querySelector('input[class="search-input"]');
const form = document.querySelector('form[class="search"]');
const gallerySection = document.querySelector(
  'section[class="gallery-section"]'
);
const loaderHtml = '<div id="loader" class="loader"></div>';
const imgBlock = document.querySelector('ul[class="gallery"]');
const loadMoreButton = document.getElementById('load-more');
let images = [];
let formInput = '';
let page = 1;
let perPage = 15;
let maxPages;


const lightboxOptions = {
  captionsData: 'alt',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('ul.gallery a', lightboxOptions);

const toastSettings = {
  position: 'topRight',
  messageColor: '#ffffff',
  timeout: 5000,
  radius: 15,
};

const errorMessage = message => {
  iziToast.error({
    ...toastSettings,
    backgroundColor: '#FF2E2E',
    message,
  });
};

const infoMessage = message => {
  iziToast.info({
    ...toastSettings,
    timeout: 10000,
    backgroundColor: 'lightblue',
    message,
  });
};

const scrolledImages = height => {
  const timeout = setTimeout(() => {
    window.scrollBy({
      top: height * 2,
      left: 0,
      behavior: 'smooth',
    });
    clearTimeout(timeout);
  }, 1000);
};

const loadMore = async () => {

    try {
      gallerySection.insertAdjacentHTML('beforebegin', loaderHtml);
  
      const imagesData = await fetchImages(formInput, page, perPage);
  
      const loader = document.querySelector('#loader');
      if (loader) {
        loader.remove();
      }
      images = [...imagesData.hits];
      
      renderImages(imgBlock, images);
      
      lightbox.refresh();
  
      const galleryItem = document.querySelector('.gallery-item');
      const galleryItemSize = galleryItem.getBoundingClientRect();
      scrolledImages(galleryItemSize.height);

  
        if (page >= maxPages) {
        loadMoreButton.classList.add('none'); 
        infoMessage("We're sorry, but you've reached the end of search results.");
      }
      page += 1;
    } catch (error) {
      console.error(error);
    }
  };

const handleSubmit = async event => {
  event.preventDefault();

  images = [];
  page = 1;
  imgBlock.textContent = '';
  loadMoreButton.classList.replace('load-more', 'none');
  const form = event.target;
  const input = searchInput.value.trim();
  formInput = input;

  if (input === '') {
    errorMessage('The request must not be empty!');
    return;
  }

  try {
    gallerySection.insertAdjacentHTML('beforebegin', loaderHtml);
    const imagesData = await fetchImages(input, page, perPage);

    const loader = document.querySelector('#loader');
    if (loader) {
      loader.remove();
    }

    if (imagesData !== null && imagesData.hits.length > 0) {
      images = [...images, ...imagesData.hits];

      renderImages(imgBlock, images);

      lightbox.refresh();
      maxPages = Math.ceil(imagesData.totalHits / perPage);

      if (page >= 1) {
        loadMoreButton.classList.replace('none', 'load-more');
      }
 if (page >= maxPages) {
    loadMoreButton.classList.add('none'); 
    infoMessage("We're sorry, but you've reached the end of search results.");
  }

page += 1;

    } else {
        errorMessage(
        'Sorry, there are no images matching your search query. Please, try again again!'
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
 
  form.reset();
};

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', loadMore);
