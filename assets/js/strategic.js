
const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(event.currentTarget);
  console.log("hello", formData);

  let response = await fetch("/user/login", {
    method: "POST",
    body: formData,
  });

  let responseJson = await response.json();
  console.log(responseJson);
  if (response.ok) {
    alert("Acceso success");
    document.location.href = '/'
  }
});


