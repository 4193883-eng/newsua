import {formatDate} from "../newscard";

export function addSlide(
    views,
    id,
    storyName,
    tags,
    timeago, slideHbs, thumbnailUrl){

    document.querySelector('.glider').insertAdjacentHTML('beforeend',slideHbs({
        views:views,
        id:id,
        storyName:storyName,
        tags:tags,
        timeago:timeago,
        thumbnailUrl
    }))
}

//views = 123 id = 1 storyName = 'UFO Spoted on ground' tags = 'hello' timeago = '3 hours'