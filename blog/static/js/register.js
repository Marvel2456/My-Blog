const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
const emailField = document.querySelector("#emailField");
const emailfeedBackArea = document.querySelector(".emailfeedBackArea");
const passwordField = document.querySelector("#passwordField");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");
const showPwdToggle = document.querySelector(".showPwdToggle");
const submitBtn = document.querySelector(".submit-btn");
const handleToggleInput = (e) => {

if (showPwdToggle.textContent === "SHOW") {
    showPwdToggle.textContent = "HIDE";
    passwordField.setAttribute("type", "text");
} else {
  showPwdToggle.textContent = "SHOW";
  passwordField.setAttribute("type", "password");
}

};


showPwdToggle.addEventListener("click", handleToggleInput);


emailField.addEventListener("keyup", (e) => {
    const emailVal = e.target.value;
    

    emailField.classList.remove("is-invalid");
    emailfeedBackArea.style.display = "none";

    if (emailVal.length > 0) {
        fetch("/accounts/validate-email", {
            body : JSON.stringify({ email: emailVal }),
            method : "POST"
        })
         .then(res => res.json())
         .then(data => {
            console.log("data", data);
            if(data.email_error){
                submitBtn.disabled = true;
                emailField.classList.add("is-invalid");
                emailfeedBackArea.style.display = 'block';
                emailfeedBackArea.innerHTML = `<p>${data.email_error}</p>`
            } else {
                submitBtn.removeAttribute("disabled");
            }
        });
    }
});

usernameField.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;

    usernameSuccessOutput.textContent = `checking  ${usernameVal}`;

    usernameField.classList.remove("is-invalid");
    feedBackArea.style.display = "none";
    
    if (usernameVal.length > 0) {
        fetch("/accounts/validate-username", {
            body : JSON.stringify({ username: usernameVal }),
            method : "POST"
        })
         .then(res => res.json())
         .then(data => {
            console.log("data", data);
            usernameSuccessOutput.style.display = "none";
            if(data.username_error){
                submitBtn.disabled = true;
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display = 'block';
                feedBackArea.innerHTML = `<p>${data.username_error}</p>`
            } else {
                submitBtn.removeAttribute("disabled");
            }
        });

    }
    
});