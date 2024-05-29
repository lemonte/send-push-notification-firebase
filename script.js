document.getElementById('push-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Getting the values from the form
    var serverKey = document.getElementById('serverKey').value.trim();
    var destinationId = document.getElementById('destinationId').value.trim();
    var title = document.getElementById('title').value.trim();
    var body = document.getElementById('body').value.trim();

    // Prepare the payload
    var payload = {
        "notification": {
            "title": title,
            "body": body,
            "content_available": true
        },
        "priority": "high",
        "data": {
            "click_action": "FLUTTER_NOTIFICATION_CLICK",
            "id": "1",
            "status": "done"
        },
        "to": destinationId
    };

    // Send the notification
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Authorization': 'key=' + serverKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showToast(); // Exibe o toast quando a notificação é enviada
    })
    .catch(error => console.error('Error:', error));
});

function showToast() {
    var toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}
