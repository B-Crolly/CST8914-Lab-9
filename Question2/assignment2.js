// Initialize the variables
var submitBtn = null;

// Get the Submit Button and the div that we'll make an aria live region
submitBtn = document.getElementById("submitBtn");
var statusMessage = document.getElementById("statusMessage");

// Some error handling
if (submitBtn) {
    // Listen for the "click" event on the button; when someone clicks it, run function sendComments(e)
    submitBtn.addEventListener("click", sendComments, false);
} else {
    console.error("Did not get the submit button for some reason.");
}

function sendComments(e) {
    e.preventDefault(); // Prevent the form from submitting when the button is clicked

    // This is the message we want added to the aria live region
    let msgTitle = "ARIA Assignment 2 - Comments Not Sent";
    let msgBody =
        "Thank you for sending your comments. Your comments have already been thrown into the dustbin of the Interwebs, and will be ignored at once!";

    // Now, add the code to insert the msg into the aria live region
    if (statusMessage) {
        // Make the statusMessage div visible
        statusMessage.style.visibility = "visible";
        // Insert the message into the div
        statusMessage.innerHTML = "<h3>" + msgTitle + "</h3><p>" + msgBody + "</p>";
    } else {
        console.error("Status message element not found.");
    }

    // Display the pop-up message
    alert(msgTitle + "\n\n" + msgBody);

    // Keep the focus on the submit button
    submitBtn.focus();
} // End of sendComments