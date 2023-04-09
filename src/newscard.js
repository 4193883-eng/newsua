import './styles/newscard.scss';
import "./scripts/navbar";
import newscard from './partials/newscard.hbs';

let url = "https://news-ua-api.onrender.com/api/posts";
const refs = {
  cardList: document.querySelector('.card__list'),
  navbarForm: document.querySelector('.navbar_search'),
  navbarInput: document.querySelector('.navbar_search_input'),
  loaderWrapper: document.querySelector('.loader-wrapper'),
};

refs.navbarForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault(); 
  const value = refs.navbarInput.value;
  const query = `?q=${value}`;
  refs.cardList.innerHTML = "";
  getNews(query);
}

async function getNews(query) {
  try {
    const response = await fetch(url + query);
    const data = await response.json();
    const news = data.items;
    news.forEach(newsDesc => newsDesc.body = cutText(newsDesc.body));
    news.forEach(newsDate => newsDate.createdAt = formatDate(newsDate.createdAt));
    renderNewsCard(news);
    refs.loaderWrapper.style.display = 'none';
  } catch (error) {
    refs.cardList.insertAdjacentHTML('beforeend', `<div class="error">Упс, помилка ${error}</div>`);
    refs.loaderWrapper.style.display = 'none';
  }
}

getNews("");

function renderNewsCard(data) {
  const render = data.map(newscard).join('');
  if (data.length === 0) {
    refs.cardList.insertAdjacentHTML('beforeend', '<div class="no__news">Результатів немає.</div>');
    return;
  }
  refs.cardList.insertAdjacentHTML('beforeend', render)
}

function cutText(text) {
  const shortText = text.slice(0, 200);
  return shortText + '...';
}

export function formatDate(date) {
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