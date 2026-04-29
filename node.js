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

    // Clear message on any input change
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('input', clearMessage);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get values
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

        // ----- VALIDATIONS -----
        
        // Prefix (must be selected)
        if (prefix === '') {
            showMessage('❌ Please select a prefix (Mr./Mrs./Ms./Dr.)', 'error');
            return;
        }
        
        // Full name (min 2 characters)
        if (name === '') {
            showMessage('❌ Please enter your full name', 'error');
            return;
        }
        if (name.length < 2) {
            showMessage('❌ Name must be at least 2 characters', 'error');
            return;
        }
        
        // Password (min 6)
        if (password === '') {
            showMessage('❌ Please enter a password', 'error');
            return;
        }
        if (password.length < 6) {
            showMessage('❌ Password must be at least 6 characters long', 'error');
            return;
        }
        
        // Confirm password match
        if (confirm !== password) {
            showMessage('❌ Passwords do not match', 'error');
            return;
        }
        
        // Gender (required)
        if (gender === '') {
            showMessage('❌ Please select your gender', 'error');
            return;
        }
        
        // Contact number: exactly 10 digits, no letters, no spaces, no symbols
        if (contact === '') {
            showMessage('❌ Please enter your contact number', 'error');
            return;
        }
        const phoneRegex = /^\d{10}$/;   // exactly 10 digits
        if (!phoneRegex.test(contact)) {
            showMessage('❌ Contact number must be exactly 10 digits (0-9 only)', 'error');
            return;
        }
        
        // Email: basic format check
        if (email === '') {
            showMessage('❌ Please enter your email address', 'error');
            return;
        }
        if (!email.includes('@') || !email.includes('.') || email.length < 5) {
            showMessage('❌ Enter a valid email (e.g. name@domain.com)', 'error');
            return;
        }
        
        // Age: 1 to 120
        if (age === '') {
            showMessage('❌ Please enter your age', 'error');
            return;
        }
        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            showMessage('❌ Age must be a number between 1 and 120', 'error');
            return;
        }
        
        // ----- All valid - show success -----
        showMessage(`✅ Registration successful! Welcome ${prefix} ${name}.`, 'success');
        
        // Optional: reset form after success (uncomment if desired)
        // form.reset();
        // document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
    });
});