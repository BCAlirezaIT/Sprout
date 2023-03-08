db.collection("notifications").orderBy("timestamp", "desc").onSnapshot(function(querySnapshot) {
	$("#accordion").empty();

	querySnapshot.forEach(function(doc) {
		var card = '<div class="card">' +
						'<div class="card-header" id="heading' + doc.id + '">' +
							'<h2 class="mb-0">' +
								'<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + doc.id + '" aria-expanded="false" aria-controls="collapse' + doc.id + '">' +
									doc.data().title +
									'<span class="badge badge-primary badge-pill ml-2">' + new Date(doc.data().timestamp.seconds * 1000).toLocaleString() + '</span>' +
								'</button>' +
							'</h2>' +
						'</div>' +
						'<div id="collapse' + doc.id + '" class="collapse" aria-labelledby="heading' + doc.id + '" data-parent="#accordion">' +
							'<div class="card-body">' +
								doc.data().message +
							'</div>' +
						'</div>' +
					'</div>';

		$("#accordion").append(card);
	});
});
