document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const formCard = document.getElementById('formCard');
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');
    
    // Rotation function with color transition
    function rotateToRegister() {
        formCard.classList.add('rotate');
        setTimeout(() => {
            loginPanel.style.display = 'none';
            registerPanel.style.display = 'block';
            // remove rotation after flip to keep it steady
            setTimeout(() => {
                formCard.classList.remove('rotate');
            }, 100);
        }, 400); // half of transition duration
    }
    
    function rotateToLogin() {
        formCard.classList.add('rotate');
        setTimeout(() => {
            registerPanel.style.display = 'none';
            loginPanel.style.display = 'block';
            setTimeout(() => {
                formCard.classList.remove('rotate');
            }, 100);
        }, 400);
    }
    
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        rotateToRegister();
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        rotateToLogin();
    });
    
    // ---- LOGIN form handler (basic example) ----
    const loginForm = document.getElementById('loginForm');
    const loginMsg = document.getElementById('loginMessage');
    
    function showLoginMessage(msg, type) {
        loginMsg.textContent = msg;
        loginMsg.className = 'message ' + type;
        loginMsg.style.display = 'block';
        if (type === 'success') setTimeout(() => loginMsg.style.display = 'none', 3000);
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const pwd = document.getElementById('loginPassword').value;
        if (!username || !pwd) {
            showLoginMessage('Please enter both username and password', 'error');
            return;
        }
        // Dummy success (replace with real auth)
        showLoginMessage('✅ Login successful! (Demo)', 'success');
    });
    
    // ---- REGISTRATION form handler (full validation + contact number fix) ----
    const regForm = document.getElementById('regForm');
    const regMsg = document.getElementById('registerMessage');
    
    function showRegMessage(msg, type) {
        regMsg.textContent = msg;
        regMsg.className = 'message ' + type;
        regMsg.style.display = 'block';
        if (type === 'success') setTimeout(() => regMsg.style.display = 'none', 3000);
    }
    
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const prefix = document.getElementById('prefix').value;
        const name = document.getElementById('name').value.trim();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        let gender = '';
        const radios = document.querySelectorAll('input[name="gender"]');
        for (let r of radios) if (r.checked) { gender = r.value; break; }
        const contact = document.getElementById('contact').value.trim();
        const email = document.getElementById('email').value.trim();
        const age = document.getElementById('age').value;
        
        if (!prefix) { showRegMessage('Select prefix', 'error'); return; }
        if (name.length < 2) { showRegMessage('Name at least 2 chars', 'error'); return; }
        if (password.length < 6) { showRegMessage('Password min 6 chars', 'error'); return; }
        if (password !== confirm) { showRegMessage('Passwords do not match', 'error'); return; }
        if (!gender) { showRegMessage('Select gender', 'error'); return; }
        
        // STRICT contact validation: only digits, spaces, +, -  (no letters)
        const phoneRegex = /^[0-9\s\+\-]{6,15}$/;
        if (!phoneRegex.test(contact)) {
            showRegMessage('Contact: only digits, spaces, + or - (6-15 chars). No letters.', 'error');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) { showRegMessage('Valid email required', 'error'); return; }
        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) { showRegMessage('Age 1-120', 'error'); return; }
        
        showRegMessage(`✅ Registration successful! Welcome ${prefix} ${name}.`, 'success');
        // Optionally reset form
        // regForm.reset();
    });
});