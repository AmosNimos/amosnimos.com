document.getElementById('startForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const playerName = document.getElementById('playerName').value;

    if (playerName.trim() === '') {
        alert('Please enter your name to continue.');
        return;
    }

    // Store player name and redirect to the next page (this can be expanded later)
    sessionStorage.setItem('playerName', playerName);

    // Simulate the satirical flow with a fake "loading" and then redirect
    alert(`Welcome, ${playerName}! Loading next steps...`);
    window.location.href = 'nextpage.html'; // You can create additional pages or steps later
});
