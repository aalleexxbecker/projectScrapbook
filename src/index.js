import Scrapbook from './scrapbook';

const btn = document.getElementsByClassName('btn');
const inputSearch = document.getElementsByClassName('form-control')[0];

const scrapbook = new Scrapbook();

inputSearch.addEventListener('keyup', event => {
    scrapbook.searching(event);
})
btn[0].addEventListener('click', event => {
    event.preventDefault();
    scrapbook.swapScreen(event);
})
btn[1].addEventListener('click', event => {
    event.preventDefault();
    scrapbook.backHome(event);
})
btn[2].addEventListener('click', event => {
    event.preventDefault();
    scrapbook.saveScrap(event);
})