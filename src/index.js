import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import basicLightbox from 'basiclightbox';

const ref = {
  searchFormEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  searchButtonEl: document.querySelector('button[type="submit"]'),
  searchInputEl: document.querySelector('input[name="searchQuery"]'),
  galleryImagesEl: document.querySelectorAll('.photo-card a'),
};

let page = 1;
let hasNotificationShown = false;

function onSearchSubmit(e) {
  e.preventDefault();
  page = 1;
  ref.galleryEl.innerHTML = '';
  hasNotificationShown = false;
  onSearchClick();
}

ref.searchFormEl.addEventListener('submit', onSearchSubmit);

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
  const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url);
    const totalHits = response.data.totalHits;
    const images = response.data.hits.map(hit => ({
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,
      views: hit.views,
      comments: hit.comments,
      downloads: hit.downloads,
    }));

    if (images.length > 0) {
      if (!hasNotificationShown) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        hasNotificationShown = true;
      }
      renderGallery(images);
      page += 1;
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error);
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
      return `
            <div class="photo-card">
              <a href="${largeImageURL}">
                <img
                class="photo__image"
                  src="${webformatURL}"
                  alt="${tags}"
                  loading="lazy"
                />
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes:</b> ${likes}
                </p>
                <p class="info-item">
                  <b>Views:</b> ${views}
                </p>
                <p class="info-item">
                  <b>Comments:</b> ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads:</b> ${downloads}
                </p>
              </div>
            </div>`;
    })
    .join('');

  ref.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

  const galleryImagesEl = ref.galleryEl.querySelectorAll('.photo-card a');

  galleryImagesEl.forEach(image => {
    image.addEventListener('click', onImageClick);
  });

  function onImageClick(e) {
    e.preventDefault();

    const largeImageUrl = e.target.getAttribute('href');
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const instance = basicLightbox
      .create(`<img src="${largeImageUrl}" width="600" height="600">`)
      .show();
  }

  const options = {
    captions: true,
    captionsData: 'alt',
    captionsDelay: 250,
  };

  const lightbox = new SimpleLightbox('.photo-card a', options);
  lightbox.refresh();
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    onSearchClick();
  }
});
