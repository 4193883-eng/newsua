const fetchUrl = 'https://my-json-server.typicode.com/olehhapuk/news_ua_db/posts/';

export let activeModal = null;
const body = document.body;

// Functions
export function openModal(modalRef) {
  activeModal = modalRef;
  activeModal.classList.add('is-active');
  body.classList.add('is-fixed');
}

export function closeModal() {
  if (activeModal !== null) {
    activeModal.classList.remove('is-active');
    activeModal = null;
    body.classList.remove('is-fixed');
  }
}

// Запит по айді
export function fetchById(targetId, modalRef) {
  fetch(`https://my-json-server.typicode.com/olehhapuk/news_ua_db/posts/${targetId}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // Відкриття модалки
      openModal(modalRef);

      modalRef.querySelector('[name="title"]').value = data.title;
      modalRef.querySelector('[name="body"]').value = data.body;
      modalRef.querySelector('[name="thumbnailUrl"]').value = data.thumbnailUrl;
      modalRef.querySelector('.form-modal__image').value = data.thumbnailUrl;
    });

  // Закриття модалки
  modalRef.closeEditModalBtn.addEventListener('click', () => {
    closeModal();

    modalRef.querySelector('[name="title"]').value = '';
    modalRef.querySelector('[name="body"]').value = '';
    modalRef.querySelector('[name="thumbnailUrl"]').value = '';
    modalRef.querySelector('.form-modal__image').value = '';
  });
}
