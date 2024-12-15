const notificationBox = document.getElementById("notification-box");
const notificationMessage = document.getElementById("notification-message");
const notificationOkBtn = document.getElementById("notification-ok-btn");

const notificationQueue = [];

function showNotification(message) {
    notificationQueue.push(message);
    if (!notificationBox.classList.contains("visible")) {
        displayNextNotification();
    }
}

function displayNextNotification() {
    if (notificationQueue.length === 0) return;

    const message = notificationQueue.shift();
    notificationMessage.textContent = message;
    notificationBox.classList.remove("hidden");
    notificationBox.classList.add("visible");
    playNotificationSound();
}

function closeNotification() {
    notificationBox.classList.add("hidden");
    notificationBox.classList.remove("visible");
    if (notificationQueue.length > 0) {
        setTimeout(displayNextNotification, 200);
    }
}

notificationOkBtn.addEventListener("click", closeNotification);
notificationBox.addEventListener("click", closeNotification);
