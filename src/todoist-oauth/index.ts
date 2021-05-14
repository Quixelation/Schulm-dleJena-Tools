console.log("Todoist-oAuth");
try {
  const innerText = document.body.innerText;
  console.log("innerText", innerText);
  const parsedJson = JSON.parse(innerText);
  console.log("parsedJson", parsedJson);
  document.body.innerHTML = "<h1>Bitte warten...</h1>";
  if (parsedJson === null || parsedJson === 0) {
    throw (
      "Expected JSON. Got '" +
      typeof parsedJson +
      "' with " +
      String(parsedJson)
    );
  } else if (parsedJson["error"] != null) {
    throw parsedJson["error"];
  } else {
    throw "Ungültiger Weg";
  }
} catch (err) {
  alert("Es gab einen Fehler! Der Vorgang wurde abgebrochen!\n" + String(err));
  location.href = "//moodle.jsp.jena.de";
}
