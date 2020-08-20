var user = {};

let submitButton = document.querySelector(".submit-button");
let allInputForm = document.querySelectorAll(".input-form");

allInputForm.forEach((input) => {
  input.addEventListener("change", (evt) => {
    user = {
      ...user,
      [evt.target.name]: evt.target.value,
    };
  });
});

submitButton.addEventListener("click", async (evt) => {
  try {
    let res = await fetch("/user/newUser", {
      method: "POST",
      body: JSON.stringify(user),
    });
    alert("Si se guardo");
    let resJson = await res.json();
    console.log(resJson);
  } catch (err) {
    console.log(err);
  }
});
