const welcomeButton = document.getElementById('welcome-btn');
const morningSection = document.getElementById('morning');

welcomeButton.addEventListener('click', () => {
    // Hide the welcome section
    document.querySelector('.welcome').style.display = 'none';
    // Show the morning section
    morningSection.style.display = 'flex';
});