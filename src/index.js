import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const ref = {
  searchFormEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  searchButtonEl: document.querySelector('button[type="submit"]'),
  searchInputEl: document.querySelector('input[name="searchQuery"]'),
};

ref.searchFormEl.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  onSearchClick();
}

async function onSearchClick() {
  const searchQuery = ref.searchInputEl.value.trim();
  if (!searchQuery) {
    return;
  }

  const KEY = '35605162-423c41836779f9af24399a6b4';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = 'true';
  const perPage = 40;
  const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(searchQuery)}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}`;

  ref.galleryEl.innerHTML = '';

  try {
    const response = await axios.get(url);
    console.log(url)
    const images = response.data.hits.map(hit => ({
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,
      views: hit.views,
      comments: hit.comments,
      downloads: hit.downloads,
    }));
    if (images.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    renderGallery(images);
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

function renderGallery(images) {
  const galleryMarkup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return (`
        <div class="photo-card">
          {' '}
          <img
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
            data-source="${largeImageURL}"
          />{' '}
          <div class="info">
            {' '}
            <p class="info-item">
              {' '}
              <b>Likes:</b> ${likes}{' '}
            </p>{' '}
            <p class="info-item">
              {' '}
              <b>Views:</b> ${views}{' '}
            </p>{' '}
            <p class="info-item">
              {' '}
              <b>Comments:</b> ${comments}{' '}
            </p>{' '}
            <p class="info-item">
              {' '}
              <b>Downloads:</b> ${downloads}{' '}
            </p>{' '}
          </div>{' '}
        </div>`
      );
    })
    .join('');

  ref.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

  const galleryImagesEl = document.querySelectorAll('img');
  galleryImagesEl.forEach(image => {
    image.addEventListener('click', onImageClick);
  });
}

// function onImageClick(e) {
//   const largeImageUrl = e.target.dataset.source;
// }
