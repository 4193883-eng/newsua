import './newscard.js';
import './glider/glider.min.css'
import './glider/glider'
import './styles/index.scss';

import slide from './partials/slide.hbs';

//views = 123 id = 1 storyName = 'UFO Spoted on ground' tags = 'hello' timeago = '3 hours'

let sliderDiv = document.querySelector('.glider');

sliderDiv.insertAdjacentHTML('beforeend', slide({
    views:123,
    id:1,
    storyName:'sddfs',
    tags:['hello', 'world'],
    timeago:'hello'
}))
sliderDiv.insertAdjacentHTML('beforeend', slide({
    views:123,
    id:1,
    storyName:'sddfs',
    tags:['hello', 'world'],
    timeago:'hello'
}))
sliderDiv.insertAdjacentHTML('beforeend', slide({
    views:123,
    id:1,
    storyName:'sddfs',
    tags:['hello', 'world'],
    timeago:'hello'
}))


let slider = new Glider(document.querySelector('.glider'), {
    draggable:true,
    dots: '.dots',
    arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
    }
});
