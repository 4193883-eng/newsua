import $ from "jquery";

window.jQuery = $
window.jquery = $
window.$ = $

import './slick/slick.min'
import './slick/slick.scss'
import './slick/slick-theme.scss'
// core version + navigation, pagination modules:
// import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import './styles/index.scss';

import slide from './partials/slide.hbs';
// init Swiper:
// const swiper = new Swiper('.swiper', {
//     // configure Swiper to use modules
//     modules: [Navigation, Pagination],
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable:true,
//     },
//     loop:true,
// });

//views = 123 id = 1 storyName = 'UFO Spoted on ground' tags = 'hello' timeago = '3 hours'

let sliderDiv = $('.slider');

sliderDiv.slick({
    arrows: true,
    dots: true,
})

// sliderDiv.slickAdd(slide({
//     views: 1233,
//     id: 'a1',
//     storyName: 'Lorem ipsum',
//     tags: ['tag1', 'tag2'],
//     timeago: '3 hours'
// }))