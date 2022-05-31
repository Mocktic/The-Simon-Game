var modal = document.getElementById("myModal");

var openInstructions = document.getElementById("openInstructions");

var span = document.getElementsByClassName("close-modal")[0];

openInstructions.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
