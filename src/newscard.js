import './styles/newscard.scss';
import newscard from './partials/newscard.hbs';

let url = "https://my-json-server.typicode.com/olehhapuk/news_ua_db/posts";
const refs = {
  cardList: document.querySelector('.card__list'),
};

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(description => description.body = cutText(description.body));
    data.forEach(date => date.createdAt = formatDate(date.createdAt));
    renderNewsCard(data);
  })
  .catch(error => console.error(error));

function renderNewsCard(data) {
  const render = data.map(newscard).join('');
  refs.cardList.insertAdjacentHTML('beforeend', render)
}

function cutText(text) {
  const shortText = text.slice(0, 200);
  return shortText + '...';
}

function formatDate(date) {
  const diff = new Date() - new Date(date);
  if (diff < 1000) {
    return 'right now';
  }
  if (diff < 1000 * 60) {
    return Math.floor(diff / 1000) + 'seconds ago';
  }
  if (diff < 1000 * 60 * 60) {
    return Math.floor(diff / 1000 / 60) + ' minutes ago';
  }
  if (diff < 1000 * 60 * 60 * 24) {
    return Math.floor(diff / 1000 / 60 / 60) + ' hours ago';
  }
  if (diff < 1000 * 60 * 60 * 24 * 7) {
    return Math.floor(diff / 1000 / 60 / 60 / 24) + ' days ago';
  }
  if (diff < 1000 * 60 * 60 * 24 * 7 * 4) {
    return Math.floor(diff / 1000 / 60 / 60 / 24 / 7) + ' weeks ago';
  }
  if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 12) {
    return Math.floor(diff / 1000 / 60 / 60 / 24 / 7 / 4) + ' months ago';
  }
  return Math.floor(diff / 1000 / 60 / 60 / 24 / 7 / 4 / 12) + ' years ago';  
}
