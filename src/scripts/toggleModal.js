import axios from 'axios';
import { loader } from '../admin.js';

const fetchUrl = 'https://my-json-server.typicode.com/olehhapuk/news_ua_db/posts/';

export let activeModal = null;
const body = document.body;

// Functions
export function openModal(modalRef) {
  activeModal = modalRef;
  modalRef.classList.add('is-active');
  body.classList.add('is-fixed');
}

export function closeModal(modalRef) {
  if (activeModal !== null) {
    modalRef.classList.remove('is-active');
    activeModal = null;
    body.classList.remove('is-fixed');
  }
}

// Запит по айді
export function fetchById(targetId, modalRef, btns) {
  btns.forEach((btn) => {
    btn.disabled = true;
  });

  // Відкриття модалки
  axios.get(`https://news-ua-api.onrender.com/api/posts/${targetId}`).then((res) => {
    loader.classList.remove('is-loading');

    modalRef.querySelector('[name="title"]').value = res.data.title;
    modalRef.querySelector('[name="body"]').value = res.data.body;
    modalRef.querySelector('[name="thumbnailUrl"]').value = res.data.thumbnailUrl;
    modalRef.querySelector('.form-modal__image').src = res.data.thumbnailUrl;
    modalRef.querySelector('[name="author"]').value = res.data.author;
    modalRef.querySelector('.form-modal').dataset.id = res.data.id;

    openModal(modalRef);
  });

  // Закриття модалки
  modalRef.addEventListener('click', (e) => {
    const closeModalBtn = modalRef.querySelector('#closeModalBtn');
    if (e.target === closeModalBtn || e.target === closeModalBtn.querySelector('img')) {
      modalRef.querySelector('[name="title"]').value = '';
      modalRef.querySelector('[name="body"]').value = '';
      modalRef.querySelector('[name="thumbnailUrl"]').value = '';
      modalRef.querySelector('.form-modal__image').src = '';
      modalRef.querySelector('[name="author"]').value = '';
      modalRef.querySelector('.form-modal').dataset.id = '';

      closeModal(modalRef);
      btns.forEach((btn) => {
        btn.disabled = false;
      });
    }
  });
}
