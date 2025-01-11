const notificationBox = document.getElementById("notification-box");
const notificationMessage = document.getElementById("notification-message");
const notificationOkBtn = document.getElementById("notification-ok-btn");
const notificationCancelBtn = document.getElementById("notification-cancel-btn");

const notificationQueue = [];

let notificationResolve; // Holds the resolve function for the Promise

function ynNotification(message, sound = 0) {
    return new Promise((resolve) => {
        // Push the notification with its resolve function
        notificationQueue.push({ message, withCancel: true, sound, resolve });
        if (!notificationBox.classList.contains("visible")) {
            displayNextNotification();
        }
    });
}


function showNotification(message, sound = 0) {
    notificationQueue.push({ message, withCancel: false, sound });
    if (!notificationBox.classList.contains("visible")) {
        displayNextNotification();
    }
}

function confirmNotification(message, sound = 0) {
    notificationQueue.push({ message, withCancel: true , sound: sound});
    if (!notificationBox.classList.contains("visible")) {
        displayNextNotification();
    }
}

function displayNextNotification() {
    if (notificationQueue.length === 0) return;

    const { message, withCancel, sound } = notificationQueue.shift();
    notificationMessage.textContent = message;
    notificationBox.classList.remove("hidden");
    notificationBox.classList.add("visible");

    // Show or hide the Cancel button based on the notification type
    notificationCancelBtn.classList.toggle("hidden", !withCancel);
    playNotificationSound(sound);
}

function closeNotification() {
    playNotificationSound(3);
    notificationBox.classList.add("hidden");
    notificationBox.classList.remove("visible");

    if (notificationQueue.length > 0) {
        setTimeout(displayNextNotification, 200);
    }
}

// Handles the OK button (doesn't care about cancel)
function handleOkClick() {
    closeNotification();
}

// Handles the Cancel button (also just closes notification)
function handleCancelClick() {
    closeNotification();
}

// Event listeners for the buttons
notificationOkBtn.addEventListener("click", handleOkClick);
notificationCancelBtn.addEventListener("click", handleCancelClick);
notificationBox.addEventListener("click", closeNotification);
