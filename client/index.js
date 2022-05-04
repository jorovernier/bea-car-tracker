const fButt = document.getElementById('fortuneButton');

const carForm = document.getElementById('car-form');
const carSec = document.getElementById('cars');

const make = document.getElementById('make-in');
const model = document.getElementById('model-in');
const year = document.getElementById('year-in');
const color = document.getElementById('color-in');

function getFortune(){
    axios.get('http://localhost:4000/api/fortune').then(res => {
        alert(res.data);
    })
}

function editCar(e){
    e.preventDefault();
    let field = e.srcElement.accessKey;
    let content = e.srcElement.name;
    document.getElementById(`edit-select-${this.id}`).selectedIndex = 0;
    document.getElementById(`edit-input-${this.id}`).value = '';
    if(field === 'color'){
        document.getElementById(`car-card-${this.id}`).style.backgroundColor = content.toLowerCase();
        if(content === 'white'){
            document.getElementById(`car-card-${this.id}`).style.color = 'black';
        } else {
            document.getElementById(`car-card-${this.id}`).style.color = 'white';
        }
    }
    axios.put(`http://localhost:4000/api/cars/${this.id}`, {field, content}).then(res => {
        let selectedP = document.getElementById(field+this.id);
        selectedP.innerHTML = res.data;
    })
}

function deleteCar(id){
    axios.delete(`http://localhost:4000/api/cars/${id}`).then(res => {
        alert(res.data);
        document.getElementById(`car-card-${id}`).remove();
    })
}

function addCar(e){
    e.preventDefault();
    let newCar = {
        make: make.value,
        model: model.value,
        year: year.value,
        color: color.value
    }

    axios.post('http://localhost:4000/api/cars', newCar).then(res => {
        const car = res.data;
        let id = car.id;
        const carCard = document.createElement('div');
        carCard.setAttribute('id', `car-card-${id}`);
        for(let i = 1; i < Object.keys(car).length; i++){
            let pTag = document.createElement('p');
            pTag.setAttribute('id', Object.keys(car)[i]+id);
            pTag.innerHTML = Object.entries(car)[i][1];
            carCard.appendChild(pTag);
        }

        const editForm = document.createElement('form');
        const editSel = document.createElement('select');
        editSel.setAttribute('id', `edit-select-${id}`);
        const disable = document.createElement('option');
        disable.innerHTML = 'Select';
        disable.selected = true;
        disable.disabled = true;
        editSel.appendChild(disable);
        const editInput = document.createElement('input');
        editInput.placeholder = 'Fix it';
        editInput.type = 'text';
        editInput.setAttribute('id', `edit-input-${id}`);
        const editButt = document.createElement('button');
        editButt.innerHTML = 'Edit';

        for(let i = 1; i < Object.keys(car).length; i++){
            let option = document.createElement('option');
            option.value = Object.keys(car)[i];
            option.innerHTML = Object.keys(car)[i];
            editSel.appendChild(option);
        }

        editSel.onchange = function (){
            let index = editSel.options.selectedIndex;
            editSel.parentElement.accessKey = editSel.options[index].value;
        };

        editInput.onchange = function (){
            let text = editInput.value;
            editInput.parentElement.name = text;
        }

        editForm.appendChild(editSel);
        editForm.appendChild(editInput);
        editForm.appendChild(editButt);
        editForm.setAttribute('id', id);
        carCard.appendChild(editForm);

        editForm.addEventListener('submit', editCar)

        const delButt = document.createElement('button');
        delButt.setAttribute('id', `del-butt-${id}`)
        delButt.innerHTML = 'X';
        carCard.appendChild(delButt);

        delButt.addEventListener('click', () => {deleteCar(id)})

        carCard.style.backgroundColor = car.color;
        carCard.style.borderRadius = '5px';
        carCard.style.color = 'white';

        carSec.appendChild(carCard);
    })
    make.value = '';
    model.value = '';
    year.value = '';
    color.value = '';
}


fButt.addEventListener('click', getFortune);
carForm.addEventListener('submit', addCar);