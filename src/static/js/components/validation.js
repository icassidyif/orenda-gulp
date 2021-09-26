import Pristine from "pristinejs/dist/pristine";
import formData from './form';

let defaultConfig = {
    // class of the parent element where the error/success class is added
    classTo: 'form-control',
    errorClass: 'has-danger',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-control',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-error'
};

if (document.querySelectorAll('.filter').length > 0) {
    const filters = document.querySelectorAll('.filter');
    filters.forEach(filter => {
        const pristine = new Pristine(filter, defaultConfig);
        filter.addEventListener('submit', function (e) {
            e.preventDefault();
            const valid = pristine.validate();
            console.log('Form is valid!');
            if(valid) {
                formData();
            } else  {
                console.log('Form is invalid!');
            }
        });
    })

}







