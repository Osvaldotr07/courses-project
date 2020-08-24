const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(event.currentTarget);
  let response = await fetch("user-login", {
    method: "POST",
    body: formData,
  });
  let resJson = await response.json()
  delete resJson.data[0].PASSWORD
  if (response.ok) {
    localStorage.setItem('data', JSON.stringify(resJson))
    document.location.href = '/'
  }
});


