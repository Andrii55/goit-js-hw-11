// import axios from 'axios';
// import notiflix from 'notiflix';

// const KEY = 'u_61sj29d2nr';
// const searchTerm = 'landscape';
// const imageType = 'photo';
// const orientation = 'horizontal';
// const safeSearch = 'true';
// const perPage = 40;
// const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(searchTerm)}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}`;

// async function getImages() {
//   try {
//     const response = await axios.get(url);
//     return response;
//   } catch (error) {
//     console.error(error);
//     notiflix.Notify.failure('Something went wrong. Please try again later.');
//   }
// }

// getImages()
//   .then((response) => {
//     const images = response.data.hits.map((hit) => ({
//       webformatURL: hit.webformatURL,
//       largeImageURL: hit.largeImageURL,
//       tags: hit.tags,
//       likes: hit.likes,
//       views: hit.views,
//       comments: hit.comments,
//       downloads: hit.downloads,
//     }));
//     if (images.length === 0) {
//       notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
//     }
//     console.log(images);
//   });
