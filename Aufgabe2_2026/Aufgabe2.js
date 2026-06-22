

//Stufe1
function holeBrief(inhalt) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(inhalt);
    }, 1000);
  });
}


//Stufe2
function stempelBrief(brief) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(brief + " [Gestempelt]");
    }, 500); 
  });
}

function versendeBrief(brief) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(brief + " -> Versendet!");
    }, 500); 
  });
}

holeBrief("Liebesbrief")
  .then((brief) => {
    console.log("Erhalten:", brief);
    return stempelBrief(brief); // Gibt ein neues Promise zurück
  })
  .then((gestempelterBrief) => {
    console.log("Bearbeitet:", gestempelterBrief);
    return versendeBrief(gestempelterBrief); // Gibt das nächste Promise zurück
  })
  .then((versendeterBrief) => {
    console.log("Abgeschlossen:", versendeterBrief);
  })
  .catch((fehler) => {
    console.error("Es gab einen Fehler im Prozess:", fehler);
  });

  
  //Stufe3
  