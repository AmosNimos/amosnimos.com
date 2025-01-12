/**
 * A reusable function to handle page transitions on button clicks.
 * @param {string} nextPage - The URL of the next page to redirect to after the button is clicked.
 */
function SetNextPage(nextPage) {
    const buttons = document.querySelectorAll('#next_page, .next_page'); // Select both id and class

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate the page transition with a message (optional)
            //alert('Loading next page...');
            // Redirect to the next page
            window.location.href = nextPage;
        });
    });
}
