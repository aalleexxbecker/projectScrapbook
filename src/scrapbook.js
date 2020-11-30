const formTitle = document.getElementsByClassName('form-control')[1];
const formText = document.getElementsByClassName('form-control')[2];
const formAuthor = document.getElementsByClassName('form-control')[3];
var editing = null;
const newScrap = document.getElementsByClassName('container')[2];
const headerHome = document.getElementsByClassName('container-fluid')[0];
const error = document.getElementsByClassName('alert-danger')[0];
const success = document.getElementsByClassName('alert-success')[0];
const scrapContainer = document.getElementsByClassName('scraps')[0];
const scrapScreen = document.getElementsByClassName('scrapsHere')[0];

class Scrapbook {
    swapScreen(event) {
        newScrap.classList.toggle('d-none');
        headerHome.classList.toggle('d-none');
        scrapContainer.classList.add('d-none');
    }
    saveScrap(event) {
        let ok = true;
        this.resetErrors();
    
            if (formTitle.value === '') {
                formTitle.classList.add('border-danger');
                error.classList.remove('d-none');
                ok = false;
            }
            if (formText.value === '') {
                formText.classList.add('border-danger');
                error.classList.remove('d-none');
                ok = false;
            }
            if (formAuthor.value === '') {
                formAuthor.classList.add('border-danger');
                error.classList.remove('d-none');
                ok = false;
            }
            if (ok === false) {
                error.classList.remove('d-none');
            } else {
                if (editing !== null){
                    this.edit();
                } else{
                this.addScrap();
                success.classList.remove('d-none');
                }
                setTimeout(function (){
                    success.classList.add('d-none')
                },1500)
            }
    }
    resetErrors() {
        formTitle.classList.remove('border-danger');
        formText.classList.remove('border-danger');
        formAuthor.classList.remove('border-danger');
        error.classList.add('d-none')
    }
    clearFields() {
        formTitle.value = '';
        formText.value = '';
        formAuthor.value = '';
    }
    backHome(event) {
        newScrap.classList.toggle('d-none');
        headerHome.classList.toggle('d-none');
        scrapContainer.classList.remove('d-none');
        this.clearFields();
        this.resetErrors();
    }
    addScrap() {
        var card = `<div class="row mt-1">
                        <i class="fas fa-pencil-alt text-success offset-9 btn-edit"></i>
                        <i class="far fa-trash-alt text-warning offset-1 btn-remove"></i> 
                    </div>
                    <div class="row">
                        <div class="col-12 text-warning card-title">${formTitle.value}</div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-white text-justify mt-1 card-text">${formText.value}</div>
                    </div>
                    <div class="row text-right mt-1">
                        <div class="col-12 text-success font-italic card-author">${formAuthor.value}</div>
                    </div>`;
        var scrap = document.createElement('div');
        scrap.setAttribute('class', 'card col-3 border-danger');
        scrap.innerHTML = card;
        scrapScreen.appendChild(scrap);
        this.addEvent();
        this.resetErrors();
        this.clearFields();
    }
    addEvent() {
        for(let btn of document.getElementsByClassName('fa-pencil-alt')) {
            btn.addEventListener('click', event => {
                event.preventDefault();
                this.setEditEvent(event);
            })
        }
        for(let btn of document.getElementsByClassName('fa-trash-alt')) {
            btn.addEventListener('click', event => {
                event.preventDefault();
                this.removeCard(event);
            })
        }
    }
    setEditEvent(event) {
        this.swapScreen(event);
        editing = event.target.parentNode.parentNode;
        formTitle.value = editing.getElementsByClassName('card-title')[0].innerHTML;
        formText.value = editing.getElementsByClassName('card-text')[0].innerHTML;
        formAuthor.value = editing.getElementsByClassName('card-author')[0].innerHTML;
    }  
    edit() {
        editing.getElementsByClassName('card-title')[0].innerHTML = formTitle.value;
        editing.getElementsByClassName('card-text')[0].innerHTML = formText.value;
        editing.getElementsByClassName('card-author')[0].innerHTML = formAuthor.value;
        editing = null; 
        this.backHome(event);
    }
    removeCard(event) {
        editing = event.target.parentNode.parentNode;
        editing.remove();
        editing = null;
    }
    searching(event) {
        let exist = false;
        for (let scrap of document.getElementsByClassName('card')) {
            if (scrap.getElementsByClassName('card-title')[0].innerText.toUpperCase().includes(event.target.value.toUpperCase())) {
                exist = true;
            } 
            if (scrap.getElementsByClassName('card-text')[0].innerText.toUpperCase().includes(event.target.value.toUpperCase())) {
                exist = true;
            } 
            if (scrap.getElementsByClassName('card-author')[0].innerText.toUpperCase().includes(event.target.value.toUpperCase())) {
                exist = true;
            }
            if (!exist) {
                scrap.classList.add('d-none');
            } else {
                scrap.classList.remove('d-none');
            }
        }
    }
}

export default Scrapbook;