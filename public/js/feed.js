// Function to read the quote of the day from Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name


function writeLogs() {
  //define a variable for the collection you want to create in Firestore to populate data
  var logRef = db.collection("recycling");

  logRef.add({
      batteries: 0,
      cans: 12, 
      electronics: 0,
      glass: 1,
      metal: 5,
      other: 0,
      paper: 10,         
      plastic: 0,      
      points: 0,
      username: "e9yOz1bicrQKCuSZDI2zEw27AxP2",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });
  
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("feedCardTemplate");

  db.collection(collection).get()   
      .then(allrecycling=> {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          allrecycling.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;       // get value of the "name" key
              var details = doc.data().points;  // get value of the "details" key
              var docID = doc.id;
              let newcard = cardTemplate.content.cloneNode(true);

              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-points').innerHTML = points +"points";
              newcard.querySelector('.card-text').innerHTML = details;
              // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //placeholder
              newcard.querySelector('a').href = "feed.html?docID="+docID;
              
              //Optional: give unique ids to all elements for future use
              // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery, Example: "hikes-go-here"
              document.getElementById(collection + "-go-here").appendChild(newcard);

              //i++;   //Optional: iterate variable to serve as unique ID
          })
      })
}

displayCardsDynamically("recycling");  //input param is the name of the collection