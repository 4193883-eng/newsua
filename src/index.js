import "./newscard.js";
import "./glider/glider.min.css";
import "./glider/glider";
import "./styles/index.scss";
import "./styles/navbar.scss";
// import './styles/newscard.scss'
import { toggleMenu } from "./scripts/navbar";
import { addSlide } from "./scripts/slider";
import moment from "moment";
import slide from "./partials/slide.hbs";
toggleMenu();
//views = 123 id = 1 storyName = 'UFO Spoted on ground' tags = 'hello' timeago = '3 hours'

fetch("https://news-ua-api.onrender.com/api/posts/top")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((post) => {
      addSlide(
        post.views,
        post.id,
        post.title,
        [],
        moment(post.createAt).fromNow(),
        slide,
        post.thumbnailUrl
      );
    });
    let slider = new Glider(document.querySelector(".glider"), {
        draggable: true,
        dots: ".dots",
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next",
        },
        rewind: true,
      });
  });


