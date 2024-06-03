function validation() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var usernamePattern = /^.{1,15}$/;
  var passwordPattern = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;

  var isValid = true;

  if (!usernamePattern.test(username)) {
    document.getElementById("usermsg").classList.add("text-danger");
    document.getElementById("usermsg").innerHTML =
      "<em>Invalid username!Username cannot be more than 15 characters long.</em>";
    isValid = false;
  } else {
    document.getElementById("usermsg").classList.remove("text-danger");
    document.getElementById("usermsg").classList.add("text-success");
    document.getElementById("usermsg").innerHTML = "Valid!";
  }

  if (!passwordPattern.test(password)) {
    document.getElementById("passwordmsg").classList.add("text-danger");
    document.getElementById("passwordmsg").innerHTML =
      "<em>Invalid password. Must be between 6 to 20 characters which contain at least one numeric digit and one lowercase letter</em>";
    isValid = false;
  } else {
    document.getElementById("passwordmsg").classList.remove("text-danger");
    document.getElementById("passwordmsg").classList.add("text-success");
    document.getElementById("passwordmsg").innerHTML = "Valid!";
  }

  return isValid;
}

function resetForm() {
  document.getElementById("usermsg").innerHTML = "";
  document.getElementById("passwordmsg").innerHTML = "";
}
