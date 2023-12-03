"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementsByClassName("form__content");
  const email = document.getElementById("input-email");
  const password = document.getElementById("input-password");
  const button = document.getElementById("button");
  const text = document.getElementsByTagName("p");

  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  const regEmailNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  const toogleClasses = (el, method, classes) => {
    el.classList[method](classes);
  };

  const handleLoginInput = () => {
    if (
      email.value &&
      (regEmail.test(email.value) || regEmailNumber.test(email.value))
    ) {
      email.classList.add("valid");
    } else {
      toogleClasses(email, "remove", "valid");
      toogleClasses(email, "add", "invalid");
      handleButton();
    }
  };

  const handlePasswordInput = () => {
    if (password.value && password.value.length > 7) {
      toogleClasses(password, "add", "valid");
    } else {
      toogleClasses(password, "remove", "valid");
      toogleClasses(password, "add", "invalid");
      handleButton();
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;

    if (email.value && password.value && password.value.length > 7) {
      toogleClasses(button, "remove", "disabled");
      button.disabled = false;
      toogleClasses(text[0], "remove", "display");
      text[0].classList.remove("display");
    } else {
      handleButton();
    }

    switch (true) {
      case name === "login":
        handleLoginInput();
        break;
      case name === "password":
        handlePasswordInput();
        break;
      default:
        return null;
    }
  };

  const handleButton = () => {
    button.disabled = true;
    button.classList.add("disabled");
    text[0].classList.add("display");
  };

  const autorization = async () => {
    try {
      let link = "https://test-works.pr-uni.ru/api/login/index.php?";
      link += "login=" + email.value;
      link += "&password=" + password.value;
      button.innerHTML = "Загрузка";

      button.disabled = true;
      button.classList.add("disabled");

      const request = await fetch(link);
      const response = await request.json();

      button.classList.remove("disabled");
      button.disabled = false;

      // if (request.status === 200) {}

      if (response.status === "ok") {
        form[0].classList.add("hide");
        text[1].innerHTML = response.user.name + ", Вы успешно авторизованы!";
        setCookie("auth_token", response.token, {
          httpOnly: true,
          secure: true,
          "max-age": 86400,
        });
      }

      if (response.status === "error") {
        text[0].classList.add("display");
        text[0].innerHTML = response.errorMessage;
        email.value = "";
        password.value = "";
        email.classList.remove("valid", "invalid");
        password.classList.remove("valid", "invalid");
      }
    } catch (error) {
      text[0].classList.add("display");
      text[0].innerHTML = error;
    } finally {
      button.innerHTML = "Войти";
      button.disabled = true;
      button.classList.add("disabled");
    }
  };

  function setCookie(name, value, options = {}) {
    options = {
      path: "/",
      ...options,
    };

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  email.oninput = handleInput;
  password.oninput = handleInput;

  button.onclick = autorization;
});
