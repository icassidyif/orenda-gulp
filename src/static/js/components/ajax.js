export default async function sendData (form) {
    function showSuccessModal () {
        const successModal = document.querySelector('#success');
        const body = document.querySelector('body');
        successModal.classList.add('show');
        body.classList.add('lock');
    }
    function showErrorModal () {
        const errorModal = document.querySelector('#error');
        const body = document.querySelector('body');
        errorModal.classList.add('show');
        body.classList.add('lock');
    }


    const formData = new FormData(form);
    const url = 'https://example.com/profile';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Response:', JSON.stringify(json));
        showSuccessModal();

    } catch (error) {
        console.error('Error:', error);
        showErrorModal();
    }

}