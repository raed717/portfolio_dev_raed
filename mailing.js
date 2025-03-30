function sendMail(event) {
  event.preventDefault(); // Prevent page reload

  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    time: new Date().toLocaleString(),
  };

  emailjs.send("ma85089", "template_vzgf8j9", parms).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      document.getElementById("contact-form").reset(); // Clears form fields
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );

  return false; // Prevents form from submitting normally
}
