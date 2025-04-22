function isCommonPassword(password) {
    const commonPasswords = [
        "password", "123456789", "12345678", "88888888",
        "12345678910", "abc123", "1234", "111111", "222222222"
    ];
    return commonPasswords.includes(password);
}

let lastResult = '';

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const feedbackArea = document.getElementById('feedbackArea');
    let feedback = '';

    if (password.length < 8) {
        feedback = "❌ Password must be at least 8 characters long.";
        lastResult = "Weak";
    } else {
        let hasUpper = /[A-Z]/.test(password);
        let hasLower = /[a-z]/.test(password);
        let hasDigit = /\d/.test(password);
        let hasSpecial = /[!@#$%^&*(),.?\":{}|<>]/.test(password);

        if (isCommonPassword(password)) {
            feedback = " Password is too common";
            lastResult = "Weak";
        } else if (hasUpper && hasLower && hasDigit && hasSpecial) {
            feedback = "✅ Password is strong!";
            lastResult = "Strong";
        } else if ((hasUpper || hasLower) && hasDigit && hasSpecial) {
            feedback = "⚠️ Password could be stronger by including a mix of uppercase, lowercase, digits, and special characters.";
            lastResult = "Secure";
        } else {
            feedback = "❌ Password needs improvement.";
            lastResult = "Weak";
        }
    }

    feedbackArea.innerHTML = `<p>Status: <strong>${lastResult}</strong><br>${feedback}</p>`;

    if (lastResult === "Weak" || lastResult === "Secure") {
        document.getElementById('changeBox').style.display = 'block';
        document.getElementById('finalMessage').innerHTML = '';
    } else {
        document.getElementById('changeBox').style.display = 'none';
        document.getElementById('finalMessage').innerHTML = '🎉 Congrats! Your password has been successfully saved.';
    }
}

function handleUserChoice(choice) {
    const mainContainer = document.getElementById('mainContainer');
    const finalMessage = document.getElementById('finalMessage');

    if (choice === "no") {
        // Hide everything except the final congrats
        mainContainer.innerHTML = `<h2>🎉 Congrats! Your password has been successfully saved.</h2>`;
    } else if (choice === "yes") {
        document.getElementById('passwordInput').value = '';
        document.getElementById('feedbackArea').innerHTML = '';
        document.getElementById('changeBox').style.display = 'none';
        finalMessage.innerHTML = "📝 Please enter your new password!";
    }
}