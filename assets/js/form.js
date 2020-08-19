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
  alert("hello");
  let res = await fetch(
    "https://microservicio-react-students.us.south.cf.appdomain.cloud/newUser",
    {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  console.log(res);
});
