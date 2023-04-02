const fbShareButton = document.querySelector(".fb-share-button");
const copyLinkBtn = document.querySelector(".link-icon");
const pageUrl = window.location.href;

fbShareButton.dataset.href = pageUrl;
copyLinkBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(pageUrl);
});
