function validation() {
  var name = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  var phonePattern = /^[0-9]{10}$/;

  if (name == "") {
    document.getElementById("namemsg").classList.add("text-danger");
    document.getElementById("namemsg").innerHTML =
      "<em >You did not enter your name</em>";
    isValid = false;
  } else {
    document.getElementById("namemsg").classList.remove("text-danger");
    document.getElementById("namemsg").classList.add("text-success");
    document.getElementById("namemsg").innerHTML = "Valid!";
  }

  if (!emailPattern.test(email)) {
    document.getElementById("emailmsg").classList.add("text-danger");
    document.getElementById("emailmsg").innerHTML =
      "<em >Invalid email. Must contain @email.com</em>";
    isValid = false;
  } else {
    document.getElementById("emailmsg").classList.remove("text-danger");
    document.getElementById("emailmsg").classList.add("text-success");
    document.getElementById("emailmsg").innerHTML = "Valid!";
  }

  if (address == "") {
    document.getElementById("addressmsg").classList.add("text-danger");
    document.getElementById("addressmsg").innerHTML =
      "<em >You did not enter your address</em>";
    isValid = false;
  } else {
    document.getElementById("addressmsg").classList.remove("text-danger");
    document.getElementById("addressmsg").classList.add("text-success");
    document.getElementById("addressmsg").innerHTML = "Valid!";
  }

  if (!passwordPattern.test(password)) {
    document.getElementById("passwordmsg").classList.add("text-danger");
    document.getElementById("passwordmsg").innerHTML =
      "<em>Invalid password. Must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter</em>";
    isValid = false;
  } else {
    document.getElementById("passwordmsg").classList.remove("text-danger");
    document.getElementById("passwordmsg").classList.add("text-success");
    document.getElementById("passwordmsg").innerHTML = "Valid!";
  }

  if (!phonePattern.test(phone)) {
    document.getElementById("phonemsg").classList.add("text-danger");
    document.getElementById("phonemsg").innerHTML =
      "<em>Invalid phone number. Numbers only</em>";
    isValid = false;
  } else {
    document.getElementById("phonemsg").classList.remove("text-danger");
    document.getElementById("phonemsg").classList.add("text-success");
    document.getElementById("phonemsg").innerHTML = "Valid!";
  }

  return isValid;
}

function resetForm() {
  document.getElementById("namemsg").innerHTML = "";
  document.getElementById("emailmsg").innerHTML = "";
  document.getElementById("addressmsg").innerHTML = "";
  document.getElementById("passwordmsg").innerHTML = "";
  document.getElementById("phonemsg").innerHTML = "";
}
