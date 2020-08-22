
const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(event.currentTarget);

  let response = await fetch("/user/login", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    alert("Acceso success");
    document.location.href = '/'
  }
});


