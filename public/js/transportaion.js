var submitButton = document.getElementById('submitButton');
var startField = document.getElementById('start');
var endField = document.getElementById('end');
var pointsField = document.getElementById("points-earned");
var distField = document.getElementById('travel-distance');
var tType = document.getElementById('transportation');
var mLayer;
var map;
const pinIcon = L.icon({
  iconUrl: '../../public/images/transportation/pin.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  submitData();
});

startField.addEventListener("input", validatePos);

endField.addEventListener("input", validatePos);

initMap();

function initMap() {
  map = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  mLayer = L.layerGroup().addTo(map);
}

function testInputStructure(value) {
  return /^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/.test(value);
}

function validatePos() {
  mLayer.clearLayers();

  var res = testInputStructure(startField.value) && testInputStructure(endField.value);

  if (!res)
    return;

  var dim0 = startField.value.split(",");
  var mark0 = mark([dim0[0], dim0[1]]);

  var dim1 = endField.value.split(",");
  var mark1 = mark([dim1[0], dim1[1]]);

  var latlngs = [mark0.getLatLng(), mark1.getLatLng()];
  L.polyline(latlngs, {color: 'red'}).addTo(mLayer);

  var distance = getDistanceFromLatLonInKm(dim0[0], dim0[1], dim1[0], dim1[1]);
  distField.value = distance + "KM";
  calculatePoints(distance);
}

function mark(pos) {
  var mark = L.marker([pos[0], pos[1]]).addTo(mLayer);
  mark.setIcon(pinIcon);
  return mark;
}

function getDistanceFromLatLonInKm(lat0, lon0, lat1, lon1) {
  const earthRadius = 6371;
  const dLat = deg2rad(lat1 - lat0);
  const dLon = deg2rad(lon1 - lon0);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat0)) * Math.cos(deg2rad(lat1)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function calculatePoints(distance) {
  var transportation = tType.value;
  var pointsPerKM = 0;
  switch (transportation) {
    case 'Bicycle':
      pointsPerKM = 1;
      break;
    case 'Bus':
      pointsPerKM = 0.5;
      break;
    case 'Metro':
      pointsPerKM = 0.25;
      break;
  }
  pointsField.value = Math.round(distance * pointsPerKM);
}

function submitData() {
  var userID;
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid)
      userID = user.uid;
    }
  });
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