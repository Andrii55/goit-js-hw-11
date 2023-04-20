import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
<link rel="stylesheet" href="node_modules/simplelightbox/dist/simple-lightbox.min.css"></link>


// Прокручування сторінки
// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

// Нескінченний скрол
// Замість кнопки «Load more», можна зробити нескінченне завантаження зображень під час прокручування сторінки. 
// Ми надаємо тобі повну свободу дій в реалізації, можеш використовувати будь-які бібліотеки.

// Повідомлення
// Після першого запиту з кожним новим пошуком отримувати повідомлення, 
// в якому буде написано, скільки всього знайшли зображень (властивість totalHits). 
// Текст повідомлення - "Hooray! We found totalHits images."
