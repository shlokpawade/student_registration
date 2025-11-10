const form = document.getElementById("registrationForm");
const messageEl = document.getElementById("message");

// Use your Render URL here
const BACKEND_URL = "https://student-registration-y3sv.onrender.com/register";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    dob: form.dob.value,
    gender: form.gender.value,
    course: form.course.value,
    address: form.address.value,
    password: form.password.value,
  };

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    messageEl.textContent = data.message;
    messageEl.style.color = "green";
    form.reset();
  } catch (err) {
    console.error("Error submitting form:", err);
    messageEl.textContent = "❌ Submission failed. Try again.";
    messageEl.style.color = "red";
  }
});
