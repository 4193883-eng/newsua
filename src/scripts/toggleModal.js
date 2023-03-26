import axios from "axios";

const fetchUrl =
  "https://my-json-server.typicode.com/olehhapuk/news_ua_db/posts/";

export let activeModal = null;
const body = document.body;

// Functions
export function openModal(modalRef) {
  activeModal = modalRef;
  activeModal.classList.add("is-active");
  body.classList.add("is-fixed");
}

export function closeModal() {
  if (activeModal !== null) {
    activeModal.classList.remove("is-active");
    activeModal = null;
    body.classList.remove("is-fixed");
  }
}

// Запит по айді
export function fetchById(targetId, modalRef) {
  axios
    .get(`https://news-ua-api.onrender.com/api/posts/${targetId}`)
    .then((res) => {
      // Відкриття модалки
      openModal(modalRef);

      modalRef.querySelector('[name="title"]').value = res.data.title;
      modalRef.querySelector('[name="body"]').value = res.data.body;
      modalRef.querySelector('[name="thumbnailUrl"]').value =
        res.data.thumbnailUrl;
      modalRef.querySelector(".form-modal__image").src = res.data.thumbnailUrl;
      modalRef.querySelector('[name="author"]').value = res.data.author;
      modalRef.querySelector("#editModalForm").dataset.id = res.data.id;
    });

  // Закриття модалки
  modalRef.addEventListener("click", (e) => {
    const closeModalBtn = modalRef.querySelector("#closeModalBtn");
    if (
      e.target === closeModalBtn ||
      e.target === closeModalBtn.querySelector("img")
    ) {
      closeModal();

      modalRef.querySelector('[name="title"]').value = "";
      modalRef.querySelector('[name="body"]').value = "";
      modalRef.querySelector('[name="thumbnailUrl"]').value = "";
      modalRef.querySelector(".form-modal__image").src = "";
      modalRef.querySelector('[name="author"]').value = "";
      modalRef.querySelector("#editModalForm").dataset.id = "";
    }
  });
}
