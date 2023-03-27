import axios from 'axios';
import './styles/modal.scss';
import './styles/admin.scss';
import tableRow from './partials/table_row.hbs';
import { activeModal, openModal, closeModal, fetchById } from './scripts/toggleModal';

// Vars
const editModal = document.querySelector('#editModal');
const addModal = document.querySelector('#addModal');
export const loader = document.querySelector('.loader');

window.addEventListener('load', (e) => {
  editModal.classList.add('transition');
});

// Fetch requests

function fetchGet() {
  loader.classList.add('is-loading');

  axios
    .get('https://news-ua-api.onrender.com/api/posts')
    .then((res) => {
      loader.classList.remove('is-loading');

      const tbody = document.getElementById('tbody');
      tbody.innerHTML = '';

      res.data.items.forEach((item) => {
        const trimmedItem = {
          ...item,
          title: item.title.slice(0, 50),
          thumbnailUrl: item.thumbnailUrl.slice(0, 50),
          body: item.body.slice(0, 50),
        };

        const result = tableRow(trimmedItem);
        tbody.insertAdjacentHTML('afterbegin', result);
      });

      addNews();
      editNews();
      deleteNews();
    })
    .catch((error) => {
      errorMessage(error.message);
    });
}

fetchGet();

function fetchPost(title, body, thumbnailUrl, author) {
  loader.classList.add('is-loading');

  axios
    .post('https://news-ua-api.onrender.com/api/posts', {
      author,
      title,
      body,
      thumbnailUrl,
    })
    .then(() => {
      window.location.reload();
      loader.classList.remove('is-loading');
    })
    .catch((error) => {
      errorMessage(error.message);
    });
}

function fetchPut(id, title, body, author, thumbnailUrl) {
  loader.classList.add('is-loading');

  axios
    .put(`https://news-ua-api.onrender.com/api/posts/${id}`, {
      title,
      body,
      author,
      thumbnailUrl,
    })
    .then(() => {
      window.location.reload();
      loader.classList.remove('is-loading');
    })
    .catch((error) => {
      errorMessage(error.message);
    });
}

function fetchDel(id) {
  loader.classList.add('is-loading');

  axios
    .delete(`https://news-ua-api.onrender.com/api/posts/${id}`)
    .then(() => {
      window.location.reload();
      loader.classList.remove('is-loading');
    })
    .catch((error) => {
      errorMessage(error.message);
    });
}

// Functions

function addNews() {
  const addBtn = document.querySelector('#addbtn');
  addBtn.addEventListener('click', () => {
    openModal(addModal);

    const closeAddBtn = addModal.querySelector('#closeModalBtn');
    closeAddBtn.addEventListener('click', () => {
      closeModal(addModal);
    });
  });

  const addForm = addModal.querySelector('.form-modal');
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const body = e.target.elements.body.value;
    const thumbnailUrl = e.target.elements.thumbnailUrl.value;
    const author = e.target.elements.author.value;

    if (title && body && author) {
      fetchPost(title, body, thumbnailUrl, author);
      closeModal(addModal);
    } else {
      errorMessage('Заповни пусті інпути');
    }
  });
}

function editNews() {
  const editBtns = document.querySelectorAll('.editBtn');
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener('click', () => {
      const targetId = editBtn.dataset.id;
      fetchById(targetId, editModal, editBtns);
      loader.classList.add('is-loading');
    });
  });

  const image = editModal.querySelector('.form-modal__image');
  const urlInput = editModal.querySelector('[name="thumbnailUrl"]');
  urlInput.addEventListener('input', () => {
    image.src = urlInput.value;
  });

  const editForm = editModal.querySelector('.form-modal');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const body = e.target.elements.body.value;
    const thumbnailUrl = e.target.elements.thumbnailUrl.value;
    const author = e.target.elements.author.value;
    const targetId = editForm.dataset.id;

    fetchPut(targetId, title, body, author, thumbnailUrl);
  });
}

function deleteNews() {
  const deleteBtns = document.querySelectorAll('.deleteBtn');

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
      const targetId = deleteBtn.dataset.id;
      fetchDel(targetId);
    });
  });
}

function errorMessage(message) {
  const error = document.querySelector('.error-message');
  const errorMessage = error.querySelector('p');

  errorMessage.innerText = message;
  error.classList.add('is-error');

  setTimeout(() => {
    error.classList.remove('is-error');
    errorMessage.innerText = '';
  }, 5000);
}
