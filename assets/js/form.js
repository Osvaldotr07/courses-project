let user = {};

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
    let res = await fetch(
      "https://microservicio-react-students.us-south.cf.appdomain.cloud/newUser",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
    alert("Si se guardo");
    console.log(res.json());
  } catch (err) {
    console.log(err);
  }
});
