// Initialize the variables
var submitBtn = null;

// Get the Submit Button and the div that we'll make an aria live region
submitBtn = document.getElementById("submitBtn");
var statusMessage = document.getElementById("statusMessage");

// Get the form element
var form = document.querySelector('form');

// Some error handling
if (submitBtn && form) {
	// Listen for the "submit" event on the form
	form.addEventListener("submit", sendComments, false);
} else {
	console.error("Did not get the submit button or form for some reason.");
}

function sendComments(e) {
	e.preventDefault(); // Prevent the default form submission

	// Collect form data
	var formData = new FormData(form);

	// This is the message we want added to the aria live region
	let msgTitle = "ARIA Assignment 2 - Comments Not Sent";
	let msgBody =
		"Thank you for sending your comments. Your comments have already been thrown into the dustbin of the Interwebs, and will be ignored at once!";

	// Send the form data using Fetch API
	fetch(form.action, {
		method: form.method,
		body: formData
	})
		.then(function (response) {
			if (response.ok) {
				// Handle success
				// Update the status message
				if (statusMessage) {
					statusMessage.style.visibility = "visible";
					statusMessage.innerHTML = "<h3>" + msgTitle + "</h3><p>" + msgBody + "</p>";
				}

				// Display the pop-up message
				alert(msgTitle + "\n\n" + msgBody);

				// Keep the focus on the submit button
				submitBtn.focus();
			} else {
				// Handle server errors
				return response.text().then(function (text) {
					throw new Error(text);
				});
			}
		})
		.catch(function (error) {
			// Handle network errors or server errors
			console.error("Error:", error);

			// Update the status message with error information
			if (statusMessage) {
				statusMessage.style.visibility = "visible";
				statusMessage.innerHTML = "<h3>Error</h3><p>There was an error submitting your comments. Please try again later.</p>";
			}

			// Display an error pop-up
			alert("Error\n\nThere was an error submitting your comments. Please try again later.");

			// Keep the focus on the submit button
			submitBtn.focus();
		});
} // End of sendComments
