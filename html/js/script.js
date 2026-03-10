// Send ready signal
fetch('http://esx_identity/ready', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
});

// Listen for messages from client
window.addEventListener('message', (event) => {
    if (event.data.type === 'enableui') {
        document.body.style.display = event.data.enable ? 'block' : 'none';
    }
});

// Update height value
const heightInput = document.getElementById('height');
const heightValue = document.getElementById('height-value');

heightInput.addEventListener('input', () => {
    heightValue.textContent = heightInput.value;
});

// Sex is handled by radio buttons

// Handle form submission
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const data = {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        dateofbirth: formatDate(formData.get('dateofbirth')),
        sex: formData.get('sex'),
        height: formData.get('height')
    };

    fetch('http://esx_identity/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    registerForm.reset();
    heightValue.textContent = '170';
});

// Format date from yyyy-mm-dd to dd/mm/yyyy
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
