// Initialize the variables
var submitBtn = null;


// Get the Submit Button and the div that we'll make an aria live region
submitBtn = document.getElementById("submitBtn");


// Some error handling
if (submitBtn) {
        // Listen for the "click" event on the button; when someone clicks it, run function sendComments(e)
        submitBtn.addEventListener("click", sendComments, false);
} else {
        console.error ("Did not get the submit button for some reason.");
}

function sendComments (e) {
	//e.preventDefault();  // When uncommented, this will prevent the form from submitting when the button is clicked

	// This is the message we want added to the aria live region
	let msg = "Thank you for sending your comments. Your comments have already been thrown into the dustbin of the Interwebs, and will be ignored at once!"	;

	// Now, add the code to insert the msg into the aria live region
	
} // End of sendComments
