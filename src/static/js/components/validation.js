import Pristine from "pristinejs/dist/pristine";
import formData from './form';
import sendData from "./ajax";

let defaultConfig = {
    // class of the parent element where the error/success class is added
    classTo: 'form-control',
    errorClass: 'has-danger',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    //errorTextParent: 'form-control',
    // type of element to create for the error text
    //errorTextTag: 'div',
    // class of the error text element
    //errorTextClass: 'text-error'
};

if (document.querySelectorAll('.filter').length > 0) {
    const filters = document.querySelectorAll('.filter');
    filters.forEach(filter => {
        const pristine = new Pristine(filter, defaultConfig);

        filter.addEventListener('submit', function (e) {
            e.preventDefault();
            //Validate ranges
            const floors = filter.querySelectorAll('input[type="number"][name="floor"]');
            const prices = filter.querySelectorAll('input[type="number"][name="price"]');
            const squares = filter.querySelectorAll('input[type="number"][name="square"]');

            //PRICES VALIDATE
            prices.forEach((price, idx) => {
                pristine.addValidator(price, value => {
                    if (idx === 1) {
                        if (parseInt(value) > parseInt(prices[idx - 1].value) ||
                            prices[idx - 1].value === '' ||
                            value === '') {
                            return true;
                        } else return false;
                    }
                    return true;
                }, '', 2, false);
            })

            floors.forEach((floor, idx) => {
                pristine.addValidator(floor, value => {
                    if (idx === 1) {
                        if (parseInt(value) >= parseInt(floors[idx - 1].value) ||
                            floors[idx - 1].value === '' ||
                            value === '') {
                            return true;
                        } else return false;
                    }
                    return true;
                }, '', 3, false);
            })

            squares.forEach((square, idx) => {
                pristine.addValidator(square, value => {
                    if (idx === 1) {
                        if (parseInt(value) >= parseInt(squares[idx - 1].value) ||
                            squares[idx - 1].value === '' ||
                            value === '') {
                            return true;
                        } else return false;
                    }
                    return true;
                }, '', 3, false);
            })

            const valid = pristine.validate();
            if(valid) {
                console.log('Form is valid!');
                formData();
            } else  {
                console.log('Form is invalid!!!!');
            }
        });
    })
}


// Validate
const forms = document.querySelectorAll('.form');
if (forms.length > 0) {
    forms.forEach(form => {
        const pristine = new Pristine(form, defaultConfig);
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const phone = form.querySelector('input[name="phone"]');
            const date = form.querySelector('input[type="date"]');
            const regPhone = /^[0-9()-.\s]+$/;

            //validate phone
            pristine.addValidator(phone, (value) => {
                if (!value.match(regPhone)) {
                    return false;
                } else return true;
            }, 'error', 2, false);

            //validate date
            if (date) {
                pristine.addValidator(date, value => {
                    const inputDate = new Date(value);
                    const today = new Date();
                    if (inputDate >= today) {
                        return true;
                    }
                    else return false;
                }, 'error', 3 , false);
            }


            const valid = pristine.validate();
            if(valid) {
                console.log('Form is valid!');
                const popup = form.closest('.modal-container');
                const body = document.querySelector('body');
                popup.classList.remove('show');
                body.classList.remove('lock');
                await sendData(form);
            } else  {
                console.log('Form is invalid!');
            }
        })
    })
}











