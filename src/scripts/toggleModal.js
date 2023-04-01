import axios from 'axios';
import { loader } from '../admin.js';

export let activeModal = null;
const body = document.body;

// Functions
export function openModal(modal) {
  activeModal = modal;
  modal.classList.add('is-active');
  body.classList.add('is-fixed');
}

export function closeModal(modal) {
  if (activeModal !== null) {
    modal.classList.remove('is-active');
    activeModal = null;
    body.classList.remove('is-fixed');
  }
}

// Запит по айді
export function fetchById(targetId, modal, btns) {
  loader.classList.add('is-loading');
  btns.forEach((btn) => {
    btn.disabled = true;
  });

  // Відкриття модалки
  axios.get(`https://news-ua-api.onrender.com/api/posts/${targetId}`).then((res) => {
    loader.classList.remove('is-loading');

    modal.querySelector('[name="title"]').value = res.data.title;
    modal.querySelector('[name="body"]').value = res.data.body;
    modal.querySelector('[name="thumbnailUrl"]').value = res.data.thumbnailUrl;
    modal.querySelector('.form-modal__image').src = res.data.thumbnailUrl;
    modal.querySelector('[name="author"]').value = res.data.author;
    modal.querySelector('.form-modal').dataset.id = res.data.id;

    openModal(modal);
  });

  // Закриття модалки
  modal.addEventListener('click', (e) => {
    const closeModalBtn = modal.querySelector('#closeModalBtn');
    if (e.target === closeModalBtn || e.target === closeModalBtn.querySelector('img')) {
      closeModal(modal);

      modal.querySelector('[name="title"]').value = '';
      modal.querySelector('[name="body"]').value = '';
      modal.querySelector('[name="thumbnailUrl"]').value = '';
      modal.querySelector('.form-modal__image').src = '';
      modal.querySelector('[name="author"]').value = '';
      modal.querySelector('.form-modal').dataset.id = '';

      btns.forEach((btn) => {
        btn.disabled = false;
      });
    }
  });
}
