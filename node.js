document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('regForm');
    const messageDiv = document.getElementById('message');

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 4000);
        }
    }

    function clearMessage() {
        messageDiv.style.display = 'none';
    }

    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('input', clearMessage);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const prefix = document.getElementById('prefix').value;
        const name = document.getElementById('name').value.trim();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        
        let gender = '';
        const radios = document.querySelectorAll('input[name="gender"]');
        for (let radio of radios) {
            if (radio.checked) {
                gender = radio.value;
                break;
            }
        }
        
        const contact = document.getElementById('contact').value.trim();
        const email = document.getElementById('email').value.trim();
        const age = document.getElementById('age').value;

        // --- Validations ---
        if (prefix === '') {
            showMessage('❌ Please select a prefix (Mr./Mrs./Ms./Dr.)', 'error');
            return;
        }
        if (name === '') {
            showMessage('❌ Please enter your full name', 'error');
            return;
        }
        if (name.length < 2) {
            showMessage('❌ Name must be at least 2 characters', 'error');
            return;
        }
        if (password === '') {
            showMessage('❌ Please enter a password', 'error');
            return;
        }
        if (password.length < 6) {
            showMessage('❌ Password must be at least 6 characters', 'error');
            return;
        }
        if (confirm !== password) {
            showMessage('❌ Passwords do not match', 'error');
            return;
        }
        if (gender === '') {
            showMessage('❌ Please select your gender', 'error');
            return;
        }
        
        // Contact: exactly 10 digits, no letters, no spaces, no symbols
        if (contact === '') {
            showMessage('❌ Please enter your contact number', 'error');
            return;
        }
        const phoneRegex = /^\d{10}$/;   // exactly 10 digits
        if (!phoneRegex.test(contact)) {
            showMessage('❌ Contact number must be exactly 10 digits (0-9 only). No spaces, no +, no letters.', 'error');
            return;
        }
        
        if (email === '') {
            showMessage('❌ Please enter your email', 'error');
            return;
        }
        if (!email.includes('@') || !email.includes('.') || email.length < 5) {
            showMessage('❌ Enter a valid email (e.g. name@domain.com)', 'error');
            return;
        }
        if (age === '') {
            showMessage('❌ Please enter your age', 'error');
            return;
        }
        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            showMessage('❌ Age must be between 1 and 120', 'error');
            return;
        }
        
        // Success
        showMessage(`✅ Registration successful! Welcome ${prefix} ${name}.`, 'success');
        // Optional: uncomment to reset form after success
        // form.reset();
        // document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
    });
});