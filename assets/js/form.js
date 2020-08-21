const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(event.currentTarget);
  console.log("hello", formData);

  let response = await fetch("/user/newUser", {
    method: "POST",
    body: formData,
  });

  let responseJson = await response.json();
  console.log(responseJson);
  if (response.ok) {
    alert("Usuario guardado");
  }
  if(response.status === 405) {
    alert('La contraseña debe de ser mayor 8 digitos y debe de contener caracteres')
  }
});
