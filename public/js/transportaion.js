document.getElementById('submitButton').addEventListener("click", function(event) {
  event.preventDefault();
  submitData();
})

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: { lat: 37.7749, lng: -122.4194 }
  });
  var startMarker = new google.maps.Marker({
    position: { lat: 37.7749, lng: -122.4194 },
    map: map,
    draggable: true
  });
  var endMarker = new google.maps.Marker({
    position: { lat: 37.7749, lng: -122.4194 },
    map: map,
    draggable: true
  });
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true
  });
  var onChangeHandler = function () {
    calculateDistance(startMarker.getPosition(), endMarker.getPosition(), directionsService, directionsDisplay);
  };
  startMarker.addListener('dragend', onChangeHandler);
  endMarker.addListener('dragend', onChangeHandler);
  function calculateDistance(start, end, service, display) {
    service.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[$('#transportation').val()]
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        display.setDirections(response);
        var distance = response.routes[0].legs[0].distance.text;
        $('#travel-distance').val(distance);
        var points = calculatePoints(distance, $('#transportation').val());
        $('#points-earned').val(points);
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  }
}

function calculatePoints(distance, transportation) {
  var distanceInMiles = parseFloat(distance.replace(',', '').split(' ')[0]);
  var pointsPerMile = 0;
  switch (transportation) {
    case 'Bicycle':
      pointsPerMile = 1;
      break;
    case 'Bus':
      pointsPerMile = 0.5;
      break;
    case 'Metro':
      pointsPerMile = 0.25;
      break;
  }
  return Math.round(distanceInMiles * pointsPerMile);
}

function submitData() {
  var userID;
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        userID = user.uid;
    }
  }); //Will cover the whole func later
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var type = document.getElementById("transportation").selectedIndex;
  var points = document.getElementById("points-earned").value; //unsafe

  storeTransportation(start, end, type, points);

  async function storeTransportation(start, end, type, points) {
    const data = {
      user: userID,
      start: start,
      end: end,
      type: type,
      points: points,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
      var promise = await db.collection('transportations').add(data);
      console.log('Transportation successfully uploaded: ', promise.id);
    } catch (error) {
      console.error(error);
    }
  }
}