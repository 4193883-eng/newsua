import axios from "axios";
import "./styles/modal.scss";
import "./styles/admin.scss";
import tableRow from "./partials/table_row.hbs";
import {
  activeModal,
  openModal,
  closeModal,
  fetchById,
} from "./scripts/toggleModal";

function fetchGet() {
  axios.get("https://news-ua-api.onrender.com/api/posts").then((res) => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    res.data.items.forEach((item) => {
      const trimmedItem = {
        ...item,
        title: item.title.slice(0, 50),
        thumbnailUrl: item.thumbnailUrl.slice(0, 50),
        body: item.body.slice(0, 50),
      };
      const result = tableRow(trimmedItem);
      tbody.insertAdjacentHTML("afterbegin", result);
    });
    editBtns();
    deleteRow();
  });
}

fetchGet();

function editBtns() {
  const editButtons = document.querySelectorAll(".editBtn");
  const editModal = document.querySelector("#editModal");
  editButtons.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      const targetId = editBtn.dataset.id;
      fetchById(targetId, editModal);
    });
  });
  const editForm = editModal.querySelector("form");
  editForm.addEventListener("click", () => {
    const title = editModal.querySelector("#titleInput").value;
    const body = editModal.querySelector("#bodyTextarea").value;
    const url = editModal.querySelector("#urlInput").value;
    const author = editModal.querySelector("#authorInput").value;
    const targetId = editForm.dataset.id;
    fetchPut(targetId, title, body, author, url);
  });
}

window.addEventListener("load", (e) => {
  editModal.classList.add("transition");
});

const addBtn = document.querySelector("#addbtn");
const addModal = document.querySelector("#addModal");
addBtn.addEventListener("click", () => {
  openModal(addModal);

  const submitBtn = addModal.querySelector("#addSubmitBtn");

  addModal.addEventListener("click", (e) => {
    const closeAddBtn = addModal.querySelector("#closeModalBtn");
    if (
      e.target === closeAddBtn ||
      e.target === closeAddBtn.querySelector("img")
    ) {
      closeModal();
    }
  });
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = addModal.querySelector("#titleInput").value;
    const body = addModal.querySelector("#bodyTextarea").value;
    const url = addModal.querySelector("#urlInput").value;
    const author = addModal.querySelector("#authorInput").value;
    fetchPost(title, body, url, author);
    closeModal();
  });
});

// axios.get("https://news-ua-api.onrender.com/api/posts").then((res) => {
//   console.log(res.data.items);
// });
function fetchPost(title, body, url, author) {
  axios
    .post("https://news-ua-api.onrender.com/api/posts", {
      author: author,
      title: title,
      body: body,
      thumbnailUrl: url,
    })
    .then(() => {
      window.location.reload();
    });
}

function findRowData(id) {
  axios.get(`https://news-ua-api.onrender.com/api/posts/${id}`).then(() => {
    fetchDel(id);
  });
}

function fetchDel(id) {
  axios.delete(`https://news-ua-api.onrender.com/api/posts/${id}`).then(() => {
    window.location.reload();
  });
}

function deleteRow() {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      const targetId = deleteBtn.dataset.id;
      findRowData(targetId);
    });
  });
}

function fetchPut(id, title, body, author, thumbnailUrl) {
  axios
    .put(`https://news-ua-api.onrender.com/api/posts/${id}`, {
      title,
      body,
      author,
      thumbnailUrl,
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

// function isUrl(url) {
//   const changedUrl = url.slice(0, 4);
//   if (changedUrl === "http") {
//     return url;
//   } else {
//   }
// }
