import axios from 'axios';
import './styles/modal.scss';
import './styles/admin.scss';
import tableRow from './partials/table_row.hbs';
import { activeModal, openModal, closeModal, fetchById } from './scripts/toggleModal';

// Vars
const editModal = document.querySelector('#editModal');
const addModal = document.querySelector('#addModal');
export const loader = document.querySelector('.loader');
let isActiveTimeout = false;

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

      loadTable(res);
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

function loadTable(res) {
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
}

function addNews() {
  const addBtn = document.querySelector('#addbtn');
  addBtn.addEventListener('click', () => {
    openModal(addModal);

    const closeAddBtn = addModal.querySelector('#closeModalBtn');
    closeAddBtn.addEventListener('click', () => {
      closeModal(addModal);
    });
  });

  const image = addModal.querySelector('.form-modal__image');
  const urlInput = addModal.querySelector('[name="thumbnailUrl"]');
  urlInput.addEventListener('input', () => {
    if (urlInput.value === '') {
      image.src = '';
      return;
    }

    if (!checkURL(urlInput.value)) {
      errorMessage('Невалідне посилання');
    } else {
      console.log('work');
      image.src = urlInput.value;
    }
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
    });
  });

  const image = editModal.querySelector('.form-modal__image');
  const urlInput = editModal.querySelector('[name="thumbnailUrl"]');
  urlInput.addEventListener('input', () => {
    if (urlInput.value === '') {
      image.src = '';
      return;
    }

    if (!checkURL(urlInput.value)) {
      errorMessage('Невалідне посилання');
    } else {
      console.log('work');
      image.src = urlInput.value;
    }
  });

  const editForm = editModal.querySelector('.form-modal');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const body = e.target.elements.body.value;
    const thumbnailUrl = e.target.elements.thumbnailUrl.value;
    const author = e.target.elements.author.value;
    const targetId = editForm.dataset.id;

    if (title && body && author) {
      fetchPut(targetId, title, body, author, thumbnailUrl);
    } else {
      errorMessage('Заповни пусті інпути');
    }
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
  if (isActiveTimeout) {
    return;
  }
  const error = document.querySelector('.error-message');

  isActiveTimeout = true;
  error.innerText = message;
  error.classList.add('is-error');

  setTimeout(() => {
    error.classList.remove('is-error');
    error.innerText = '';
    isActiveTimeout = false;
  }, 5000);
}

function checkURL(url) {
  var regURL =
    /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
  return regURL.test(url);
}
