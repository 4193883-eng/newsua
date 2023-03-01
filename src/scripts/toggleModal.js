// Vars

const modalRefs = {
  modals: document.querySelectorAll('.modal'),
  modalTogglers: document.querySelectorAll('#modalToggler'),
};

let activeModal = null;

// Functions

function findModal(id) {
  return document.querySelector(`#${id}`);
}

function openModal(modal) {
  activeModal = modal;
  activeModal.classList.add('active');
}

function closeModal() {
  if (activeModal !== null) {
    activeModal.classList.remove('active');
    activeModal = null;
  }
}

// Event listeners

modalRefs.modalTogglers.forEach((modalToggler) => {
  modalToggler.addEventListener('click', (e) => {
    // Open modal
    const togglerId = e.target.dataset.target;
    const modal = findModal(togglerId);
    openModal(modal);

    // Close modal click on closeModalBtn
    const closeModalBtn = modal.querySelector('#closeModalBtn');
    closeModalBtn.addEventListener('click', (e) => {
      closeModal();
    });

    // Close modal by click on background
    modal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    });
  });
});

// Close modal by press Escape
window.addEventListener('keyup', (e) => {
  if (e.code === 'Escape' && activeModal !== null) {
    closeModal();
  }
});
