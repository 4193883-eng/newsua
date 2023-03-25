import "./styles/newspage.scss";
import "./styles/ad.scss";
import "./styles/footer.scss";
import "./styles/navbar.scss";
import axios from "axios";

const searchParam = new URLSearchParams(location.search);
console.log(searchParam.get("id"));

const pageId = searchParam.get("id");

axios
  .get(`https://news-ua-api.onrender.com/api/posts/${pageId}`)
  .then((res) => {
    const items = {
      bgimg: document.querySelector(".prev"),
      prevTitle: document.querySelector(".prev_title"),
      author: document.querySelector("#author"),
      views: document.querySelector(".views"),
      body: document.querySelector(".text--info"),
    };
    const page = res.data;
    items.bgimg.style.background = `url(${page.thumbnailUrl}) no-repeat center`;
    items.prevTitle.innerHTML = page.title;
    items.author.innerHTML = page.author;
    items.views.innerHTML = `${page.views} views`;
    items.body.innerHTML = page.body;
    console.log(res.data.items);
  });
