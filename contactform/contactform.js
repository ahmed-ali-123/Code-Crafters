const btn = document.getElementById("submitButton");

function getFormattedDateTime() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "pm" : "am";

  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = now.getFullYear(); // Full year (4 digits)

  return `${formattedHours}:${minutes} ${amPm}, ${day}/${month}/${year}`;
}

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = {};
    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        formData[element.name] = element.value;
      }
    });

    btn.innerText = "Sending...";
    try {
      await emailjs.send("service_33mof6n", "template_zd4acd9", {
        user_name: formData.name,
        user_email: formData.email,
        user_subject: formData.subject,
        user_message: formData.message,
        user_date: getFormattedDateTime(),
        reply_to: "saqibrazzak85@gmail.com",
      });
      btn.innerText = "Send";
      document.getElementById("sendmessage").style.display = "block";
    } catch (e) {
      alert(e);
      btn.innerText = "Send";
    }
  });
