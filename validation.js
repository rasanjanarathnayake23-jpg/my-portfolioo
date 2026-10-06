document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Clear previous error messages
      document.getElementById("nameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("messageError").textContent = "";

      // Full Name Validation
      if (fullName === "") {
        document.getElementById("nameError").textContent = "Please enter your full name.";
        isValid = false;
      }

      // Email Pattern Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        isValid = false;
      }

      // Message Validation
      if (message.length < 10) {
        document.getElementById("messageError").textContent = "Message must be at least 10 characters long.";
        isValid = false;
      }

      if (isValid) {
        formSuccess.style.display = "block";
        contactForm.reset();
      }
    });
  }
});