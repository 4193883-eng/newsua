import './newscard.js';
import './glider/glider.min.css'
import './glider/glider'
import './styles/index.scss';
import './styles/navbar.scss';
// import './styles/newscard.scss'
import {toggleMenu} from './scripts/navbar';
import {addSlide} from "./scripts/slider";

import slide from './partials/slide.hbs';

//views = 123 id = 1 storyName = 'UFO Spoted on ground' tags = 'hello' timeago = '3 hours'
for(let i = 0; i < 10; i++ ) {
    addSlide(123, 12, 'Hello', ['hello', 'world'], '3 hours', slide)
}
document.querySelector('.navbar_hamburger').addEventListener('click', () => {
    toggleMenu()
})


let slider = new Glider(document.querySelector('.glider'), {
    draggable:true,
    dots: '.dots',
    arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
    },
    rewind: true,
});
