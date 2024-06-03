function submitFeedback() {
  var name = document.getElementById("name").value;
  var feedback = document.getElementById("feedback").value;
  var ratingValue = Number(document.getElementById("rating").value);

  var Therating;
  switch (ratingValue) {
    case 1:
      Therating = "Excellent";
      break;
    case 2:
      Therating = "Good";
      break;
    case 3:
      Therating = "Poor";
      break;
    case 4:
      Therating = "Disappointment";
      break;
    default:
      Therating = "No rating";
  }
  var tableId;
  switch (true) {
    case ratingValue < 3:
      tableId = "positiveResponses";
      break;
    default:
      tableId = "negativeResponses";
  }

  var table = document.getElementById(tableId);
  var row = table.insertRow(-1);
  row.insertCell(0).innerHTML = name;
  row.insertCell(1).innerHTML = feedback;
  row.insertCell(2).innerHTML = Therating;
}
