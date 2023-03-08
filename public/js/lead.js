// const leaderboardCBody = document.getElementById("leaderboardC-body");

// db.collection("scores").orderBy("score", "desc").onSnapshot(snapshot => {
//   leaderboardCBody.innerHTML = "";

//   let rank = 1;
//   snapshot.forEach(doc => {
//     const data = doc.data();
//     const row = `
//       <tr>
//         <td>${rank}</td>
//         <td>${data.group}</td>
//         <td>${data.points}</td>
//       </tr>
//     `;
//     leaderboardCBody.innerHTML += row;
//     rank++;
//   });
// });

// const groupScoreDoc = db.collection("scores").doc("<group-id>");

// groupScoreDoc.onSnapshot(doc => {
//   const data = doc.data();
//   db.collection("scores").orderBy("score", "desc").get().then(querySnapshot => {
//     let rank = 1;
//     querySnapshot.forEach(doc => {
//       if (doc.id === "<group-id>") {
//         document.getElementById("group-rank").textContent = rank;
//       }
//       rank++;
//     });
//   });
//   document.getElementById("group-name").textContent = data.group;
//   document.getElementById("group-score").textContent = data.score;
// });

// const leaderboardFBody = document.getElementById("leaderboardF-body");

// db.collection("scores").orderBy("score", "desc").onSnapshot(snapshot => {
//   leaderboardFBody.innerHTML = "";

//   let rank = 1;
//   snapshot.forEach(doc => {
//     const data = doc.data();
//     const row = `
//       <tr>
//         <td>${rank}</td>
//         <td>${data.friend}</td>
//         <td>${data.points}</td>
//       </tr>
//     `;
//     leaderboardGBody.innerHTML += row;
//     rank++;
//   });
// });

// const userScoreDoc = db.collection("scores").doc("<user-id>");

// userScoreDoc.onSnapshot(doc => {
//   const data = doc.data();
//   db.collection("scores").orderBy("score", "desc").get().then(querySnapshot => {
//     let rank = 1;
//     querySnapshot.forEach(doc => {
//       if (doc.id === "<friend-id>") {
//         document.getElementById("friend-rank").textContent = rank;
//       }
//       rank++;
//     });
//   });
//   document.getElementById("user-name").textContent = data.user;
//   document.getElementById("user-score").textContent = data.score;
// });

// const leaderboardGBody = document.getElementById("leaderboardG-body");

// db.collection("scores").orderBy("score", "desc").onSnapshot(snapshot => {
//   leaderboardGBody.innerHTML = "";

//   let rank = 1;
//   snapshot.forEach(doc => {
//     const data = doc.data();
//     const row = `
//       <tr>
//         <td>${rank}</td>
//         <td>${data.country}</td>
//         <td>${data.points}</td>
//       </tr>
//     `;
//     leaderboardGBody.innerHTML += row;
//     rank++;
//   });
// });

// const countryScoreDoc = db.collection("scores").doc("<country-id>");

// countryScoreDoc.onSnapshot(doc => {
//   const data = doc.data();
//   db.collection("scores").orderBy("score", "desc").get().then(querySnapshot => {
//     let rank = 1;
//     querySnapshot.forEach(doc => {
//       if (doc.id === "<country-id>") {
//         document.getElementById("country-rank").textContent = rank;
//       }
//       rank++;
//     });
//   });
//   document.getElementById("country-name").textContent = data.country;
//   document.getElementById("country-score").textContent = data.score;
// });
